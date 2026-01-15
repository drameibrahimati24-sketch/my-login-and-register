import { Job, User, UserRole } from '../types';

const JOBS_KEY = 'jobnexus_jobs';
const USERS_KEY = 'jobnexus_users';

// Seed Data
const SEED_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    salaryRange: '$120k - $160k',
    summary: 'Lead frontend development using React and TypeScript.',
    description: 'We are looking for an experienced Senior Frontend Engineer to build scalable web applications. You will be working with a team of talented engineers to deliver high-quality software using modern web technologies.',
    requirements: ['5+ years React', 'TypeScript expert', 'Tailwind CSS', 'Performance optimization'],
    postedDate: new Date().toISOString(),
    applicants: []
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Innovate Inc',
    location: 'New York, NY',
    type: 'Full-time',
    salaryRange: '$130k - $170k',
    summary: 'Drive product vision and strategy for our core platform.',
    description: 'As a Product Manager, you will define the product roadmap, gather requirements from stakeholders, and work closely with engineering and design teams to launch successful products.',
    requirements: ['4+ years PM experience', 'Agile methodology', 'Data-driven decision making'],
    postedDate: new Date(Date.now() - 86400000).toISOString(),
    applicants: []
  },
  {
    id: '3',
    title: 'AI Researcher',
    company: 'Future AI',
    location: 'San Francisco, CA',
    type: 'Contract',
    salaryRange: '$90 - $160 / hr',
    summary: 'Research and implement cutting-edge LLM applications.',
    description: 'Join our research team to explore the boundaries of Large Language Models. You will experiment with new architectures, fine-tuning techniques, and evaluate model performance.',
    requirements: ['PhD in CS or related', 'Python', 'PyTorch/TensorFlow', 'NLP expertise'],
    postedDate: new Date(Date.now() - 172800000).toISOString(),
    applicants: []
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    location: 'Austin, TX',
    type: 'Full-time',
    salaryRange: '$110k - $150k',
    summary: 'Manage cloud infrastructure and CI/CD pipelines.',
    description: 'We are seeking a DevOps Engineer to maintain and improve our cloud infrastructure. You will automate deployment processes, ensure system reliability, and monitor performance.',
    requirements: ['AWS/GCP experience', 'Docker & Kubernetes', 'Terraform', 'CI/CD pipelines'],
    postedDate: new Date(Date.now() - 259200000).toISOString(),
    applicants: []
  },
  {
    id: '5',
    title: 'UX/UI Designer',
    company: 'Creative Studios',
    location: 'London, UK (Remote)',
    type: 'Contract',
    salaryRange: '£400 - £600 / day',
    summary: 'Design intuitive and beautiful user interfaces.',
    description: 'Create user-centered designs by understanding business requirements, and user feedback. You will create user flows, wireframes, prototypes and mockups.',
    requirements: ['Portfolio required', 'Figma mastery', 'User research', 'Interaction design'],
    postedDate: new Date(Date.now() - 345600000).toISOString(),
    applicants: []
  },
  {
    id: '6',
    title: 'Marketing Specialist',
    company: 'GrowthRocket',
    location: 'Chicago, IL',
    type: 'Full-time',
    salaryRange: '$70k - $90k',
    summary: 'Execute digital marketing campaigns to drive growth.',
    description: 'Plan and execute all web, SEO/SEM, marketing database, email, social media and display advertising campaigns. Measure and report performance of all digital marketing campaigns.',
    requirements: ['3+ years Digital Marketing', 'SEO/SEM experience', 'Google Analytics', 'Content creation'],
    postedDate: new Date(Date.now() - 432000000).toISOString(),
    applicants: []
  },
  {
    id: '7',
    title: 'Backend Developer (Go)',
    company: 'FinTech Solutions',
    location: 'Remote',
    type: 'Full-time',
    salaryRange: '$130k - $165k',
    summary: 'Build high-performance financial transaction systems.',
    description: 'Design and develop robust backend services using Go. Work on high-concurrency systems, ensure data integrity, and integrate with banking APIs.',
    requirements: ['Go experience', 'PostgreSQL', 'Microservices architecture', 'gRPC'],
    postedDate: new Date(Date.now() - 518400000).toISOString(),
    applicants: []
  }
];

// Seed Users
const SEED_USERS: User[] = [
  {
    id: 'admin-1',
    username: 'admin',
    name: 'Admin User',
    role: UserRole.ADMIN,
    password: 'admin' // Updated password
  },
  {
    id: 'member-1',
    username: 'member',
    name: 'John Doe',
    role: UserRole.MEMBER,
    password: 'password',
    title: 'Software Developer',
    bio: 'Passionate developer with a love for clean code and modern web technologies.'
  }
];

const initializeDb = () => {
  if (!localStorage.getItem(JOBS_KEY)) {
    localStorage.setItem(JOBS_KEY, JSON.stringify(SEED_JOBS));
  }
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
  }
};

initializeDb();

export const getJobs = (): Job[] => {
  const jobs = localStorage.getItem(JOBS_KEY);
  return jobs ? JSON.parse(jobs) : [];
};

export const saveJobs = (jobs: Job[]) => {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
};

export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const updateUser = (updatedUser: User) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    // Preserve password if not provided in update (though in this mock type it is optional)
    const existingPassword = users[index].password;
    users[index] = { ...updatedUser, password: updatedUser.password || existingPassword };
    saveUsers(users);
  }
};