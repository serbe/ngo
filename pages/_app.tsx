import '../styles/globals.css'
import { AppProps } from 'next/app'
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { userIsChecked } from '../utils/auth'
import { useEffect } from 'react'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter()
  console.log('checked', pageProps.checked)
  useEffect(() => {
    if (pageProps.checked && pageProps.checked === false) {
      console.log('redirect to login')
      router.push('/login')
    }
  }, [pageProps.checked])
  return <Component {...pageProps} />
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
