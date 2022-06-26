import Head from 'next/head'
import { useContext } from 'react';
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import axios from 'axios';
//import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
export default function Home({title, products}) {
  const {state, dispatch}= useContext(Store);
  const {cart} = state;
  const AddToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x)=> x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock < quantity){
        toast.error('sorry product out of stock');
        return;
    }
    dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity}})

    toast.success('Product added to the cart');
}
  return (
    <div>
      <Head>
        <title>{title ? title + 'Online | Store' : 'Online | Store'}</title>
        <meta name="description" content="Your Favorite online shopping store" />
        <link rel="icon" href="/logo.svg"/>
      </Head>
      <Layout>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {products.map((product)=> (
            <ProductItem 
            product={product} 
            key={product.slug}
            AddToCartHandler= {AddToCartHandler}
            >
            </ProductItem>
          ))}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(){
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
