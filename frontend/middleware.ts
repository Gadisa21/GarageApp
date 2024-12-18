export { auth as middleware } from "./auth";

// Apply to all routes except public pages (login, register, public pages, and root route)
export const config = {
  matcher: [
    "/((?!login|register|public|contact-us|about-us|services|/).*)", // Excludes the specified public pages and root route
  ],
};
