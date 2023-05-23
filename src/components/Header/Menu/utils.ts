interface Config {
  path: '/about' | '/albums' | '/categories' | '/faq' | '/contacts';
  text: string;
}

export const menuConfig: Config[] = [
  {
    path: '/albums',
    text: 'albums',
  },
  {
    path: '/categories',
    text: 'categories',
  },
  {
    path: '/about',
    text: 'About me',
  },
  {
    path: '/faq',
    text: 'FAQ',
  },
  {
    path: '/contacts',
    text: 'Contacts',
  },
];
