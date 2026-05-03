// Footer content and settings
// Import navigation from site.js to avoid duplication
import { site } from './site';

export const footer = {
  owner: "Iswar Chandra Rana",
  blurb:
    "Software Engineer working across Spring Boot and Node.js microservices, database optimization, AI-assisted engineering, and reliable CI/CD delivery.",
  // Use navigation items from site.js instead of duplicating
  quickLinks: site.navItems,
};