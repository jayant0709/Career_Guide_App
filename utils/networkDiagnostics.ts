/**
 * Network Diagnostics Utility
 * Helps diagnose network connectivity issues between mobile app and backend
 */

import { apiClient, API_BASE_URL } from './api';

export interface NetworkDiagnostic {
  step: string;
  success: boolean;
  error?: string;
  details?: any;
}

export class NetworkDiagnostics {
  /**
   * Run comprehensive network diagnostics
   */
  static async runDiagnostics(): Promise<NetworkDiagnostic[]> {
    const results: NetworkDiagnostic[] = [];

    // Test 1: Check API URL
    results.push({
      step: 'API URL Check',
      success: true,
      details: { url: API_BASE_URL }
    });

    // Test 2: Basic GET request to root
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const responseText = await response.text();
      const isNextJs = responseText.includes('Next.js') || responseText.includes('__NEXT_DATA__');
      
      results.push({
        step: 'Basic Server Connection',
        success: response.ok,
        details: { 
          status: response.status, 
          statusText: response.statusText,
          url: API_BASE_URL,
          isNextJs: isNextJs,
          note: isNextJs ? 'Next.js app detected' : 'Not a Next.js app or not running in dev mode'
        }
      });
    } catch (error: any) {
      results.push({
        step: 'Basic Server Connection',
        success: false,
        error: error.message,
        details: { url: API_BASE_URL }
      });
    }

    // Test 3: Test API test status endpoint (this is what the app actually uses)
    try {
      const response = await apiClient.get('/api/test/status');
      results.push({
        step: 'Test Status Endpoint Check',
        success: true,
        details: { 
          status: response.status,
          data: response.data,
          note: 'Endpoint working correctly'
        }
      });
    } catch (error: any) {
      const expectedAuthError = error.response?.status === 401;
      const endpointExists = error.response?.status !== 404;
      results.push({
        step: 'Test Status Endpoint Check',
        success: expectedAuthError, // 401 means endpoint exists but needs auth
        error: error.message,
        details: {
          status: error.response?.status,
          note: expectedAuthError ? 'Endpoint available (auth required)' : endpointExists ? 'Endpoint exists but has issues' : 'Endpoint not found'
        }
      });
    }

    // Test 4: Test auth endpoint
    try {
      const response = await apiClient.get('/api/auth/me');
      results.push({
        step: 'Auth Endpoint Check',
        success: true,
        details: { 
          status: response.status,
          data: response.data,
          note: 'Auth endpoint working correctly'
        }
      });
    } catch (error: any) {
      const expectedAuthError = error.response?.status === 401;
      results.push({
        step: 'Auth Endpoint Check',
        success: expectedAuthError, // 401 means endpoint exists but needs auth
        error: error.message,
        details: {
          status: error.response?.status,
          note: expectedAuthError ? 'Endpoint available (auth required)' : 'Endpoint issue'
        }
      });
    }

    // Test 5: Test the actual test start endpoint
    try {
      const response = await apiClient.post('/api/test/start', {}, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      results.push({
        step: 'Test Start Endpoint Check',
        success: true,
        details: { 
          status: response.status,
          data: response.data,
          note: 'Test start endpoint working correctly'
        }
      });
    } catch (error: any) {
      const expectedAuthError = error.response?.status === 401;
      const endpointExists = error.response?.status !== 404;
      results.push({
        step: 'Test Start Endpoint Check',
        success: expectedAuthError, // 401 means endpoint exists but needs auth
        error: error.message,
        details: {
          status: error.response?.status,
          note: expectedAuthError ? 'Endpoint available (auth required)' : endpointExists ? 'Endpoint exists but has issues' : 'Endpoint not found'
        }
      });
    }

    return results;
  }

  /**
   * Simple ping test to check basic connectivity
   */
  static async pingServer(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(API_BASE_URL, {
        method: 'HEAD',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.error('Server ping failed:', error);
      return false;
    }
  }

  /**
   * Format diagnostics for display
   */
  static formatDiagnostics(results: NetworkDiagnostic[]): string {
    return results.map(result => {
      const status = result.success ? '✅' : '❌';
      const error = result.error ? ` - ${result.error}` : '';
      return `${status} ${result.step}${error}`;
    }).join('\n');
  }
}

export default NetworkDiagnostics;