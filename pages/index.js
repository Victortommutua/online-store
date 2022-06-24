import Head from 'next/head'
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import data from '../utils/data'

export default function Home({title}) {
  return (
    <div>
      <Head>
        <title>{title ? title + 'Online | Store' : 'Online | Store'}</title>
        <meta name="description" content="Your Favorite online shopping store" />
        <link rel="icon" href="/logo.svg"/>
      </Head>
      <Layout>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {data.products.map((product)=> (
            <ProductItem product={product} key={product.slug}/>
          ))}
        </div>
      </Layout>
    </div>
  );
}
