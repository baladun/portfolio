export function buildUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_VERCEL_URL}/api${path}`;
}
