import { client } from './client';

export const adminApi = {
  getApplicationsPerJob: async () => {
    const response = await client.get('/admin/applications-per-job');
    return response.data;
  },
  getRecruiterApplicationsPerJob: async () => {
    const response = await client.get('/admin/recruiter/applications-per-job');
    return response.data;
  },
  getApplicationStatusSummary: async () => {
    const response = await client.get('/admin/application-status-summary');
    return response.data;
  },
  getUpcomingInterviews: async () => {
    const response = await client.get('/admin/upcoming-interviews');
    return response.data;
  },
  getRecentResumes: async () => {
    const response = await client.get('/admin/recent-resumes');
    return response.data;
  },
  getCandidatesNeedingAction: async () => {
    const response = await client.get('/admin/candidates-needing-action');
    return response.data;
  },
  getJobPerformance: async () => {
    const response = await client.get('/admin/job-performance');
    return response.data;
  },
  assignApplications: async (payload) => {
    const response = await client.post('/admin/assign-applications', payload);
    return response.data;
  },
  autoAssign: async (jobId) => {
    const response = await client.post(`/admin/auto-assign/${jobId}`);
    return response.data;
  },
  getRecruiters: async () => {
    const response = await client.get('/admin/recruiters');
    return response.data;
  },
  assignApplication: async (applicationId, payload) => {
    const response = await client.put(`/admin/assign-application/${applicationId}`, payload);
    return response.data;
  },
};
