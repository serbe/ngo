import '../styles/globals.css';

import { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect } from 'react';

import { userIsChecked } from '../utils/auth';

// import { Provider } from 'mobx-react'

// import { fetchInitialStoreState, DataStore } from '../utils/state'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter()
  console.log('pageProps.checked', pageProps.checked)
  useEffect(() => {
    console.log('useEffect, pageProps.checked', pageProps.checked)
    if (pageProps.checked !== undefined && pageProps.checked === false) {
      console.log('redirect to login')
      router.push('/login')
    }
  }, [pageProps.checked, router])
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const cookies = nookies.get(appContext.ctx)
  const checked = await userIsChecked(cookies)
  console.log('userIsChecked', checked)
  return {
    pageProps: {
      checked: checked,
    }, // will be passed to the page component as props
  }
}

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

export default MyApp

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
