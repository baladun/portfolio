import { cleanEnv, email, host, str, url } from 'envalid';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    cleanEnv(process.env, {
      DB_URL: url(),
      DB_PRISMA_URL: url(),
      DB_URL_NON_POOLING: url(),

      GCP_PROJECT_ID: str(),
      GCP_CLIENT_EMAIL: email(),
      GCP_PRIVATE_KEY: str(),
      NEXT_PUBLIC_GCP_BUCKET_NAME: str(),

      NEXT_PUBLIC_VERCEL_URL: url(),

      NEXT_PUBLIC_FIREBASE_API_KEY: str(),
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: host(),
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: str(),
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: host(),
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: str(),
      NEXT_PUBLIC_FIREBASE_APP_ID: str(),

      FIREBASE_ADMIN_PRIVATE_KEY: str(),
      FIREBASE_ADMIN_CLIENT_EMAIL: email(),
    });
  }
}
