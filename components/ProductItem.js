/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

function ProductItem({product, AddToCartHandler}) {
  return (
    <div className='card'>
        <Link href={`/product/${product.slug}`}>
            <a>
                <img
                className='rounded shadow'
                src={product.image}
                alt={product.name}
                />
            </a>
        </Link>
        <div className='flex flex-col items-center justify-center p-5'>
            <Link href={`/product/${product.slug}`}>
              <a>
               <h2 className='text-lg'>{product.name}</h2>
              </a>
            </Link>
            <p className='mb-2'>{product.brand}</p>
            <p>${product.price}</p>
            <button 
            className='primary-button' 
            type='submit'
            onClick={()=> AddToCartHandler(product)}
            >
                Add to cart
            </button>
        </div>
    </div>
  )
}

export default ProductItem
