export default function getAPIUrl() {
  const url = import.meta.env.VITE_BASE_API;
  if (url) return url;

  throw new Error('VUE_APP_API_BASE need to be configure in your .env app');
}
