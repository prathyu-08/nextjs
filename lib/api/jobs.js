import { client } from './client';

export const jobApi = {
  getJobs: async () => {
    const response = await client.get('/jobs/');
    return response.data;
  },
  getJobById: async (jobId) => {
    const response = await client.get(`/jobs/${jobId}`);
    return response.data;
  },
  getMyJobs: async () => {
    const response = await client.get('/jobs/my');
    return response.data;
  },
  createJob: async (jobData) => {
    const response = await client.post('/jobs/', jobData);
    return response.data;
  },
  updateJob: async (jobId, jobData) => {
    const response = await client.put(`/jobs/${jobId}`, jobData);
    return response.data;
  },
  deleteJob: async (jobId) => {
    await client.delete(`/jobs/${jobId}`);
  },
};
