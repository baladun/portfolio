import 'server-only';
import { Bucket, Storage } from '@google-cloud/storage';

const globalForBucket = global as unknown as {
  bucket: Bucket | undefined;
};

export const bucket =
  globalForBucket.bucket ??
  new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY,
    },
  }).bucket(process.env.GCP_BUCKET_NAME as string);

if (process.env.NODE_ENV !== 'production') globalForBucket.bucket = bucket;
