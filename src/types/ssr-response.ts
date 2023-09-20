export enum SsrErrors {
  NotFound = 404,
  Internal = 500,
}

export type SsrResponse<T> = T | SsrErrors;

export function ssrResponseHasError(res: SsrResponse<object>): res is SsrErrors {
  return res === SsrErrors.NotFound || res === SsrErrors.Internal;
}
