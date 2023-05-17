import { cleanEnv, email, host, port, str, url } from 'envalid';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    cleanEnv(process.env, {
      DB_TYPE: str(),
      DB_USER: str(),
      DB_PASSWORD: str(),
      DB_HOST: host(),
      DB_PORT: port(),
      DB_NAME: str(),
      DB_URL: url(),
      DB_PRISMA_URL: url(),
      DB_URL_NON_POOLING: url(),

      GCP_PROJECT_ID: str(),
      GCP_CLIENT_EMAIL: email(),
      GCP_PRIVATE_KEY: str(),
      GCP_BUCKET_NAME: str(),
    });
  }
}
