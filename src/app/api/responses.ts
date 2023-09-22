import { NextResponse } from 'next/server';
import { Exception } from '@/api-client';
import { exceptionMsg } from './exception-msg';

export const okRes = <T>(body: T) => NextResponse.json(body);
export const createdRes = <T>(body: T) => NextResponse.json(body, { status: 201 });

export const commonErrorRes = (err: any) => NextResponse.json(new Exception(err?.message || exceptionMsg.NOT_EXECUTE), { status: 400 });
export const notFoundErrorRes = () => NextResponse.json(new Exception(exceptionMsg.NOT_FOUND), { status: 404 });
export const incorrectParamsErrorRes = () => NextResponse.json(new Exception(exceptionMsg.INCORRECT_PARAMS), { status: 400 });
export const incorrectPayloadErrorRes = () => NextResponse.json(new Exception(exceptionMsg.INCORRECT_PAYLOAD), { status: 400 });
export const noPayloadErrorRes = () => NextResponse.json(exceptionMsg.NO_PAYLOAD, { status: 400 });
export const unauthorizedRes = () => NextResponse.json(exceptionMsg.UNAUTHORIZED, { status: 401 });
