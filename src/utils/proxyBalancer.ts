/*
Because of glosbe dictionary tracking rate limit
So, i deploy multiple node server to "bypass" glosbe
It was inspired "Round-Robin Load Balancing"
Skip it if you can't deploy multiple node server ;)
*/
import getAPIUrl from './getAPIUrl';

const servers: string[] = import.meta.env.VITE_UP_STREAM_SERVERS
  ? JSON.parse(String(import.meta.env.VITE_UP_STREAM_SERVERS))
  : [];
const main_server = getAPIUrl();

let current = -1;

export default function roundRobinServer() {
  if (!servers || servers.length === 0) return `${main_server}/api`;

  current === servers.length - 1 ? (current = 0) : current++;
  return `${servers[current]}/api`;
}
