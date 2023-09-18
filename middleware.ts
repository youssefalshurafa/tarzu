import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { getUser } from './lib/actions/user.action';
import { redirect } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ['/'],
  ignoredRoutes: [
    '/api/admin/category/create-category',
    '/api/user/get-user',
    '/api/user/get-users',
    '/api/user/update-user',
    '/api/user/create-user',
    '/api/admin/banner/get-banner',
    '/api/admin/category/get-category',
    '/api/admin/category/delete-category',
    '/api/admin/category/update-category',
    '/api/admin/banner/update-banner',
    '/api/admin/products/get-all-products',
  ],
  async afterAuth(req, user, context) {
    let userId = req.userId;
    const currentUrl = user.url;
    if (!userId) {
      if (currentUrl.includes('/admin')) {
        return NextResponse.redirect('http://localhost:3000/');
      }
    } else {
      const response = await getUser(userId);

      const userRoles = response.data.roles;

      if (currentUrl.includes('/admin') && !userRoles.Admin) {
        return NextResponse.redirect('http://localhost:3000/');
      }
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
