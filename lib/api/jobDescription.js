import { client } from './client';

export const jobDescriptionApi = {
  create: async (payload) => {
    const response = await client.post('/job-descriptions', payload);
    return response.data;
  },
  uploadFile: async (formData) => {
    const response = await client.post('/job-descriptions/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  getAll: async () => {
    const response = await client.get('/job-descriptions');
    return response.data;
  },
  update: async (jdId, payload) => {
    const response = await client.put(`/job-descriptions/${jdId}`, payload);
    return response.data;
  },
  getFile: async (fileKey) => {
    const response = await client.get(`/job-descriptions/file/${fileKey}`);
    return response.data;
  },
};
