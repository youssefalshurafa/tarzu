import { authMiddleware } from '@clerk/nextjs';

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
  ],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
