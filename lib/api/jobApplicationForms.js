import { client } from './client';

export const jobApplicationFormsApi = {
  createForm: async (payload) => {
    const response = await client.post('/job-application-forms', payload);
    return response.data;
  },
  getForms: async () => {
    const response = await client.get('/job-application-forms');
    return response.data;
  },
  submitAnswers: async (applicationId, payload) => {
    const response = await client.post(`/job-application-forms/applications/${applicationId}/answers`, payload);
    return response.data;
  },
};
