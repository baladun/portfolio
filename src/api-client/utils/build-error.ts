import { Exception } from '../models';

export function buildError(err: any): Error {
  return new Error((err as Exception)?.message || 'Error');
}
