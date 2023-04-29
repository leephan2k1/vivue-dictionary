//@ts-nocheck
import { useSession } from '@/stores/userSession';
import { checkAuth } from '@/utils/checkAuth';
import type { SessionStatus } from '@/types/app';

export async function handlePrivateRoute(to, from, next) {
  const session = useSession();

  if (session.status === 'authenticated') {
    next();
  } else {
    const { status, user } = await checkAuth();

    if (!user && status === 'unauthenticated') {
      session.status = 'unauthenticated';
      next({ name: 'login' });
      return;
    }
    session.status = status as SessionStatus;
    session.user = user;
    next();
  }
}
