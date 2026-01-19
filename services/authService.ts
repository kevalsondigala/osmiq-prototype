// Authentication service for FastAPI backend with JWT tokens

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface SignUpData {
  email: string;
  password: string;
  full_name?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  access_token: string;
  token_type: string;
}

export interface User {
  email: string;
  full_name?: string;
}

// Get stored token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Store token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem('access_token', token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};

// Store user data
export const setUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user data
export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Sign up API call
export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      // Only include full_name if it's provided
      ...(data.full_name && { full_name: data.full_name }),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Sign up failed' }));
    throw new Error(error.detail || error.message || 'Sign up failed');
  }

  const result: AuthResponse = await response.json();
  
  // Store token and user data (email from form since API doesn't return user object)
  if (result.access_token) {
    setToken(result.access_token);
    // Store email from the form data
    setUser({ email: data.email, full_name: data.full_name });
  }

  return result;
};

// Sign in API call
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Sign in failed' }));
    throw new Error(error.detail || error.message || 'Sign in failed');
  }

  const result: AuthResponse = await response.json();
  
  // Store token and user data (email from form since API doesn't return user object)
  if (result.access_token) {
    setToken(result.access_token);
    // Store email from the form data
    setUser({ email: data.email });
  }

  return result;
};

// Sign out
export const signOut = (): void => {
  removeToken();
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Get authorization header for API calls
export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
