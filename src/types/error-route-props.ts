export interface ErrorRouteProps {
  error: Error & { digest?: string };
  reset: () => void;
}
