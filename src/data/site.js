// Centralized site-level content: name/branding, navigation items, and resume URL.
// Consumers: Header (brand name, nav), Footer (optional), others.

export const site = {
  name: "Iswar Ch. Rana",
  // Navigation items rendered in Header (desktop + mobile) and optionally Footer
  navItems: [
    { label: "About", sectionId: "about" },
    { label: "Experience", sectionId: "experience" },
    { label: "Projects", sectionId: "projects" },
    { label: "Skills", sectionId: "skills" },
    { label: "Education", sectionId: "education" },
    // { label: "Certifications", sectionId: "certifications" },
    { label: "Contact", sectionId: "contact" },
  ],
  resumeUrl: "https://drive.google.com/file/d/1YTaijfEcPMG2ob5wOAdAhQjYMdj_JS-0/view?usp=sharing",
  resumeLabel: "Resume",
};
