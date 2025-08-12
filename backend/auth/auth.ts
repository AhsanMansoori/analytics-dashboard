import { api, APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";

const jwtSecret = secret("JWTSecret");

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "viewer";
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: "admin" | "manager" | "viewer";
}

// Mock user database
const users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
  },
  {
    id: "2",
    email: "manager@example.com",
    name: "Manager User",
    role: "manager",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
  },
  {
    id: "3",
    email: "viewer@example.com",
    name: "Viewer User",
    role: "viewer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
  }
];

// Mock password validation (in real app, use proper hashing)
const validatePassword = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email);
  if (!user) return null;
  
  // Simple mock validation - in real app, compare hashed passwords
  if (password === "password123") {
    return user;
  }
  return null;
};

// Generate mock JWT token (in real app, use proper JWT library)
const generateToken = (user: User): string => {
  return `mock_token_${user.id}_${Date.now()}`;
};

// Login user
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    const user = validatePassword(req.email, req.password);
    if (!user) {
      throw APIError.unauthenticated("Invalid email or password");
    }

    const token = generateToken(user);
    return { user, token };
  }
);

// Register new user
export const register = api<RegisterRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    const existingUser = users.find(u => u.email === req.email);
    if (existingUser) {
      throw APIError.alreadyExists("User with this email already exists");
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      email: req.email,
      name: req.name,
      role: req.role || "viewer",
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face`
    };

    users.push(newUser);
    const token = generateToken(newUser);
    return { user: newUser, token };
  }
);

// Get current user profile
export const getProfile = api<void, User>(
  { expose: true, method: "GET", path: "/auth/profile", auth: true },
  async () => {
    // In a real app, extract user from auth token
    // For demo, return admin user
    return users[0];
  }
);
