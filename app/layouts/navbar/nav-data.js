import config from '~/config.json';

export const navLinks = [
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Details',
    pathname: '/#details',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'Bluesky',
    url: `https://bsky.app/profile/${config.bluesky}`,
    icon: 'bluesky',
  },
  {
    label: 'TikTok',
    url: `https://www.tiktok.com/@${config.tiktok}`,
    icon: 'tiktok',
  },
  {
    label: 'Github',
    url: config.github ? `https://github.com/${config.github}` : 'https://github.com',
    icon: 'github',
  },
];
