import { client } from './client';

export const applicationApi = {
  applyForJob: async (formData) => {
    const response = await client.post('/applications/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  getMyApplications: async () => {
    const response = await client.get('/applications/my');
    return response.data;
  },
  getApplicationsByJob: async (jobId) => {
    const response = await client.get(`/applications/job/${jobId}`);
    return response.data;
  },
  updateStatus: async (applicationId, statusData) => {
    const response = await client.put(`/applications/${applicationId}/status`, statusData);
    return response.data;
  },
  reassignApplication: async (applicationId, payload) => {
    const response = await client.put(`/applications/${applicationId}/reassign`, payload);
    return response.data;
  },
  getAssignedApplications: async () => {
    const response = await client.get('/applications/assigned');
    return response.data;
  },
  addCandidateNotes: async (applicationId, notesData) => {
    const response = await client.put(`/applications/${applicationId}/candidate-notes`, notesData);
    return response.data;
  },
  deletePermanent: async (jobId) => {
    await client.delete(`/applications/${jobId}/permanent`);
  },
};
