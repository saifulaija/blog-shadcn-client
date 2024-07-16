import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
type Role = keyof typeof roleBasedPrivateRoutes;
const AuthRoutes = ['/signin', '/signup'];
const commonPrivateRoutes = ['/dashboard', '/dashboard/change-password'];
const roleBasedPrivateRoutes = {
  ADMIN: [/^\/dashboard\/admin/],
  BLOGGER: [/^\/dashboard\/blogger/],
  MODERATOR: [/^\/dashboard\/moderator/],
  SUPER_ADMIN: [/^\/dashboard\/super_admin/],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get('accessToken')?.value;
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  let decodedData;
  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role = decodedData?.role;

  console.log(
    role,
    pathname,
    '=================================================',
  );

  //   if(role==='ADMIN' && pathname.startsWith('/dashboard/admin')){
  //     return NextResponse.next();
  //   }
  //   if(role==='DOCTOR' && pathname.startsWith('/dashboard/doctor')){
  //     return NextResponse.next();
  //   }

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/signin', '/signup', '/dashboard/:page*'],
};
