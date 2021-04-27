import Page from '../components/Page'

export default function SSR() {
  return <Page title="Index Page" linkTo="/other" />
}

export const getServerSideProps = () => {
  return { props: { checked: true } }
}
