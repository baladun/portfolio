export function buildUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_HOST}/api${path}`;
}
