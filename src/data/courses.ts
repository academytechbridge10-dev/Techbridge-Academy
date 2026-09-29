import { CourseDetail } from '../types';

export const COURSES: CourseDetail[] = [
  {
    id: '8th-class',
    title: '8th Class',
    category: 'School (8th-10th)',
    subjects: 'Physics, Chemistry, Mathematics',
    duration: '4 Months',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹499 / hour',
    groupFee: '₹99 / hour',
    terms: 'Minimum batch of 5 or more students',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'Physics',
        topics: ['Force', 'Motion', 'Work & Energy', 'Sound', 'Light Basics']
      },
      {
        title: 'Chemistry',
        topics: ['Matter', 'Atoms', 'Elements', 'Compounds', 'Physical & Chemical Changes']
      },
      {
        title: 'Mathematics',
        topics: ['Rational Numbers', 'Linear Equations', 'Algebra', 'Geometry', 'Mensuration', 'Data Handling']
      }
    ]
  },
  {
    id: '9th-class',
    title: '9th Class',
    category: 'School (8th-10th)',
    subjects: 'Physics, Chemistry, Mathematics',
    duration: '5 Months',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹499 / hour',
    groupFee: '₹99 / hour',
    terms: 'Minimum batch of 5 or more students',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'Physics',
        topics: ['Motion', 'Force & Laws', 'Gravitation', 'Work & Energy', 'Sound']
      },
      {
        title: 'Chemistry',
        topics: ['Matter', 'Atoms & Molecules', 'Structure of Atom', 'Chemical Reactions', 'Acids/Bases']
      },
      {
        title: 'Mathematics',
        topics: ['Number Systems', 'Polynomials', 'Coordinate Geometry', 'Linear Equations', 'Triangles', 'Quadrilaterals', 'Circles', 'Statistics']
      }
    ]
  },
  {
    id: '10th-class',
    title: '10th Class',
    category: 'School (8th-10th)',
    subjects: 'Physics, Chemistry, Mathematics',
    duration: '6 Months',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹599 / hour',
    groupFee: '₹99 / hour',
    terms: 'Minimum batch of 5 or more students',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'Physics',
        topics: ['Light', 'Electricity', 'Magnetic Effects', 'Human Eye & Instruments', 'Energy Sources']
      },
      {
        title: 'Chemistry',
        topics: ['Chemical Reactions', 'Acids/Bases/Salts', 'Metals/Non-metals', 'Carbon Compounds', 'Periodic Classification']
      },
      {
        title: 'Mathematics',
        topics: [
          'Real Numbers',
          'Polynomials',
          'Pair of Linear Equations',
          'Quadratic Equations',
          'AP',
          'Triangles',
          'Coordinate Geometry',
          'Trigonometry',
          'Circles',
          'Areas',
          'Surface Areas & Volumes',
          'Statistics and Probability'
        ]
      }
    ]
  },
  {
    id: '11th-class-mathematics',
    title: '11th Class Mathematics',
    category: 'High School (11th-12th)',
    subjects: 'Mathematics',
    duration: '6 Months',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹999 / hour',
    groupFee: '₹199 / hour',
    terms: 'Minimum batch of 5 or more students',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    extraNotes: 'Concept building and problem practice.',
    syllabus: [
      {
        title: 'Mathematics Curriculum',
        topics: [
          'Sets, Relations & Functions',
          'Trigonometric Functions',
          'Complex Numbers',
          'Linear Inequalities',
          'Permutations & Combinations',
          'Binomial Theorem',
          'Sequences & Series',
          'Straight Lines',
          'Conic Sections',
          'Limits & Derivatives',
          'Statistics',
          'Probability'
        ]
      }
    ]
  },
  {
    id: '12th-class-mathematics',
    title: '12th Class Mathematics',
    category: 'High School (11th-12th)',
    subjects: 'Mathematics',
    duration: '6 Months',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹1199 / hour',
    groupFee: '₹199 / hour',
    terms: 'Minimum batch of 5 or more students',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    extraNotes: 'Board-focused revision and practice tests.',
    syllabus: [
      {
        title: 'Mathematics Curriculum',
        topics: [
          'Relations & Functions',
          'Inverse Trigonometry',
          'Matrices & Determinants',
          'Continuity & Differentiability',
          'Applications of Derivatives',
          'Integrals',
          'Applications of Integrals',
          'Differential Equations',
          'Vectors',
          '3D Geometry',
          'Linear Programming',
          'Probability'
        ]
      }
    ]
  },
  {
    id: 'be-btech-coaching',
    title: 'BE/B.Tech Coaching',
    category: 'College / Engineering',
    subjects: 'All Subjects',
    duration: '8 Months',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹1499 / hour',
    groupFee: '₹299 / hour',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'Engineering Mathematics',
        topics: [
          'Relations & Functions',
          'Inverse Trigonometry',
          'Matrices & Determinants',
          'Continuity & Differentiability',
          'Applications of Derivatives',
          'Integrals & Applications',
          'Differential Equations',
          'Vectors',
          '3D Geometry',
          'Linear Programming and Probability'
        ]
      },
      {
        title: 'Programming',
        topics: [
          'C / C++ / Python (as per branch)',
          'Data Structures',
          'Algorithms',
          'Object-Oriented Programming',
          'Database Management Systems',
          'Web/Software Development Basics'
        ]
      },
      {
        title: 'Data Structures',
        topics: [
          'Arrays',
          'Linked Lists',
          'Stacks & Queues',
          'Trees',
          'Graphs',
          'Sorting & Searching',
          'Hashing'
        ]
      },
      {
        title: 'DBMS',
        topics: [
          'Relational Model',
          'SQL',
          'Normalization',
          'Joins',
          'Transactions',
          'Indexing'
        ]
      },
      {
        title: 'Operating Systems',
        topics: [
          'Process Management',
          'Memory Management',
          'File Systems',
          'Scheduling',
          'Deadlocks',
          'Network Operating Systems'
        ]
      },
      {
        title: 'Computer Networks',
        topics: [
          'OSI & TCP/IP Models',
          'IP Addressing',
          'Routing & Switching',
          'DNS, DHCP',
          'Wireless Networks',
          'Network Security'
        ]
      },
      {
        title: 'Software Engineering',
        topics: [
          'Requirements Analysis',
          'Design & Development',
          'Testing & Maintenance',
          'Agile Methodologies',
          'Version Control (Git)',
          'Project Management'
        ]
      }
    ]
  },
  {
    id: 'bca-mca-it-coaching',
    title: 'BCA / MCA / IT Coaching',
    category: 'College / Engineering',
    subjects: 'All Subjects',
    duration: '6 Months',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹999 / hour',
    groupFee: '₹199 / hour',
    terms: 'Minimum batch of 5 or more students',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'Programming Fundamentals',
        topics: [
          'C / C++ / Python',
          'Data Structures',
          'DBMS & SQL',
          'Operating Systems',
          'Computer Networks',
          'Web Technologies',
          'Software Engineering',
          'Basic Cloud Computing and Cybersecurity'
        ]
      },
      {
        title: 'Core Subjects',
        topics: [
          'Programming Fundamentals',
          'DBMS & SQL',
          'Computer Networks',
          'Operating Systems',
          'Web Technologies',
          'Software Engineering'
        ]
      },
      {
        title: 'Other Topics',
        topics: [
          'Basic Cloud Computing',
          'Cybersecurity',
          'Practical Tasks',
          'Assignments',
          'Exam Preparation'
        ]
      }
    ]
  },
  {
    id: 'career-coaching',
    title: 'Career Coaching',
    category: 'Career & Skills',
    subjects: 'Coaching / Mentorship',
    duration: '1 Week to 8 Week',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹499 / hour',
    groupFee: '₹99 / hour',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'Personal Career Counselling',
        topics: ['Career Guidance & Planning', 'Strengths and Interests', 'Education and Career Direction']
      },
      {
        title: 'Goal Setting',
        topics: ['Short & Long Term Goals', 'Realistic Career Planning', 'Actionable Roadmap']
      },
      {
        title: 'Education/Career Direction',
        topics: ['Course Selection Guidance', 'Higher Education Options', 'Skill Development']
      },
      {
        title: 'Opportunity Discussion',
        topics: ['Job Market Insights', 'Career Opportunities', 'Industry Trends']
      },
      {
        title: 'Decision Making Guidance',
        topics: ['Confusion Resolution', 'Right Career Choice', 'Confidence Building']
      },
      {
        title: 'Actionable Plan',
        topics: ['Step-by-Step Plan', 'Practical Suggestions', 'Follow-up Support']
      }
    ]
  },
  {
    id: 'ai-tutorial',
    title: 'AI Tutorial',
    category: 'Career & Skills',
    subjects: 'AI Tools Uses and Expertise',
    duration: '1 Week to 8 Week',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹399 / hour',
    groupFee: '₹69 / hour',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'AI Fundamentals',
        topics: ['What is AI?', 'History & Evolution', 'Types of AI', 'Applications in Real Life', 'Ethics & Responsible AI']
      },
      {
        title: 'ChatGPT',
        topics: ['Getting Started', 'Prompt Writing', 'Advanced Prompts', 'Use Cases', 'Tips & Tricks']
      },
      {
        title: 'AI for Excel / Data Analysis',
        topics: ['Data Cleaning', 'Data Analysis', 'Data Visualization', 'AI Functions in Excel', 'Real World Projects']
      },
      {
        title: 'Content Creation',
        topics: ['AI Writing Tools', 'Blog & Article Writing', 'Social Media Content', 'Image & Video Generation', 'Creative Use Cases']
      },
      {
        title: 'Presentations',
        topics: ['AI Presentation Tools', 'Design with AI', 'Slides & Infographics', 'Voice & Animation', 'Export & Share']
      },
      {
        title: 'Automation',
        topics: ['AI Automation Tools', 'Workflow Setup', 'Productivity Hacks', 'Real Life Scenarios', 'Hands-on Practice']
      }
    ]
  },
  {
    id: 'astro-career-counselling',
    title: 'Astro Career Counselling',
    category: 'Career & Skills',
    subjects: 'Coaching / Mentorship',
    duration: '1 Week to 8 Week',
    mode: 'Online - One on One / NA',
    oneToOneFee: '₹499 / hour',
    groupFee: 'NA',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'Personal Career Counselling',
        topics: ['Career Guidance & Planning', 'Strengths and Interests', 'Education and Career Direction']
      },
      {
        title: 'Goal Setting',
        topics: ['Short & Long Term Goals', 'Realistic Career Planning', 'Actionable Roadmap']
      },
      {
        title: 'Education/Career Direction',
        topics: ['Course Selection Guidance', 'Higher Education Options', 'Skill Development']
      },
      {
        title: 'Opportunity Discussion',
        topics: ['Job Market Insights', 'Career Opportunities', 'Industry Trends']
      },
      {
        title: 'Decision Making Guidance',
        topics: ['Confusion Resolution', 'Right Career Choice', 'Confidence Building']
      },
      {
        title: 'Actionable Plan',
        topics: ['Step-by-Step Plan', 'Practical Suggestions', 'Follow-up Support']
      }
    ]
  },
  {
    id: 'placement-guidance',
    title: 'Placement Guidance',
    category: 'Career & Skills',
    subjects: 'Coaching / Mentorship',
    duration: '1 Week to 8 Week',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹499 / hour',
    groupFee: '₹99 / hour',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'Placement Strategy',
        topics: ['Aptitude Preparation', 'Communication Skills', 'Group Discussion Basics', 'Interview Preparation', 'Career Planning']
      },
      {
        title: 'Aptitude Preparation',
        topics: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation', 'Practice Sets & Tests']
      },
      {
        title: 'Communication Skills',
        topics: ['Spoken English', 'Email Writing', 'Body Language', 'Presentation Skills', 'Confidence Building']
      },
      {
        title: 'Group Discussion Basics',
        topics: ['GD Rules & Tips', 'Current Affairs', 'GD Practice Sessions', 'Leadership Skills', 'Team Collaboration']
      },
      {
        title: 'Interview Preparation',
        topics: ['Common Questions', 'Technical & HR Round', 'Self Introduction', 'Mock Interviews', 'Feedback & Improvement']
      },
      {
        title: 'Career Growth',
        topics: ['Resume Building', 'LinkedIn Profile', 'Job Search Strategy', 'Application Tracking', 'Placement Support']
      }
    ]
  },
  {
    id: 'interview-preparation',
    title: 'Interview Preparation',
    category: 'Career & Skills',
    subjects: 'Interview Preparation',
    duration: '1 Week to 8 Week',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹499 / hour',
    groupFee: '₹99 / hour',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'HR Interview Questions',
        topics: ['Common HR Questions', 'Self Introduction', 'Resume-Based Questions', 'Situational Questions', 'Role-Specific Preparation']
      },
      {
        title: 'Self-Introduction',
        topics: ['How to Introduce Yourself', 'Key Points to Include', 'Body Language', 'Confidence Building', 'Practice Sessions']
      },
      {
        title: 'Resume-Based Questions',
        topics: ['Project & Work Experience', 'Skills & Tools', 'Achievements', 'Strengths & Weaknesses', 'Gap Handling']
      },
      {
        title: 'Communication Practice',
        topics: ['Verbal Communication', 'Active Listening', 'Clear & Confident Speaking', 'Answer Structuring', 'Mock Interviews']
      },
      {
        title: 'Situational & Behavioral',
        topics: ['Problem Solving', 'Decision Making', 'Role Play', 'Stress Management', 'Handling Difficult Questions']
      },
      {
        title: 'Feedback & Support',
        topics: ['Performance Review', 'Personalized Feedback', 'Improvement Plan', 'Follow-up Guidance', 'Placement Support']
      }
    ]
  },
  {
    id: 'resume-building',
    title: 'Resume Building',
    category: 'Career & Skills',
    subjects: 'Resume Structure & Writing',
    duration: '1 Week to 8 Week',
    mode: 'Online - One on One / Group',
    oneToOneFee: '₹499 / hour',
    groupFee: '₹99 / hour',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    syllabus: [
      {
        title: 'Resume Structure & Formatting',
        topics: ['Professional Resume Structure', 'ATS Friendly Formatting', 'Sections & Layout', "Do's & Don'ts"]
      },
      {
        title: 'Professional Writing',
        topics: ['Action Verbs & Impact Words', 'Achievement-Focused Writing', 'Quantifying Results', 'Tailoring for Job Roles']
      },
      {
        title: 'LinkedIn Profile Creation',
        topics: ['Profile Optimization', 'Headline & Summary', 'Skills & Endorsements', 'Professional Networking']
      },
      {
        title: 'Project Presentation',
        topics: ['Project Structure', 'Problem & Solution', 'Key Highlights', 'Visual Presentation Tips']
      },
      {
        title: 'Interview Preparation',
        topics: ['Common Questions', 'Self Introduction', 'Body Language', 'Mock Interviews', 'Confidence Building']
      },
      {
        title: 'Career Guidance',
        topics: ['Job Search Strategy', 'Industry Insights', 'Resume Review', 'Follow-up Guidance', 'Career Growth Tips']
      }
    ]
  },
  {
    id: 'aws-cloud-it-sales',
    title: 'AWS Cloud & IT Sales',
    category: 'Career & Skills',
    subjects: 'AWS Cloud & IT Sales',
    duration: '1 Week to 8 Week',
    mode: 'IT Sales | Online | Professional',
    oneToOneFee: '₹499 / hour',
    groupFee: '₹99 / hour',
    terms: 'Minimum batch of 5 Students or more',
    classesPerWeek: 3,
    classDuration: '1 Hour',
    timing: [
      'Sat - 7 AM to 8 AM',
      'Sat - 7 PM to 8 PM',
      'Sun - 7 PM to 8 PM'
    ],
    extraNotes: 'Complete 12-Module Practical Syllabus • Real-World Cases • Job Ready',
    syllabus: [
      {
        title: '01. Cloud Computing & AWS Fundamentals',
        topics: [
          'Cloud concepts & IaaS/PaaS/SaaS',
          'Public/private/hybrid cloud',
          'AWS global infrastructure',
          'Regions, Availability Zones and Edge Locations'
        ]
      },
      {
        title: '02. AWS Core Services',
        topics: [
          'EC2, S3, EBS, RDS, DynamoDB',
          'VPC, IAM, Route 53, CloudFront',
          'Lambda, CloudWatch, SNS and basic containers'
        ]
      },
      {
        title: '03. AWS Security & Architecture Basics',
        topics: [
          'IAM users/roles/policies',
          'Shared responsibility model',
          'Security basics & high availability',
          'Scalability, backup and disaster recovery concepts'
        ]
      },
      {
        title: '04. AWS Pricing & Commercial Basics',
        topics: [
          'Pay-as-you-go & pricing factors',
          'AWS pricing concepts',
          'TCO/ROI basics & cost optimization',
          'Preparing basic cloud quotations'
        ]
      },
      {
        title: '05. IT Sales Fundamentals',
        topics: [
          'B2B / B2C sales fundamentals',
          'Lead-to-close sales funnel',
          'Prospecting & qualification',
          'Pipeline management & territory/account planning',
          'Sales KPIs & metrics'
        ]
      },
      {
        title: '06. Lead Generation & Prospecting',
        topics: [
          'ICP & buyer personas',
          'Company research',
          'LinkedIn prospecting & outreach',
          'Cold calling & lead qualification',
          'Follow-up sequences'
        ]
      },
      {
        title: '07. Discovery & Requirement Gathering',
        topics: [
          'Discovery questions & identifying pain points',
          'Current IT setup analysis',
          'Business goals, budget & timeline',
          'Decision makers identification',
          'BANT/MEDDICC basics & requirements documentation'
        ]
      },
      {
        title: '08. AWS Solution Selling',
        topics: [
          'Mapping customer requirements to AWS services',
          'Value proposition & business benefits',
          'Real-world use cases & solution positioning',
          'Cross-sell/upsell & consultative selling'
        ]
      },
      {
        title: '09. Sales Communication & Demo Skills',
        topics: [
          'Sales pitch & elevator pitch',
          'AWS service explanation in simple business language',
          'Demo structure & presentation skills',
          'Email writing & professional communication'
        ]
      },
      {
        title: '10. Proposal, Quotation & Negotiation',
        topics: [
          'Solution proposal, scope & assumptions',
          'Pricing presentation & commercial discussion',
          'Objection handling & negotiation techniques',
          'Deal closing strategies'
        ]
      },
      {
        title: '11. CRM & Sales Operations',
        topics: [
          'CRM basics & lead/opportunity stages',
          'Activity logging & disciplined follow-ups',
          'Sales reports & revenue forecasting',
          'Pipeline hygiene & account management'
        ]
      },
      {
        title: '12. Practical Job Preparation',
        topics: [
          'Mock cold calls & discovery calls',
          'Objection-handling role plays',
          'IT Sales case studies & mini sales project',
          'Resume & LinkedIn profile guidance',
          'Interview questions & mock interviews'
        ]
      }
    ]
  }
];

export const QUALIFICATIONS = [
  '8th Class',
  '9th Class',
  '10th Class',
  '11th Class',
  '12th Class',
  'Diploma / Polytechnic',
  'BE / B.Tech (Undergraduate)',
  'BCA / B.Sc (IT / CS)',
  'B.Com / B.A / BBA / Other Graduate',
  'ME / M.Tech / MCA / M.Sc',
  'Working Professional / Job Seeker',
  'Other'
];

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
  'Other / Outside India'
];
