import getAPIUrl from '@/utils/getAPIUrl';
import axios from 'axios';

export async function checkAuth() {
  try {
    const { data } = await axios.get(`${getAPIUrl()}/api/auth/user`, { withCredentials: true });

    return { user: data, status: 'authenticated' };
  } catch (error) {
    return { user: null, status: 'unauthenticated' };
  }
}
