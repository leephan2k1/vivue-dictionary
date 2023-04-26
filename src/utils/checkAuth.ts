import { axiosClient } from './httpClient';

export async function checkAuth() {
  try {
    const { data } = await axiosClient.get(`/auth/user`, { withCredentials: true });

    return { user: data, status: 'authenticated' };
  } catch (error) {
    return { user: null, status: 'unauthenticated' };
  }
}
