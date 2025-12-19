
// Grid Component for all Career Roles
export const CareerRoles = [
    {
        id: 'ml-engineer',
        title: 'Machine Learning Engineer',
        description:
          'A Machine Learning Engineer builds and optimizes algorithms that enable computers to learn from data, using large datasets and neural networks.',
        likes:
          'developing machine learning models, working with large datasets, coding in Python or R.',
        credentials: ['Machine Learning', 'MathWorks Computer Vision Engineer'],
        courses: [
          {
            title: 'Machine Learning',
            provider: 'Coursera – Andrew Ng',
            url: 'https://www.coursera.org/learn/machine-learning',
          },
          {
            title: 'Deep Learning Specialization',
            provider: 'Coursera – DeepLearning.AI',
            url: 'https://www.coursera.org/specializations/deep-learning',
          },
          {
            title: 'TensorFlow Developer Professional Certificate',
            provider: 'Coursera – DeepLearning.AI',
            url: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice',
          },
        ],
        courseSections: [
          {
            title: 'ML Courses',
            items: [
              'Supervised Learning (Regression & Classification)',
              'Unsupervised Learning (Clustering & Dimensionality Reduction)',
              'Deep Learning & Neural Networks',
            ],
          },
          {
            title: 'ML Tools',
            items: ['TensorFlow / PyTorch', 'scikit-learn', 'Pandas & NumPy'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/2okXQwMsMaDLsff3uh3uUz/c619cf8860813538a005dbea25425df5/Data_Scientist-role-card_2x.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'data-scientist',
        title: 'Data Scientist',
        description:
          'A Data Scientist analyzes large datasets to uncover insights, using statistics, machine learning, and visualization to inform business strategies.',
        likes:
          'analyzing complex datasets, developing machine learning models, solving statistical problems.',
        credentials: ['IBM Data Science'],
        courses: [
          {
            title: 'IBM Data Science Professional Certificate',
            provider: 'Coursera – IBM',
            url: 'https://www.coursera.org/professional-certificates/ibm-data-science',
          },
          {
            title: 'Applied Data Science with Python Specialization',
            provider: 'Coursera – University of Michigan',
            url: 'https://www.coursera.org/specializations/data-science-python',
          },
          {
            title: 'SQL for Data Science',
            provider: 'Coursera – UC Davis',
            url: 'https://www.coursera.org/learn/sql-for-data-science',
          },
        ],
        courseSections: [
          {
            title: 'Core DS Courses',
            items: [
              'Statistics for Data Science',
              'Machine Learning Foundations',
              'Experimentation & A/B Testing',
            ],
          },
          {
            title: 'Tools',
            items: ['Python for Data Science', 'SQL for Data Analysis', 'Jupyter & Notebooks'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/1Z2h61l00YMxiMD8Xu7sHw/669880819cd3c5eac5a5fd08606679d1/data-analyst-role-card_2x.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'data-analyst',
        title: 'Data Analyst',
        description:
          'A Data Analyst collects, cleans, and interprets data, using tools like Excel, SQL, and Tableau to analyze trends and provide insights for decisions.',
        likes:
          'analyzing data to find insights, creating reports and visualizations, working with spreadsheets and databases.',
        credentials: ['Meta Data Analyst', 'Google Data Analytics'],
        courses: [
          {
            title: 'Google Data Analytics Professional Certificate',
            provider: 'Coursera – Google',
            url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
          },
          {
            title: 'Meta Data Analyst Professional Certificate',
            provider: 'Coursera – Meta',
            url: 'https://www.coursera.org/professional-certificates/meta-data-analyst',
          },
          {
            title: 'Excel Skills for Business Specialization',
            provider: 'Coursera – Macquarie University',
            url: 'https://www.coursera.org/specializations/excel',
          },
        ],
        courseSections: [
          {
            title: 'Analytics Courses',
            items: ['Excel for Data Analysis', 'SQL Basics', 'Data Visualization Fundamentals'],
          },
          {
            title: 'BI Tools',
            items: ['Tableau Dashboards', 'Power BI Reports', 'Google Data Studio'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/6P1lduhkejcpwRSf4ZoXNo/f6ba11098ae471839b228b5f800c47a1/python-developer-role-card_1X.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'python-developer',
        title: 'Python Developer',
        description:
          'A Python Developer specializes in writing server-side web application logic.',
        likes:
          'writing code, solving complex problems through algorithms, working with data.',
        credentials: ['Python for Everybody', 'AI Agent Developer'],
        courses: [
          {
            title: 'Python for Everybody Specialization',
            provider: 'Coursera – University of Michigan',
            url: 'https://www.coursera.org/specializations/python',
          },
          {
            title: 'Python 3 Programming Specialization',
            provider: 'Coursera – University of Michigan',
            url: 'https://www.coursera.org/specializations/python-3-programming',
          },
          {
            title: 'Django for Everybody',
            provider: 'Coursera – University of Michigan',
            url: 'https://www.coursera.org/specializations/django',
          },
        ],
        courseSections: [
          {
            title: 'Core Python',
            items: ['Python Basics', 'Object-Oriented Python', 'Error Handling & Testing'],
          },
          {
            title: 'Backend & APIs',
            items: ['REST APIs with FastAPI/Django', 'Databases with SQLAlchemy', 'Authentication & Security'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/6avnH5aIWbiAX2JCI3PeaG/ab20caf9ec9832ad7548eb226a9c3355/Business_Intelligence_Analyst-role-card_2x.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'bi-analyst',
        title: 'Business Intelligence Analyst',
        description:
          'A Business Intelligence Analyst analyzes and visualizes data to support business decisions, using Tableau and Power BI to drive strategy.',
        likes:
          'interpreting data to support decision-making, creating dashboards and reports, identifying business trends.',
        credentials: [
          'Microsoft Power BI Data Analyst',
          'IBM Business Intelligence (BI) Analyst',
        ],
        courses: [
          {
            title: 'Microsoft Power BI Data Analyst Professional Certificate',
            provider: 'Coursera – Microsoft',
            url: 'https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst',
          },
          {
            title: 'IBM Business Intelligence Analyst Professional Certificate',
            provider: 'Coursera – IBM',
            url: 'https://www.coursera.org/professional-certificates/ibm-business-intelligence-analyst',
          },
          {
            title: 'Data Visualization with Tableau Specialization',
            provider: 'Coursera – UC Davis',
            url: 'https://www.coursera.org/specializations/data-visualization',
          },
        ],
        courseSections: [
          {
            title: 'BI Foundations',
            items: ['Data Warehousing Basics', 'ETL Concepts', 'Dimensional Modeling'],
          },
          {
            title: 'Dashboards',
            items: ['Power BI Dashboards', 'Advanced DAX', 'Storytelling with Data'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/2C0PGe8TYeHJgf2lyniSiC/6d176c0328e05a877a79213acba4377e/Front_End_Dev-role-card_2x.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'frontend-developer',
        title: 'Front End Developer',
        description:
          'A Front End Developer enhances the visual and interactive parts of websites and apps, ensuring a seamless experience using HTML, CSS, and JavaScript.',
        likes:
          'designing websites and applications, coding in HTML/CSS/JavaScript, making sites user-friendly.',
        credentials: ['Meta Front-End Developer', 'Microsoft Front-End Developer'],
        courses: [
          {
            title: 'Meta Front-End Developer Professional Certificate',
            provider: 'Coursera – Meta',
            url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
          },
          {
            title: 'HTML, CSS, and Javascript for Web Developers',
            provider: 'Coursera – Johns Hopkins University',
            url: 'https://www.coursera.org/learn/html-css-javascript-for-web-developers',
          },
          {
            title: 'Front-End Web Development with React',
            provider: 'Coursera – HKUST',
            url: 'https://www.coursera.org/learn/front-end-react',
          },
        ],
        courseSections: [
          {
            title: 'Core Frontend',
            items: ['HTML & Semantic Markup', 'Modern CSS & Flex/Grid', 'JavaScript Essentials'],
          },
          {
            title: 'Frameworks',
            items: ['React Basics', 'Routing & State Management', 'UI Libraries (Tailwind/Material UI)'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/2C0PGe8TYeHJgf2lyniSiC/6d176c0328e05a877a79213acba4377e/Front_End_Dev-role-card_2x.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'automation-engineer',
        title: 'Automation Engineer',
        description:
          'An Automation Engineer designs and implements systems to enhance efficiency and reduce manual tasks, focusing on automation and CI/CD pipelines.',
        likes:
          'developing automated solutions, writing scripts for automation, improving process efficiency.',
        credentials: ['AI Agent Developer'],
        courses: [
          {
            title: 'Google IT Automation with Python Professional Certificate',
            provider: 'Coursera – Google',
            url: 'https://www.coursera.org/professional-certificates/google-it-automation',
          },
          {
            title: 'DevOps on AWS Specialization',
            provider: 'Coursera – Amazon Web Services',
            url: 'https://www.coursera.org/specializations/aws-devops',
          },
          {
            title: 'Jenkins, From Zero to Hero',
            provider: 'Udemy',
            url: 'https://www.udemy.com/course/jenkins-from-zero-to-hero',
          },
        ],
        courseSections: [
          {
            title: 'Automation & Scripting',
            items: ['Python/Bash Scripting', 'Task Automation Basics', 'API-based Automation'],
          },
          {
            title: 'CI/CD & Tools',
            items: ['GitHub Actions / GitLab CI', 'Jenkins Pipelines', 'Monitoring & Alerting Basics'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/2C0PGe8TYeHJgf2lyniSiC/6d176c0328e05a877a79213acba4377e/Front_End_Dev-role-card_2x.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'content-creator',
        title: 'Content Creator',
        description:
          'A Content Creator produces a variety of content formats for digital platforms, including articles, videos, and social media posts.',
        likes:
          'creating engaging digital content, experimenting with new strategies, analyzing audience feedback to enhance brand visibility.',
        credentials: ['Adobe Content Creator: Launching Your Creative Career'],
        courses: [
          {
            title: 'Content Strategy for Professionals',
            provider: 'Coursera – Northwestern University',
            url: 'https://www.coursera.org/specializations/content-strategy',
          },
          {
            title: 'Viral Marketing and How to Craft Contagious Content',
            provider: 'Coursera – Wharton',
            url: 'https://www.coursera.org/learn/wharton-contagious',
          },
          {
            title: 'Adobe Creative Cloud Essentials',
            provider: 'Udemy / LinkedIn Learning',
            url: 'https://www.udemy.com/topic/adobe-creative-cloud',
          },
        ],
        courseSections: [
          {
            title: 'Content Strategy',
            items: ['Content Planning & Calendars', 'Copywriting Basics', 'Audience Research'],
          },
          {
            title: 'Creation Tools',
            items: ['Video Editing Basics', 'Graphic Assets with Canva/Adobe', 'Social Media Platforms'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/iephoZOhFiNZYoayUEaCe/cf665f3feecab550625cc8119e601c63/Video_Game_Dev-role-card_2x.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'cybersecurity-analyst',
        title: 'Cyber Security Analyst',
        description:
          'A Cyber Security Analyst monitors IT systems, analyzes threats, finds vulnerabilities, and implements measures to protect data from cyber attacks.',
        likes:
          'protecting networks and data from cyber threats, analyzing security vulnerabilities, developing security protocols.',
        credentials: ['Google Cybersecurity', 'Microsoft Cybersecurity Analyst'],
        courses: [
          {
            title: 'Google Cybersecurity Professional Certificate',
            provider: 'Coursera – Google',
            url: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
          },
          {
            title: 'IBM Cybersecurity Analyst Professional Certificate',
            provider: 'Coursera – IBM',
            url: 'https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst',
          },
          {
            title: 'Introduction to Cyber Security',
            provider: 'Coursera – NYU',
            url: 'https://www.coursera.org/learn/intro-cyber-security',
          },
        ],
        courseSections: [
          {
            title: 'Security Fundamentals',
            items: ['Network Security Basics', 'Threats & Vulnerabilities', 'Incident Response'],
          },
          {
            title: 'Security Tools',
            items: ['SIEM Basics', 'Vulnerability Scanners', 'Linux & Scripting for Security'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/2N0tEsKT8I43g8FLxaNguT/1a6bb92b0d27c9dd364a7a8dd7a3e428/Android-Dev-role-card_2x.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'game-developer',
        title: 'Video Game Developer',
        description:
          'A Video Game Developer designs and codes games, creating engaging gameplay through programming and collaboration.',
        likes:
          'designing and coding video games, creating engaging gameplay experiences, collaborating with artists and designers.',
        credentials: [
          'Game Design and Development with Unity',
          'C# Programming for Unity Game Development',
        ],
        courses: [
          {
            title: 'Game Design and Development with Unity Specialization',
            provider: 'Coursera – Michigan State University',
            url: 'https://www.coursera.org/specializations/game-design-and-development',
          },
          {
            title: 'C# Programming for Unity Game Development Specialization',
            provider: 'Coursera – University of Colorado',
            url: 'https://www.coursera.org/specializations/programming-unity-game-development',
          },
          {
            title: 'Unity Certified Programmer Exam Preparation',
            provider: 'Coursera – Unity',
            url: 'https://www.coursera.org/specializations/unity-prog',
          },
        ],
        courseSections: [
          {
            title: 'Game Dev Core',
            items: ['Game Design Principles', 'Unity Fundamentals', 'C# Scripting for Games'],
          },
          {
            title: 'Game Systems',
            items: ['Physics & Animation', 'UI & Menus', 'Level Design Basics'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/6P1lduhkejcpwRSf4ZoXNo/f6ba11098ae471839b228b5f800c47a1/python-developer-role-card_1X.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'graphic-designer',
        title: 'Graphic Designer',
        description:
          'A Graphic Designer develops visual content for print and digital media. They combine art and technology to communicate through images and layout.',
        likes:
          'creating visually appealing designs, using advanced design software, collaborating with other creatives.',
        credentials: [
          'Graphic Design',
          'Adobe Graphic Designer: Design that Demands Attention',
        ],
        courses: [
          {
            title: 'Graphic Design Specialization',
            provider: 'Coursera – CalArts',
            url: 'https://www.coursera.org/specializations/graphic-design',
          },
          {
            title: 'Fundamentals of Graphic Design',
            provider: 'Coursera – CalArts',
            url: 'https://www.coursera.org/learn/fundamentals-of-graphic-design',
          },
          {
            title: 'Adobe Photoshop CC – Essentials',
            provider: 'Udemy',
            url: 'https://www.udemy.com/course/adobe-photoshop-cc-essentials-training-course',
          },
        ],
        courseSections: [
          {
            title: 'Design Foundations',
            items: ['Color Theory', 'Typography', 'Layout & Composition'],
          },
          {
            title: 'Design Tools',
            items: ['Adobe Photoshop Basics', 'Illustrator & Vector Graphics', 'Branding & Visual Identity'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/2N0tEsKT8I43g8FLxaNguT/1a6bb92b0d27c9dd364a7a8dd7a3e428/Android-Dev-role-card_2x.png?auto=format%2Ccompress&dpr=1&w=430',
      },
      {
        id: 'android-developer',
        title: 'Android Developer / Engineer',
        description:
          'An Android Developer builds, tests, and optimizes apps for Android, focusing on performance and compatibility, using Java, Kotlin, and Android SDK.',
        likes: 'building mobile apps, coding in Java/Kotlin, solving technical problems.',
        credentials: [
          'Meta Android Developer',
          'IBM iOS and Android Mobile App Developer',
        ],
        courses: [
          {
            title: 'Meta Android Developer Professional Certificate',
            provider: 'Coursera – Meta',
            url: 'https://www.coursera.org/professional-certificates/meta-android-developer',
          },
          {
            title: 'Android App Development Specialization',
            provider: 'Coursera – Vanderbilt University',
            url: 'https://www.coursera.org/specializations/android-app-development',
          },
          {
            title: 'Android App Development with Kotlin',
            provider: 'Google / Udacity',
            url: 'https://www.udacity.com/course/developing-android-apps-with-kotlin--ud9012',
          },
        ],
        courseSections: [
          {
            title: 'Android Core',
            items: ['Kotlin/Java Basics', 'Android UI & Layouts', 'Activities & Fragments'],
          },
          {
            title: 'Advanced Mobile',
            items: ['Networking & APIs', 'Local Storage & Room', 'App Performance & Debugging'],
          },
        ],
        image:
          'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/00atxywtfxvd/2N0tEsKT8I43g8FLxaNguT/1a6bb92b0d27c9dd364a7a8dd7a3e428/Android-Dev-role-card_2x.png?auto=format%2Ccompress&dpr=1&w=430',
      },
    ];
