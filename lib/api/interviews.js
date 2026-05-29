import { client } from './client';

export const interviewApi = {
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

export const interviewerApi = {
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
