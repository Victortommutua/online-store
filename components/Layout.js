import Head from 'next/head'
import Link from 'next/link'
import React, {useContext} from 'react'
import { Store } from '../utils/Store'
import {useState, useEffect} from 'react'
import {ToastContainer} from 'react-toastify';
import { useSession,signOut } from "next-auth/react"
import {Menu} from "@headlessui/react";
import DropdownLink from './DropdownLink'
import Cookies from 'js-cookie'
function Layout({title, children}) {
    const { status, data: session } = useSession();
    const { state, dispatch} = useContext(Store);
    const {cart} = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect( () =>{
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    },[cart.cartItems]);
    const logoutClickHandler = ()=> {
        Cookies.remove('cart');
        dispatch({type: 'CART_RESET'});
        signOut({callbackUrl: '/login'});
    }
  return (
    <>
          <Head>
        <title>{title ? title + 'Online | Store' : 'Online | Store'}</title>
        <meta name="description" content="Your Favorite online shopping store" />
        <link rel="icon" href="/logo.svg"/>
      </Head>
      <ToastContainer position='bottom-center' limit={1}/>
    <div className='flex min-h-screen flex-col justify-between'>
        <header>
            <nav className='flex h-12 justify-between items-center px-4 shadow-md'>
                <Link href='/'>
                    <a className='text-lg font-bold'>online store</a>
                </Link>
                <div>
                    <Link href='/cart'><a className='p-2'> Cart 
                    {cartItemsCount > 0 && (
                        <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                            {cartItemsCount}
                        </span>
                    )}
                    </a>
                    </Link>
                        {status === 'loading' ? (
                            'Loading'
                            ): session?.user ? (
                                <Menu as='div' className='relative inline-block'>
                                    <Menu.Button className='text-blue-600'>
                                        {session.user.name}
                                    </Menu.Button>
                                    <Menu.Items className='absolute right-0 w-56 origin-top-right bg-white shadow-lg'>
                                        <Menu.Item>
                                            <DropdownLink className='dropdown-link' href='/profile'>
                                                Profile
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className='dropdown-link' href='/order-history'>
                                                Order History
                                            </DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a
                                            className='dropdown-link'
                                            href='#' 
                                            onClick={logoutClickHandler}
                                            >
                                                Logout
                                            </a>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            ) : (
                                <Link href='/login'>
                                <a className='p-2'>Login</a>
                                </Link>
                            )}
                </div>
            </nav>
        </header>
        <main className='container m-auto mt-4 px-4'>{children}</main>
        <footer className='flex h-10 justify-center items-center shadow-inner'>
            <p>Copyright © 2022 Online store</p>
        </footer>
    </div>
    </>
  )
}

export default Layout
