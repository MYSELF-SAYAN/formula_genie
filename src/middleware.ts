import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoot = createRouteMatcher(['/dashboard(.*)', '/history(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoot(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
