// import Page from '../components/Page'

export default function SSR() {
  // return <Page title="Index Page" linkTo="/other" />
  return <div />
}

export const getServerSideProps = () => {
  return { props: { checked: true } }
}
