import { useStore } from '@utils/store';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

import { Footer } from './footer';
import { Header } from './header';

interface LayoutProperties {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProperties): JSX.Element => {
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    console.log('layout useEffect', store.isChecking, store.getLogin, router.asPath);
    if (store.isChecking && !store.getLogin && router.asPath !== '/login') {
      router.push('/login');
    }
  }, [router, store.isChecking, store.getLogin]);

  const NavBar = () => (router.asPath !== '/login' ? <Header /> : <></>);

  return (
    <div className="App min-h-full font-custom">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      <Footer />
    </div>
  );
};
