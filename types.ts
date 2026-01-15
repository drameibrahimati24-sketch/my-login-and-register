export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  password?: string; // Only used internally for mock auth
  // Profile fields
  title?: string;
  bio?: string;
  resumeData?: string; // Base64 encoded file
  resumeName?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  summary: string;
  description: string; // Restricted to members
  requirements: string[];
  postedDate: string;
  applicants: string[]; // Array of User IDs
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}