import { NextRequest } from 'next/server';
import { initFirebaseAdminApp } from '@/firebase-admin';
import { apps, auth } from 'firebase-admin';

export async function isAuthorized(req: NextRequest): Promise<void> {
  const authHeader = req.headers.get('Authorization') || '';
  const token = authHeader.replace(/Bearer\s*/, '');

  if (!token) {
    throw new Error();
  }

  if (!apps.length) {
    initFirebaseAdminApp();
  }

  await auth().verifyIdToken(token);
}
