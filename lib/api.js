import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const authApi = {
  signup: async (data) => {
    const { role, ...payload } = data;
    const endpoint = role === 'employer' ? '/auth/signup/employer' : '/auth/signup/candidate';
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

const jobApi = {
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

const applicationApi = {
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

const candidateApi = {
  // ── Profile ──────────────────────────────────────────────────────
  getProfile: async () => {
    const response = await client.get('/candidate/profile');
    return response.data;
  },
  getFullProfile: async () => {
    const response = await client.get('/candidate/full-profile');
    return response.data;
  },
  updateProfile: async (payload) => {
    const response = await client.put('/candidate/profile', payload);
    return response.data;
  },
  uploadProfilePicture: async (formData) => {
    const response = await client.post('/candidate/profile-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  getCandidateById: async (candidateId) => {
    const response = await client.get(`/candidate/candidate/${candidateId}`);
    return response.data;
  },

  // ── Education ────────────────────────────────────────────────────
  getEducation: async () => {
    const response = await client.get('/candidate/education');
    return response.data;
  },
  addEducation: async (data) => {
    const response = await client.post('/candidate/education', data);
    return response.data;
  },
  updateEducation: async (id, data) => {
    const response = await client.put(`/candidate/education/${id}`, data);
    return response.data;
  },
  deleteEducation: async (id) => {
    await client.delete(`/candidate/education/${id}`);
  },

  // ── Experience ───────────────────────────────────────────────────
  getExperience: async () => {
    const response = await client.get('/candidate/experience');
    return response.data;
  },
  addExperience: async (data) => {
    const response = await client.post('/candidate/experience', data);
    return response.data;
  },
  updateExperience: async (id, data) => {
    const response = await client.put(`/candidate/experience/${id}`, data);
    return response.data;
  },
  deleteExperience: async (id) => {
    await client.delete(`/candidate/experience/${id}`);
  },

  // ── Skills ───────────────────────────────────────────────────────
  getSkills: async () => {
    const response = await client.get('/candidate/skills');
    return response.data;
  },
  updateSkills: async (skills) => {
    const response = await client.put('/candidate/skills', skills);
    return response.data;
  },

  // ── Projects ─────────────────────────────────────────────────────
  getProjects: async () => {
    const response = await client.get('/candidate/projects');
    return response.data;
  },
  addProject: async (data) => {
    const response = await client.post('/candidate/projects', data);
    return response.data;
  },
  updateProject: async (id, data) => {
    const response = await client.put(`/candidate/projects/${id}`, data);
    return response.data;
  },
  deleteProject: async (id) => {
    await client.delete(`/candidate/projects/${id}`);
  },

  // ── Resume ───────────────────────────────────────────────────────
  uploadResume: async (formData) => {
    const response = await client.post('/candidate/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  listResumes: async () => {
    const response = await client.get('/candidate/resume/list');
    return response.data;
  },
  deleteResume: async (resumeId) => {
    await client.delete(`/candidate/resume/${resumeId}`);
  },
};

const resumeApi = {
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

const skillsApi = {
  getSkills: async () => {
    const response = await client.get('/skills');
    return response.data;
  },
};

const jobDescriptionApi = {
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

const jobShareApi = {
  shareJob: async (jobId, payload) => {
    const response = await client.post(`/job-share/${jobId}/share`, payload);
    return response.data;
  },
  getSharedWithMe: async () => {
    const response = await client.get('/job-share/shared-with-me');
    return response.data;
  },
};

const notificationApi = {
  getNotifications: async () => {
    const response = await client.get('/notifications/');
    return response.data;
  },
  markRead: async (notificationId) => {
    const response = await client.put(`/notifications/${notificationId}/read`);
    return response.data;
  },
};

const interviewApi = {
  schedule: async (payload) => {
    const response = await client.post('/interviews/schedule', payload);
    return response.data;
  },
  reschedule: async (applicationId, payload) => {
    const response = await client.put(`/interviews/reschedule/${applicationId}`, payload);
    return response.data;
  },
  cancel: async (applicationId) => {
    const response = await client.put(`/interviews/cancel/${applicationId}`);
    return response.data;
  },
  cancelByCandidate: async (applicationId) => {
    const response = await client.put(`/interviews/cancel-by-candidate/${applicationId}`);
    return response.data;
  },
  createSlot: async (interviewId, payload) => {
    const response = await client.post(`/interviews/slots/${interviewId}`, payload);
    return response.data;
  },
  getSlots: async (applicationId) => {
    const response = await client.get(`/interviews/slots/${applicationId}`);
    return response.data;
  },
  selectSlot: async (slotId) => {
    const response = await client.put(`/interviews/slots/select/${slotId}`);
    return response.data;
  },
};

const interviewerApi = {
  getInterviewers: async () => {
    const response = await client.get('/interviewers/');
    return response.data;
  },
  getInterviewer: async (id) => {
    const response = await client.get(`/interviewers/${id}`);
    return response.data;
  },
  createInterviewer: async (payload) => {
    const response = await client.post('/interviewers/', payload);
    return response.data;
  },
};

const adminApi = {
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

const jobApplicationFormsApi = {
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

const api = {
  client,
  authApi,
  jobApi,
  applicationApi,
  candidateApi,
  resumeApi,
  skillsApi,
  jobDescriptionApi,
  jobShareApi,
  notificationApi,
  interviewApi,
  interviewerApi,
  adminApi,
  jobApplicationFormsApi,
};

export {
  authApi,
  jobApi,
  applicationApi,
  candidateApi,
  resumeApi,
  skillsApi,
  jobDescriptionApi,
  jobShareApi,
  notificationApi,
  interviewApi,
  interviewerApi,
  adminApi,
  jobApplicationFormsApi,
};

export default api;
