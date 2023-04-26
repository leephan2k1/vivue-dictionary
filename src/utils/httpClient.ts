import axios from 'axios';
import getAPIUrl from './getAPIUrl';

export const axiosClient = axios.create({
  baseURL: `${getAPIUrl()}/api`,
  timeout: 30000
});
