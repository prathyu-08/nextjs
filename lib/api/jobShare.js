import { client } from './client';

export const jobShareApi = {
  shareJob: async (jobId, payload) => {
    const response = await client.post(`/job-share/${jobId}/share`, payload);
    return response.data;
  },
  getSharedWithMe: async () => {
    const response = await client.get('/job-share/shared-with-me');
    return response.data;
  },
};
