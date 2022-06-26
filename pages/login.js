import Link from 'next/link'
import React,{useEffect} from 'react'
import Layout from '../components/Layout'
import { useForm} from 'react-hook-form';
import {signIn} from 'next-auth/react';
import { getError } from '../utils/error';
//import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useSession} from "next-auth/react"
function loginScreen() {
    const router = useRouter();
    const {redirect} = router.query;
    const {data: session} = useSession();
    useEffect(()=> {
        if(session?.user){
            router.push(redirect || '/');
        }
    },[redirect, router, session]);
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();
    const submitHandler = async({email, password}) =>{
        try{
            const result = await signIn('credentials',{
                redirect: false,
                email,
                password,
            });
            if(result.error){
                toast.error(result.error);
            }
        }catch(err){
            toast.error(getError(err));
        }
    }
  return (
    <Layout title='Login'>
        <form onSubmit={handleSubmit(submitHandler)} className='mx-auto max-w-screen-md'>
            <h1 className='mb-4 text-xl'>Login</h1>
            <div className='mb-4'>
            <label htmlFor='email'>Email</label>
            <input 
            {...register('email', {required: 'Please enter email', pattern: {
                value: /^[a-zA-z0-9_.+-]+@[a-zA-z0-9-]+.[a-zA-z0-9-.]+$/i,
                message: 'Enter valid email address'
            }})}
            id='email'
            className='w-full' 
            autoFocus 
            type='email'>
            </input>
            {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
            </div>
            <div className='mb-4'>
            <label htmlFor='password'>Password</label>
            <input 
            {...register('password',
            {require: 'Please enter password',
            minLength: { value: 6, message: 'use password with more than 5 chars'},
            })}
            className='w-full' 
            autoFocus 
            id='password'
            type='password'>
            </input>
            {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
            </div>
            <div className='mb-4'>
                <button className='primary-button'>Login</button>
            </div>
            <div className='mb-4'>
                Don&apos;t have an account? &nbsp;
                <Link href="register">Register</Link>
            </div>
        </form>
    </Layout>
  )
}

export default loginScreen

