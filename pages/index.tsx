import React from 'react'

import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import { Footer } from '../components/footer'
import { Header } from '../components/header'

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
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Home
