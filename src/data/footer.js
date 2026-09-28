// Footer content and settings
// Import navigation from site.js to avoid duplication
import { site } from './site';

export const footer = {
  owner: "Iswar Chandra Rana",
  blurb:
    "Software Engineer II building Java and Spring Boot backends, designing systems from HLD to LLD, and shipping AI-assisted tooling.",
  // Use navigation items from site.js instead of duplicating
  quickLinks: site.navItems,
};
