import { client } from './client';

export const notificationApi = {
  getNotifications: async () => {
    const response = await client.get('/notifications/');
    return response.data;
  },
  markRead: async (notificationId) => {
    const response = await client.put(`/notifications/${notificationId}/read`);
    return response.data;
  },
};
