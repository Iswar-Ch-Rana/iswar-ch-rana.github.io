// only certificates issued to Iswar, as listed on LinkedIn. The CCNA badge was
// checked on Credly (issued to Iswar Chandra Rana, 2023-07-01); the Anthropic
// courses have no public link or confirmed date yet, so they have no period.
const LINKEDIN_CERTS = 'https://www.linkedin.com/in/iswar-ch-rana/details/certifications/';
const ANTHROPIC = { image: 'https://cdn.simpleicons.org/anthropic/white', icon: true, tint: '#d97757' };

export const certificationsMeta = {
  heading: 'Certifications',
  subtitle: 'Completed courses and credentials.',
};

export const certifications = [
  {
    name: 'Model Context Protocol: Advanced Topics',
    issuer: 'Anthropic',
    link: LINKEDIN_CERTS,
    ...ANTHROPIC,
  },
  {
    name: 'Introduction to Agent Skills',
    issuer: 'Anthropic',
    link: LINKEDIN_CERTS,
    ...ANTHROPIC,
  },
  {
    name: 'CCNA: Introduction to Networks',
    issuer: 'Cisco',
    period: 'Jul 2023',
    link: 'https://www.credly.com/badges/8c5e3751-5144-4677-9d3c-752c5967fbd9/public_url',
    image: 'https://cdn.simpleicons.org/cisco/white',
    icon: true,
    tint: '#049fd9',
  },
];
