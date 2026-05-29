import { client } from './client';

export const skillsApi = {
  getSkills: async () => {
    const response = await client.get('/skills');
    return response.data;
  },
};
