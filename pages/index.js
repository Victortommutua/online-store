import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home({title}) {
  return (
    <div>
      <Head>
        <title>{title ? title + 'Online | Store' : 'Online | Store'}</title>
        <meta name="description" content="Your Favorite online shopping store" />
        <link rel="icon" href="/logo.svg"/>
      </Head>
      <Layout/>
    </div>
  )
}
