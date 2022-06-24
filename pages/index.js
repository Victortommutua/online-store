import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Online | Store</title>
        <meta name="description" content="Your Favorite online shopping store" />
        <link rel="icon" href="/logo.svg"/>
      </Head>
      <Layout/>
    </div>
  )
}
