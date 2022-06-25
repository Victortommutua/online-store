import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'

function Unauthorized() {
    const router = useRouter();
    const {message} = router.query;
  return (
    <Layout title='Unauthorized Page'>
        <h1 className='text-xl text-center'>
            Access Denied
        </h1>
        {message && <div className='text-center mb-4 text-red-500'>{message}</div>}
    </Layout>
  )
}

export default Unauthorized
