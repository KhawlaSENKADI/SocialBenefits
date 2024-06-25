'use client'
import Image from 'next/image'
import Navbar from '@/components/NavbarOfLogin'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export default  function Page() {
  const router = useRouter();
  const [error, setError] = useState('');

    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    });

  return (
  
    <div  className='w-screen h-screen flex flex-col'>
    <Navbar/>
<div  className='w-screen  h-full grid grid-cols-1 grid-rows-3 sm:grid-rows-1 sm:grid-cols-2'>
    <div className='h-full  sm:row-span-1 row-span-2 w-full relative    '>
        <div className='sm:w-[75%] w-[80%] flex flex-col bottom-0 justify-between pb-[35%] sm:pb-[20%]   absolute top-[10%] sm:top-1/4 left-1/2 transform -translate-x-1/2  '>
        <p style={{ fontFamily: 'Bahnschrift' }} className=' text-[38px] text-blue-800 font-bold  sm:-translate-x-[20%] -translate-x-[30%] font-mono  w-full text-center ml-[20%]'>Ou devons-nous envoyer le lien de confirmation?</p>
    <p className='mt- mb-4 text-[20px] font-bahnschrift  text-blue-900 font-bold sm:-translate-x-[20%] -translate-x-[30%]   w-full text-center ml-[20%]'>Entrez l'adresse e-mail associé à votre compte pour modifier votre mot de passe</p>

 <Formik  
   initialValues={{
    email: '',
  }}
  validationSchema={validationSchema}
  onSubmit ={ (values)=>{
    setIsLoadingButton(true) ;
    axios.post('https://server-social-benefits.vercel.app/forgotPassword', {
    email: values.email,
  })
  .then(response => {
    console.log(response.data)
   setIsLoadingButton(false)
   router.push('/Sent')
    
  })
  .catch(error => {
    console.log(error?.response?.data.error);
    setError(error?.response?.data.error)
    setIsLoadingButton(false)
  });
  } }
>
  {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
    
    <Form id='my-form'    className='w-full  flex items-center flex-col justify-center'>
      <p className='text-red-600 font-bold text-sm mt-2 animate-pulse animate-bounce '>{error}</p>

      <div className="relative mt-2 w-full mb-8">
        <Field
          className={`${touched.email && errors.email ? 'error' : ''} peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
          type="email"
          name="email"
          id="email"
          placeholder="email"
        
        />
<label
    
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Votre Adresse E-mail</label
  >        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="email" component="span"  />
      </div>
     </Form>
  )}
</Formik>
  <div className="w-full flex flex-col mt-2   items-center justify-center">
 <button disabled={isLoadingButton} form='my-form' type='submit'   className="text-center flex items-center hover:duration-500 justify-center bg-red-600 hover:bg-blue-500 hover:scale-110 max-w-[12rem] w-screen rounded py-2  text-white   text-xl  ">
{!isLoadingButton && 'Send'}
{isLoadingButton ? (
        <svg
          className="animate-spin mr-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}</button></div>



 </div>

        </div>
        <div className='w-full order-first sm:order-2 relative h-full bg-red-900'>
            <div className='absolute top-0 right-0 h-full w-full bg-black/80 z-10'></div>
        <Image fill alt='/' className="object-cover" priority={true}  src="https://legamart.com/articles/wp-content/uploads/2023/02/workers-considering-term-agreement-min.jpg" />
 </div>      
    </div>
    </div>
  )
}
