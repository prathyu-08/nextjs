import { client } from './client';

export const resumeApi = {
  upload: async (formData) => {
    const response = await client.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  getMyResumes: async () => {
    const response = await client.get('/resume/my-resumes');
    return response.data;
  },
  getAccess: async (resumeId) => {
    const response = await client.get(`/resume/access/${resumeId}`);
    return response.data;
  },
  rename: async (resumeId, payload) => {
    const response = await client.patch(`/resume/rename/${resumeId}`, payload);
    return response.data;
  },
  updateTags: async (resumeId, payload) => {
    const response = await client.patch(`/resume/tags/${resumeId}`, payload);
    return response.data;
  },
  setPrimary: async (resumeId) => {
    const response = await client.post(`/resume/set-primary/${resumeId}`);
    return response.data;
  },
  deleteResume: async (resumeId) => {
    await client.delete(`/resume/delete/${resumeId}`);
  },
};
