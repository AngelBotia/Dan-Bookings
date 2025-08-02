export { default } from "next-auth/middleware"
import { NextResponse } from 'next/server';
import { LANG_LS } from "./app/(GUI)/application/application.constant";

export const config = { matcher: ['/((?!api|_next|favicon.ico).*)',"/booking"] }

export function middleware(request) {
  const lang = request.cookies.get(LANG_LS)?.value || DEFAULT_LNG_APP;
  const response = NextResponse.next();
  response.cookies.set(LANG_LS, lang, { path: '/' });
  return response;
}