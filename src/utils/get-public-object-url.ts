export function getPublicObjectUrl(name: string): string {
  return `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_GCP_BUCKET_NAME}/${name}`;
}
