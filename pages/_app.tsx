import '../styles/globals.css';

import { enableStaticRendering } from 'mobx-react-lite';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect } from 'react';

import { userIsLogged } from '../utils/auth';
import { AuthStore, StoreProvider } from '../utils/store';

// import { Provider } from 'next-auth/client';

type Props = {
  isLogged: boolean;
} & AppProps;

type Init = {
  isLogged: boolean;
} & AppInitialProps;

const isServer = typeof window === 'undefined';
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(isServer);

const store = new AuthStore();

// import { Provider } from 'mobx-react'

// import { fetchInitialStoreState, DataStore } from '../utils/state'

const MyApp = ({ Component, pageProps, isLogged }: Props): JSX.Element => {
  const router = useRouter();
  // const { initialData } = pageProps
  // console.log('store', store);
  console.log('MyApp isLogged', isLogged);
  useEffect(() => {
    console.log('useEffect, isLogged', isLogged);
    console.log('useEffect, router.asPath', router.asPath);
    // if (store.check !== undefined && store.check === false) {
    if (!isLogged && router.asPath !== '/login') {
      console.log('redirect to login');
      router.push('/login')
    }
  }, [isLogged, router]);
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const cookies = nookies.get(appContext.ctx);
  const logged = await userIsLogged(cookies);
  const appProps = await App.getInitialProps(appContext);
  const props: Init = { isLogged: logged, ...appProps };
  console.log('getInitialProps isLogged', logged);
  return { ...props };
};

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const cookies = nookies.get(appContext.ctx)
//   const checked = await userIsChecked(cookies)
//   console.log('userIsChecked', checked)
//   return {
//     pageProps: {
//       checked: checked,
//     }, // will be passed to the page component as props
//   }
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ...

// }

// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   console.log('getServerSideProps')
//   const checked = await userIsChecked(ctx)
//   console.log('userIsChecked', checked)
//   return {
//     props: {
//       checked: checked,
//     }, // will be passed to the page component as props
//   }
// }

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   console.log('getStaticProps')
//   return {
//     props: {
//       checked: true,
//     }, // will be passed to the page component as props
//   }
// }

export default MyApp;

// import App from 'next/app'
// import React from 'react'
// import { Provider } from 'mobx-react'
// import { fetchInitialStoreState, DataStore } from '../stores/DataStore'

// class MyApp extends App {
//   state = {
//     dataStore: new DataStore(),
//   }

//   // Fetching serialized(JSON) store state
//   static async getInitialProps(appContext) {
//     const appProps = await App.getInitialProps(appContext)
//     const initialStoreState = await fetchInitialStoreState()

//     return {
//       ...appProps,
//       initialStoreState,
//     }
//   }

//   // Hydrate serialized state to store
//   static getDerivedStateFromProps(props, state) {
//     state.dataStore.hydrate(props.initialStoreState)
//     return state
//   }

//   render() {
//     const { Component, pageProps } = this.props
//     return (
//       <Provider dataStore={this.state.dataStore}>
//         <Component {...pageProps} />
//       </Provider>
//     )
//   }
// }
// export default MyApp
