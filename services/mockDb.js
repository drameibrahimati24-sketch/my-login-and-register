const seedJobs = [
    // Existing/Generic
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'TechCorp',
        location: 'Singapore',
        workType: 'Hybrid',
        description: 'Lead frontend development using React and TypeScript for our regional HQ. We are looking for an experienced Senior Frontend Engineer to build scalable web applications.',
        requirements: '5+ years React, TypeScript expert, Tailwind CSS, Performance optimization',
        salary: 'SGD 8,000 - 12,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 2,
        title: 'Product Manager',
        company: 'GoJek',
        location: 'Jakarta, Indonesia',
        workType: 'Onsite',
        description: 'Drive product vision and strategy for our core transport platform.',
        requirements: '4+ years PM experience, Agile methodology, Data-driven decision making, Bahasa Indonesia fluent',
        salary: 'IDR 25,000,000 - 40,000,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 3,
        title: 'Go Backend Developer',
        company: 'Grab',
        location: 'Singapore',
        workType: 'Onsite',
        description: 'Build robust APIs and microservices for high-scale distributed systems.',
        requirements: 'Experience with distributed systems, Go, Kafka, AWS',
        salary: 'SGD 9,000 - 14,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 4,
        title: 'UX/UI Designer',
        company: 'Traveloka',
        location: 'Bangkok, Thailand',
        workType: 'Hybrid',
        description: 'Design beautiful and intuitive user interfaces for our travel app users in Thailand.',
        requirements: 'Portfolio required, Figma, Adobe XD, User Research',
        salary: 'THB 60,000 - 90,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    // New SEA Jobs
    {
        id: 5,
        title: 'Full Stack Developer',
        company: 'Shopee',
        location: 'Ho Chi Minh City, Vietnam',
        workType: 'Onsite',
        description: 'Join our dynamic e-commerce team. Work on both frontend (React) and backend (Go/Python).',
        requirements: 'React, Python/Go, MySQL, Redis',
        salary: 'USD 2,000 - 3,500',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 6,
        title: 'Remote Software Engineer',
        company: 'Canva',
        location: 'Manila, Philippines',
        workType: 'Remote',
        description: 'Work from anywhere in the Philippines! Help us empower the world to design.',
        requirements: 'Java, TypeScript, WebGL experience is a plus',
        salary: 'PHP 120,000 - 180,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 7,
        title: 'DevOps Engineer',
        company: 'Tokopedia',
        location: 'Jakarta, Indonesia',
        workType: 'Hybrid',
        description: 'Maintain and scale our cloud infrastructure.',
        requirements: 'Kubernetes, Terraform, GCP/AWS, CI/CD pipelines',
        salary: 'IDR 20,000,000 - 35,000,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 8,
        title: 'Data Scientist',
        company: 'Agoda',
        location: 'Bangkok, Thailand',
        workType: 'Onsite',
        description: 'Analyze large datasets to improve booking recommendations.',
        requirements: 'Python, SQL, Machine Learning, Statistics',
        salary: 'THB 80,000 - 120,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 9,
        title: 'React Native Developer',
        company: 'Lazada',
        location: 'Kuala Lumpur, Malaysia',
        workType: 'Hybrid',
        description: 'Build high-performance mobile apps for millions of users.',
        requirements: 'React Native, Redux, iOS/Android deployment',
        salary: 'MYR 8,000 - 12,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 10,
        title: 'Senior Ruby Engineer',
        company: 'MindValley',
        location: 'Kuala Lumpur, Malaysia',
        workType: 'Remote',
        description: 'Craft elegant Ruby code for our education platform.',
        requirements: 'Ruby on Rails, PostgreSQL, Redis, Sidekiq',
        salary: 'MYR 10,000 - 15,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 11,
        title: 'QA Automation Engineer',
        company: 'VNG Corporation',
        location: 'Ho Chi Minh City, Vietnam',
        workType: 'Onsite',
        description: 'Ensure the quality of our gaming and messaging platforms.',
        requirements: 'Selenium, Appium, Java/Python, CI/CD',
        salary: 'USD 1,500 - 2,500',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 12,
        title: 'Blockchain Developer',
        company: 'Coins.ph',
        location: 'Manila, Philippines',
        workType: 'Remote',
        description: 'Develop secure smart contracts and blockchain integrations.',
        requirements: 'Solidity, Web3.js, EVM knowledge',
        salary: 'PHP 150,000 - 250,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    // Global Jobs (USA, AUS, NZ, EU)
    {
        id: 13,
        title: 'Staff Software Engineer',
        company: 'Google',
        location: 'Mountain View, CA, USA',
        workType: 'Hybrid',
        description: 'Design and implement the next generation of Google Search infrastructure.',
        requirements: '10+ years experience, C++, Distributed Systems, Leadership',
        salary: 'USD 250,000 - 450,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 14,
        title: 'Frontend Developer',
        company: 'Atlassian',
        location: 'Sydney, Australia',
        workType: 'Hybrid',
        description: 'Build world-class collaboration tools used by millions.',
        requirements: 'React, Redux, Atlaskit, Testing Library',
        salary: 'AUD 120,000 - 160,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 15,
        title: 'Full Stack Engineer',
        company: 'Xero',
        location: 'Auckland, New Zealand',
        workType: 'Onsite',
        description: 'Help small businesses thrive with beautiful accounting software.',
        requirements: '.NET Core, React, SQL Server, AWS',
        salary: 'NZD 100,000 - 140,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 16,
        title: 'Backend Engineer',
        company: 'Spotify',
        location: 'Stockholm, Sweden',
        workType: 'Hybrid',
        description: 'Scale our audio streaming platform to reach billions of users.',
        requirements: 'Java, Scala, Cassandra, GCP',
        salary: 'SEK 60,000 - 85,000 / month',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 17,
        title: 'Data Engineer',
        company: 'Zalando',
        location: 'Berlin, Germany',
        workType: 'Onsite',
        description: 'Build data pipelines to power our fashion e-commerce platform.',
        requirements: 'Python, Spark, Airflow, Kubernetes',
        salary: 'EUR 70,000 - 95,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 18,
        title: 'iOS Developer',
        company: 'Revolut',
        location: 'London, UK',
        workType: 'Hybrid',
        description: 'Create the future of banking in our superapp.',
        requirements: 'Swift, SwiftUI, Combine, Clean Architecture',
        salary: 'GBP 80,000 - 120,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 19,
        title: 'Machine Learning Engineer',
        company: 'OpenAI',
        location: 'San Francisco, CA, USA',
        workType: 'Onsite',
        description: 'Train and deploy large language models.',
        requirements: 'Python, PyTorch, CUDA, Research background',
        salary: 'USD 300,000 - 500,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 20,
        title: 'Senior DevOps',
        company: 'Canva',
        location: 'Sydney, Australia',
        workType: 'Remote',
        description: 'Empower the world to design by ensuring our platform is always up.',
        requirements: 'AWS, Terraform, Go, Reliability Engineering',
        salary: 'AUD 150,000 - 200,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    // USA Expanded
    {
        id: 21,
        title: 'Cloud Architect',
        company: 'AWS',
        location: 'Seattle, WA, USA',
        workType: 'Remote',
        description: 'Design massive cloud solutions for enterprise customers.',
        requirements: 'AWS Certification, Java/Python, Enterprise Architecture',
        salary: 'USD 180,000 - 280,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 22,
        title: 'Security Engineer',
        company: 'Meta',
        location: 'Menlo Park, CA, USA',
        workType: 'Onsite',
        description: 'Protect billions of users from evolving threats.',
        requirements: 'Cybersecurity expert, C/C++, Rust, Network Protocol',
        salary: 'USD 220,000 - 320,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 23,
        title: 'Product Designer',
        company: 'Airbnb',
        location: 'San Francisco, CA, USA',
        workType: 'Remote',
        description: 'Reimagine the future of travel and belonging.',
        requirements: 'Product Design, UI/UX, Interaction Design, Figma',
        salary: 'USD 160,000 - 230,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 24,
        title: 'Data Scientist',
        company: 'Netflix',
        location: 'Los Gatos, CA, USA',
        workType: 'Hybrid',
        description: 'Optimize content recommendations using deep learning.',
        requirements: 'PhD/Masters in CS/Stats, PyTorch, SQL, Big Data',
        salary: 'USD 250,000 - 400,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    // Australia & NZ Expanded
    {
        id: 25,
        title: 'Site Reliability Engineer',
        company: 'SafetyCulture',
        location: 'Townsville, Australia',
        workType: 'Remote',
        description: 'Ensure the safety of workers globally through high availability.',
        requirements: 'Kubernetes, Go, Prometheus, Cloud Native',
        salary: 'AUD 140,000 - 190,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 26,
        title: 'Software Engineer',
        company: 'Rocket Lab',
        location: 'Mahia, New Zealand',
        workType: 'Onsite',
        description: 'Write code that literally goes to space.',
        requirements: 'Embedded C++, Real-time Systems, Safety Critical',
        salary: 'NZD 110,000 - 160,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 27,
        title: 'Mobile Developer (Flutter)',
        company: 'Afterpay',
        location: 'Melbourne, Australia',
        workType: 'Hybrid',
        description: 'Build the next generation of fintech mobile experiences.',
        requirements: 'Flutter, Dart, Mobile Architecture, CI/CD',
        salary: 'AUD 130,000 - 170,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    // Europe Expanded
    {
        id: 28,
        title: 'Core Backend Engineer',
        company: 'Deliveroo',
        location: 'London, UK',
        workType: 'Hybrid',
        description: 'Optimize food delivery logistics at scale.',
        requirements: 'Ruby, Go, PostgreSQL, Redis',
        salary: 'GBP 75,000 - 110,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 29,
        title: 'Systems Programmer',
        company: 'Yandex',
        location: 'Amsterdam, Netherlands',
        workType: 'Onsite',
        description: 'Work on search engine internals and high-load systems.',
        requirements: 'C++, System programming, Linux kernel',
        salary: 'EUR 80,000 - 120,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 30,
        title: 'Security Researcher',
        company: 'Adyen',
        location: 'Amsterdam, Netherlands',
        workType: 'Hybrid',
        description: 'Find vulnerabilities in global payment infrastructure.',
        requirements: 'Penetration testing, AppSec, Cryptography',
        salary: 'EUR 90,000 - 140,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 31,
        title: 'React Engineer',
        company: 'Booking.com',
        location: 'Manchester, UK',
        workType: 'Remote',
        description: 'Make it easier for everyone to experience the world.',
        requirements: 'React, TypeScript, GraphQL, A/B Testing',
        salary: 'GBP 70,000 - 100,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 32,
        title: 'Python Developer',
        company: 'Criteo',
        location: 'Paris, France',
        workType: 'Hybrid',
        description: 'Build massive ad-tech systems handling billions of requests.',
        requirements: 'Python, Scala, Spark, Kafka',
        salary: 'EUR 65,000 - 90,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 33,
        title: 'Platform Engineer',
        company: 'N26',
        location: 'Berlin, Germany',
        workType: 'Remote',
        description: 'Build the underlying infrastructure for a mobile-first bank.',
        requirements: 'Java, Spring Boot, Kubernetes, AWS',
        salary: 'EUR 85,000 - 125,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    // More USA
    {
        id: 34,
        title: 'Full Stack Developer',
        company: 'Twitter',
        location: 'Austin, TX, USA',
        workType: 'Remote',
        description: 'Help build the global town square.',
        requirements: 'Scala, React, GraphQL, Distributed Cache',
        salary: 'USD 170,000 - 250,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 35,
        title: 'Android Engineer',
        company: 'Uber',
        location: 'New York, NY, USA',
        workType: 'Hybrid',
        description: 'Build the next generation of logistics apps.',
        requirements: 'Kotlin, RxJava, Dagger, MVVM',
        salary: 'USD 190,000 - 280,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 36,
        title: 'Embedded Systems Engineer',
        company: 'Tesla',
        location: 'Palo Alto, CA, USA',
        workType: 'Onsite',
        description: 'Write code for the brains of our electric vehicles.',
        requirements: 'C, Linux Kernel, RTOS, Control Systems',
        salary: 'USD 150,000 - 220,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 37,
        title: 'Cloud Security Engineer',
        company: 'Salesforce',
        location: 'San Francisco, CA, USA',
        workType: 'Remote',
        description: 'Secure the world\'s #1 CRM platform.',
        requirements: 'GCP/Azure Security, Python, Go, IAM',
        salary: 'USD 175,000 - 255,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    },
    {
        id: 38,
        title: 'Game Engine Developer',
        company: 'Epic Games',
        location: 'Cary, NC, USA',
        workType: 'Hybrid',
        description: 'Work on Unreal Engine 5 rendering core.',
        requirements: 'C++, DirectX/Vulkan, Graphics Math',
        salary: 'USD 140,000 - 200,000',
        status: 'ACTIVE',
        createdAt: new Date(),
        creator: { name: 'Admin User' }
    }
];

const seedUsers = [
    { id: 1, email: 'admin@jobnexus.com', password: 'admin', name: 'Admin User', role: 'ADMIN', bio: 'Platform Administrator', location: 'Global' },
    { id: 2, email: 'user@example.com', password: 'password', name: 'Demo User', role: 'USER', bio: 'Passionate Developer', location: 'Singapore' }
];

class MockClient {
    constructor() {
        this.jobs = [...seedJobs];
        this.users = [...seedUsers];

        this.jobVacancy = {
            findMany: async (args) => {
                let results = [...this.jobs];

                if (args && args.where) {
                    // Filter by WorkType (array or string)
                    if (args.where.workType) {
                        const types = Array.isArray(args.where.workType.in) ? args.where.workType.in : [args.where.workType];
                        results = results.filter(job => types.includes(job.workType));
                    }

                    // Filter by generic Search (title, company, location)
                    if (args.where.OR) {
                        const search = args.where.OR[0].title.contains.toLowerCase(); // Simplified interpretation
                        results = results.filter(job =>
                            job.title.toLowerCase().includes(search) ||
                            job.company.toLowerCase().includes(search) ||
                            job.location.toLowerCase().includes(search)
                        );
                    }
                }

                return results;
            },
            findUnique: async ({ where }) => this.jobs.find(job => job.id === parseInt(where.id)) || null,
            create: async ({ data }) => {
                const newJob = {
                    ...data,
                    id: this.jobs.length + 1,
                    createdAt: new Date(),
                    creator: { name: 'Admin User' }
                };
                this.jobs.push(newJob);
                return newJob;
            }
        };

        this.user = {
            findUnique: async ({ where }) => {
                if (where.email) return this.users.find(u => u.email === where.email) || null;
                if (where.id) return this.users.find(u => u.id === where.id) || null;
                return null;
            },
            create: async ({ data }) => {
                const newUser = {
                    ...data,
                    id: this.users.length + 1,
                    role: data.role || 'USER'
                };
                this.users.push(newUser);
                return newUser;
            },
            update: async ({ where, data }) => {
                const user = this.users.find(u => u.id === parseInt(where.id));
                if (user) {
                    Object.assign(user, data);
                    return user;
                }
                return null;
            },
            findMany: async () => this.users
        };

        this.applications = [];
        this.application = {
            create: async ({ data }) => {
                const newApp = { ...data, id: this.applications.length + 1, appliedAt: new Date() };
                this.applications.push(newApp);
                return newApp;
            },
            findMany: async ({ where }) => {
                if (where && where.userId) {
                    return this.applications.filter(app => app.userId === where.userId);
                }
                return this.applications;
            }
        };
    }
}

module.exports = new MockClient();
