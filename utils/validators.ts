/**
 * Input validation utilities for React Native
 * 
 * Provides client-side validation for authentication forms
 * to ensure data integrity and user experience
 */

import validator from 'validator';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
    return { isValid: false, errors };
  }
  
  if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (email.length > 254) {
    errors.push('Email cannot exceed 254 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate username
 * @param username - Username to validate
 * @returns Validation result
 */
export function validateUsername(username: string): ValidationResult {
  const errors: string[] = [];
  
  if (!username || typeof username !== 'string') {
    errors.push('Username is required');
    return { isValid: false, errors };
  }
  
  const trimmed = username.trim();
  
  if (trimmed.length < 3) {
    errors.push('Username must be at least 3 characters');
  }
  
  if (trimmed.length > 30) {
    errors.push('Username cannot exceed 30 characters');
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    errors.push('Username can only contain letters, numbers, underscores, and hyphens');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate password
 * @param password - Password to validate
 * @returns Validation result
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (password.length > 128) {
    errors.push('Password cannot exceed 128 characters');
  }
  
  // Check for at least one letter and one number
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one letter and one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate signup data
 * @param data - Signup form data
 * @returns Validation result
 */
export function validateSignupData(data: {
  username: string;
  email: string;
  password: string;
}): ValidationResult {
  const errors: string[] = [];
  
  const usernameValidation = validateUsername(data.username);
  if (!usernameValidation.isValid) {
    errors.push(...usernameValidation.errors);
  }
  
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }
  
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate signin data
 * @param data - Signin form data
 * @returns Validation result
 */
export function validateSigninData(data: {
  identifier: string;
  password: string;
}): ValidationResult {
  const errors: string[] = [];
  
  if (!data.identifier || typeof data.identifier !== 'string') {
    errors.push('Username or email is required');
  }
  
  if (!data.password || typeof data.password !== 'string') {
    errors.push('Password is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate forgot password data
 * @param data - Forgot password form data
 * @returns Validation result
 */
export function validateForgotPasswordData(data: {
  email: string;
}): ValidationResult {
  return validateEmail(data.email);
}