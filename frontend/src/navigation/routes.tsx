import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { AdminPage } from '@/pages/AdminPage/AdminPage';
import { RegistrationPage } from '@/pages/RegistartionPage/RegistrationPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: IndexPage },
  { path: '/admin-page', Component: AdminPage, title: 'Админка' },
  { path: '/registration-page', Component: RegistrationPage, title: 'Регистрация' },
];
