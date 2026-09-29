import { getAccessToken } from './auth';
import { EnquiryFormData } from '../types';

const STORAGE_KEY_SPREADSHEET_ID = 'techbridge_sheets_id';

/**
 * Ensures a Google Spreadsheet exists for Techbridge Academy Course Enquiries.
 * If one is already created, returns its ID. Otherwise creates a new one with formatted headers.
 */
export async function getOrCreateEnquirySpreadsheet(): Promise<{ id: string; url: string; created: boolean }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Workspace');
  }

  const existingId = localStorage.getItem(STORAGE_KEY_SPREADSHEET_ID);
  if (existingId) {
    // Verify if it is accessible
    try {
      const verifyRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${existingId}?fields=spreadsheetId`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (verifyRes.ok) {
        return {
          id: existingId,
          url: `https://docs.google.com/spreadsheets/d/${existingId}/edit`,
          created: false
        };
      }
    } catch {
      // If inaccessible, create a new one
    }
  }

  // Create a new spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: 'Techbridge Academy - Course Enquiries'
      },
      sheets: [
        {
          properties: {
            title: 'Enquiries',
            gridProperties: {
              frozenRowCount: 1
            }
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Timestamp' } },
                    { userEnteredValue: { stringValue: 'Full Name' } },
                    { userEnteredValue: { stringValue: 'Mobile Number' } },
                    { userEnteredValue: { stringValue: 'Email Address' } },
                    { userEnteredValue: { stringValue: 'City' } },
                    { userEnteredValue: { stringValue: 'State' } },
                    { userEnteredValue: { stringValue: 'Qualification' } },
                    { userEnteredValue: { stringValue: 'Interested Course' } }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    throw new Error(errData.error?.message || 'Failed to create Google Spreadsheet');
  }

  const data = await createRes.json();
  const spreadsheetId = data.spreadsheetId;
  localStorage.setItem(STORAGE_KEY_SPREADSHEET_ID, spreadsheetId);

  return {
    id: spreadsheetId,
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    created: true
  };
}

/**
 * Appends a course enquiry submission row to the Google Spreadsheet
 */
export async function appendEnquiryToSheet(enquiry: EnquiryFormData): Promise<{ success: boolean; url: string }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Workspace');
  }

  const sheet = await getOrCreateEnquirySpreadsheet();
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const rowValues = [
    timestamp,
    enquiry.fullName,
    enquiry.mobileNumber,
    enquiry.email,
    enquiry.city,
    enquiry.state,
    enquiry.qualification,
    enquiry.interestedCourse
  ];

  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheet.id}/values/Enquiries!A:H:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [rowValues]
      })
    }
  );

  if (!appendRes.ok) {
    const err = await appendRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to append enquiry to Google Sheets');
  }

  return {
    success: true,
    url: sheet.url
  };
}

/**
 * Sends a confirmation email to the student and a notification to the academy team via Gmail API
 */
export async function sendEnquiryEmailViaGmail(enquiry: EnquiryFormData): Promise<{ success: boolean; messageId: string }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Workspace');
  }

  const academyEmail = 'academytechbridge10@gmail.com';
  const subject = `Techbridge Academy - Course Enquiry: ${enquiry.interestedCourse}`;

  const emailBody = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 24px; border-radius: 8px 8px 0 0; text-align: center; color: white;">
    <h1 style="margin: 0; font-size: 24px; letter-spacing: -0.5px;">Techbridge Academy</h1>
    <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">Bridge The Gap To Your Tech Career</p>
  </div>
  <div style="background: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #0f172a; margin-top: 0;">Hello ${enquiry.fullName},</h2>
    <p>Thank you for showing interest in <strong>Techbridge Academy</strong>! We have successfully received your enquiry for the <strong>${enquiry.interestedCourse}</strong> program.</p>
    
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0;">
      <h3 style="margin-top: 0; font-size: 15px; color: #1e3a8a; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">Your Enquiry Summary</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 6px 0; color: #64748b; width: 140px;">Interested Course:</td><td style="font-weight: 600; color: #0f172a;">${enquiry.interestedCourse}</td></tr>
        <tr><td style="padding: 6px 0; color: #64748b;">Applicant Name:</td><td>${enquiry.fullName}</td></tr>
        <tr><td style="padding: 6px 0; color: #64748b;">Mobile:</td><td>${enquiry.mobileNumber}</td></tr>
        <tr><td style="padding: 6px 0; color: #64748b;">Email:</td><td>${enquiry.email}</td></tr>
        <tr><td style="padding: 6px 0; color: #64748b;">City & State:</td><td>${enquiry.city}, ${enquiry.state}</td></tr>
        <tr><td style="padding: 6px 0; color: #64748b;">Qualification:</td><td>${enquiry.qualification}</td></tr>
      </table>
    </div>

    <p style="margin-bottom: 8px;"><strong>What happens next?</strong></p>
    <ul style="padding-left: 20px; color: #334155;">
      <li>Our Academic Counselor will call you at <strong>${enquiry.mobileNumber}</strong> shortly to discuss curriculum, upcoming batch schedules, and scholarship opportunities.</li>
      <li>You will receive a complete syllabus brochure and free access to our introductory workshop.</li>
    </ul>

    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
    <p style="font-size: 13px; color: #64748b; margin: 0;">
      Warm regards,<br />
      <strong>Admissions Team</strong><br />
      Techbridge Academy | Email: ${academyEmail}
    </p>
  </div>
</body>
</html>
  `.trim();

  // Create standard MIME message
  const rawMessage = [
    `To: ${enquiry.email}`,
    `Cc: ${academyEmail}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    emailBody
  ].join('\r\n');

  // Base64URL encode for Gmail API
  const base64Encoded = btoa(unescape(encodeURIComponent(rawMessage)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const sendRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: base64Encoded
    })
  });

  if (!sendRes.ok) {
    const err = await sendRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to send confirmation email via Gmail');
  }

  const data = await sendRes.json();
  return {
    success: true,
    messageId: data.id
  };
}

/**
 * Creates a synchronized Google Form for Techbridge Academy Course Enquiry
 */
export async function createGoogleForm(): Promise<{ formId: string; responderUri: string }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Workspace');
  }

  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title: 'Techbridge Academy - Course Enquiry Form',
        documentTitle: 'Techbridge Academy Course Enquiry Form'
      }
    })
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to create Google Form');
  }

  const formData = await createRes.json();
  return {
    formId: formData.formId,
    responderUri: formData.responderUri
  };
}
