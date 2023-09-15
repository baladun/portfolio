export function buildUrl(path: string): string {
  console.log(process.env.NEXT_PUBLIC_HOST, process.env.NEXT_PUBLIC_GCP_BUCKET_NAME, '!!!!!!!!!!!!!!!!!!!!!!');
  return `${process.env.NEXT_PUBLIC_HOST}/api${path}`;
}
