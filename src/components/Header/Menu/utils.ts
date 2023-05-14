interface Config {
  path: '/about' | '/categories' | '/faq' | '/contacts';
  text: string;
}

export const menuConfig: Config[] = [
  {
    path: '/about',
    text: 'About me',
  },
  {
    path: '/categories',
    text: 'categories',
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
