import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "@/utils/api";

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signin: (
    identifier: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        // Set token for API client
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Verify token with backend
        await checkAuthStatus();
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await apiClient.get("/api/auth/me");

      if (response.data.ok && response.data.user) {
        setUser(response.data.user);
      } else {
        await logout();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      await logout();
    }
  };

  const signin = async (identifier: string, password: string) => {
    try {
      const response = await apiClient.post("/api/auth/signin", {
        identifier,
        password,
      });

      if (response.data.ok && response.data.user && response.data.token) {
        // Store token
        await AsyncStorage.setItem(TOKEN_KEY, response.data.token);

        // Set token for future requests
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        // Set user
        setUser(response.data.user);

        return { success: true };
      } else {
        return {
          success: false,
          error: response.data.message || "Invalid credentials",
        };
      }
    } catch (error: any) {
      console.error("Signin error:", error);

      // Provide specific error messages for network issues
      if (error.code === "NETWORK_ERROR" || !error.response) {
        return {
          success: false,
          error:
            "Cannot connect to server. Please check if the backend is running and your network connection.",
        };
      }

      return {
        success: false,
        error:
          error.response?.data?.message || "Network error. Please try again.",
      };
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await apiClient.post("/api/auth/signup", {
        username,
        email,
        password,
      });

      if (response.data.ok && response.data.user) {
        // Check if token is provided
        if (response.data.token) {
          // Store token
          await AsyncStorage.setItem(TOKEN_KEY, response.data.token);

          // Set token for future requests
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
        } else {
          // Handle signup without immediate token (user needs to sign in)
          console.log(
            "Signup successful but no token provided. User will need to sign in."
          );
        }

        // Set user regardless of token presence
        setUser(response.data.user);

        return { success: true };
      } else {
        return {
          success: false,
          error: response.data.message || "Registration failed",
        };
      }
    } catch (error: any) {
      console.error("Signup error:", error);

      // Provide specific error messages for network issues
      if (error.code === "NETWORK_ERROR" || !error.response) {
        return {
          success: false,
          error:
            "Cannot connect to server. Please check if the backend is running and your network connection.",
        };
      }

      const errorMessage =
        error.response?.data?.message || "Network error. Please try again.";

      // Handle validation errors
      if (error.response?.data?.errors) {
        return {
          success: false,
          error: error.response.data.errors.join(", "),
        };
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const logout = async () => {
    try {
      // Call logout API if user is authenticated
      if (user) {
        await apiClient.post("/api/auth/logout");
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear local state regardless of API call success
      await AsyncStorage.removeItem(TOKEN_KEY);
      delete apiClient.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await apiClient.post("/api/auth/forgot-password", {
        email,
      });

      if (response.data.ok) {
        return { success: true };
      } else {
        return {
          success: false,
          error: response.data.message || "Failed to send reset email",
        };
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      return {
        success: false,
        error:
          error.response?.data?.message || "Network error. Please try again.",
      };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signin,
    signup,
    logout,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
