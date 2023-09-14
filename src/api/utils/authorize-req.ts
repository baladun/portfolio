import { getAuth } from 'firebase/auth';
import { firebaseClientApp } from '@/firebase-client';

const auth = getAuth(firebaseClientApp);

export async function authorizeReq(reqInit: RequestInit): Promise<RequestInit> {
  const headers = reqInit.headers || {};
  const tokenResult = await auth.currentUser?.getIdTokenResult();

  return {
    ...reqInit,
    headers: {
      ...headers,
      Authorization: tokenResult ? `Bearer ${tokenResult.token}` : '',
    },
  };
}
