import { cert, initializeApp } from 'firebase-admin/app';

const firebaseAdminConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
};
const certificate = cert({
  projectId: firebaseAdminConfig.projectId,
  clientEmail: firebaseAdminConfig.clientEmail,
  privateKey: firebaseAdminConfig.privateKey,
});

export function initFirebaseAdminApp() {
  initializeApp({
    credential: certificate,
    projectId: firebaseAdminConfig.projectId,
    storageBucket: firebaseAdminConfig.storageBucket,
  });
}
