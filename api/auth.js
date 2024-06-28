// lib/api.js
import { fetchAPI } from './base';

export const RegisterUser = async ({ email, password }) => {
  try {
    const res = await fetchAPI('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return res;
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};

export const LoginUser = async ({ email, password }) => {
  try {
    const res = await fetchAPI('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return res;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};
