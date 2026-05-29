import { client } from './client';

export const authApi = {
  signup: async (data) => {
    const { role, ...payload } = data;
    const endpoint = role === 'employer'
      ? '/auth/employer/register'
      : '/auth/candidate/register';
    const response = await client.post(endpoint, payload);
    return response.data;
  },
  confirmSignup: async (data) => {
    const response = await client.post('/auth/confirm-signup', data);
    return response.data;
  },
  resendConfirmation: async (data) => {
    const response = await client.post('/auth/resend-confirmation', data);
    return response.data;
  },
  login: async (data) => {
    const response = await client.post('/auth/login', data);
    return response.data;
  },
  completeLogin: async () => {
    const response = await client.post('/auth/complete-login');
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await client.post('/auth/forgot-password', { email });
    return response.data;
  },
  confirmResetPassword: async (payload) => {
    const response = await client.post('/auth/confirm-reset-password', payload);
    return response.data;
  },
};
