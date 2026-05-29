import { client } from './client';

export const candidateApi = {
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

  getSkills: async () => {
    const response = await client.get('/candidate/skills');
    return response.data;
  },
  updateSkills: async (skills) => {
    const response = await client.put('/candidate/skills', skills);
    return response.data;
  },

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
