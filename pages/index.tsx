import React from 'react'

import { Footer } from '../components/footer'
import { Header } from '../components/header'

// import { Nav } from '../components/nav'

// import styles from '../styles/Home.module.css'

export default function Home(): JSX.Element {
  return (
    <div className="App min-h-full font-custom">
      <Header />
      <Footer />
    </div>
  )
}
