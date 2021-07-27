import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { parseCookies } from 'nookies';
import React from 'react';

import { Footer } from '../components/footer';
import { Header } from '../components/header';

// import { Nav } from '../components/nav'

// import styles from '../styles/Home.module.css'

export const Home = (): JSX.Element => {
  return (
    <div className="App min-h-full font-custom">
      <Header />
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)
  console.log('cookies', cookies)
  const { PGADMIN_LANGUAGE } = cookies
  console.log('PGADMIN_LANGUAGE', PGADMIN_LANGUAGE)
  const session = await getSession(ctx)
  console.log('session', session)
  return {
    props: {
      session: session,
    },
  }
}

export default Home

// import Layout from '../components/Layout'
// import { inject } from 'mobx-react'
// import { observer } from 'mobx-react-lite'
// import { NextPage } from 'next'
// import { DataStore } from '../stores/DataStore'

// type Props = {
//   dataStore?: DataStore
// }

// const IndexPage: NextPage = inject('dataStore')(
//   observer((props: Props) => {
//     const dataStore = props.dataStore!

//     return (
//       <Layout title="Home | Next.js + TypeScript Example">
//         <h1>My first Medium article</h1>

//         <p>{dataStore.title} 👋</p>

//         <input
//           type="text"
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             dataStore.changeTitle(e.target.value)
//           }
//         />
//       </Layout>
//     )
//   })
// )
// export default IndexPage
