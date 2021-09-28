import '../styles/globals.css';

import { Layout } from '@components/layout';
import { AppProps } from 'next/app';
import React from 'react';

import { AuthStore, StoreProvider } from '../utils/store';

// import { enableStaticRendering } from 'mobx-react-lite';
// eslint-disable-next-line react-hooks/rules-of-hooks
// enableStaticRendering(false);

const store = new AuthStore();

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <StoreProvider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
};

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   let logged = false;
//   let checked = false;
//   if (!isServer) {
//     logged = await userIsLogged();
//     checked = true;
//   }
//   console.log('cookie', appContext.ctx.req?.headers.cookie);
//   const appProps = await App.getInitialProps(appContext);
//   const props: Init = { isLogged: logged, isChecked: checked, ...appProps };
//   console.log('getInitialProps isLogged', logged);
//   console.log('getInitialProps is_server', typeof window === 'undefined');
//   return { ...props };
// };

export default MyApp;
