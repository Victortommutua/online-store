import React, { useContext, useEffect } from 'react'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { useForm} from 'react-hook-form';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function ShippingScreen() {
    const {state, dispatch}= useContext(Store);
    const {cart} = state;
    const{ shippingAddress}= cart;
    const router= useRouter();
    useEffect(()=> {
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
    },[setValue, shippingAddress]);
    const { 
        register, 
        handleSubmit,
        setValue,
        formState: { errors } 
    } = useForm();
    const submitHandler = ({fullName, address,city, postalCode, country})=> {
        dispatch({

            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {fullName, address, city, postalCode, country},
        });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...createImageBitmap,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    postalCode,
                    country,
                    location,
                },
            })
        );

        router.push('/payment');
    }
  return (
    <Layout title='Shipping Address'>
        <CheckoutWizard activeStep={1}/>
        <form
        className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(submitHandler)}
        >
            <h1 className='mb-4 text-xl'>Shipping Address</h1>
            <div className='mb-4 '>
                <label htmlFor='fullName'>Full Name</label>
                <input 
            {...register('fullName', {required: 'Please enter full name',
            })}
            id='email'
            className='w-full' 
            autoFocus 
            />
            {errors.fullName && (
                <div className='text-red-500'>{errors.fullName.message}</div>
            )}
            </div>
            <div className='mb-4'>
            <label htmlFor='address'>Address</label>
            <input 
            {...register('address',
            {required: 'Please enter address',
            minLength: { value: 3, message: 'use address with more than 2 chars'},
            })}
            className='w-full' 
            autoFocus 
            id='address'
            />
            {errors.address && (<div className='text-red-500'>{errors.address.message}</div>)}
            </div>
            <div className='mb-4'>
            <label htmlFor='city'>City</label>
            <input 
            {...register('city',
            {required: 'Please enter city',
            })}
            className='w-full' 
            autoFocus 
            id='city'
            />
            {errors.city && (<div className='text-red-500'>{errors.city.message}</div>)}
            </div>
            <div className='mb-4'>
            <label htmlFor='postalCode'>Postal Code</label>
            <input 
            {...register('postalCode',
            {required: 'Please enter postal code',
            })}
            className='w-full' 
            autoFocus 
            id='postalCode'
            />
            {errors.postalCode && (<div className='text-red-500'>{errors.postalCode.message}</div>)}
            </div>
            <div className='mb-4'>
            <label htmlFor='country'>Country</label>
            <input 
            {...register('country',
            {required: 'Please enter country',
            })}
            className='w-full' 
            autoFocus 
            id='country'
            />
            {errors.country && (<div className='text-red-500'>{errors.country.message}</div>)}
            </div>
            <div className='mb-4 flex justify-between'>
                <button className='primary-button'> Next </button>
            </div>
        </form>
    </Layout>
  )
}

export default ShippingScreen

ShippingScreen.auth = true;