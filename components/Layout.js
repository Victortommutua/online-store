import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

function Layout({title, children}) {
  return (
    <>
          <Head>
        <title>{title ? title + 'Online | Store' : 'Online | Store'}</title>
        <meta name="description" content="Your Favorite online shopping store" />
        <link rel="icon" href="/logo.svg"/>
      </Head>
    <div className='flex min-h-screen flex-col justify-between'>
        <header>
            <nav className='flex h-12 justify-between items-center px-4 shadow-md'>
                <Link href='/'>
                    <a className='text-lg font-bold'>online store</a>
                </Link>
                <div>
                    <Link href='/cart'><a className='p-2'> Cart </a></Link>
                    <Link href='/login'><a className='p-2'> Login </a></Link>
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
