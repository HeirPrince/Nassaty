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
  config.bluesky && {
    label: 'Bluesky',
    url: `https://bsky.app/profile/${config.bluesky}`,
    icon: 'bluesky',
  },
  config.tiktok && {
    label: 'TikTok',
    url: `https://www.tiktok.com/@${config.tiktok}`,
    icon: 'tiktok',
  },
  config.github && {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
].filter(Boolean);
