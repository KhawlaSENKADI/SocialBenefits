'use client'
import Image from 'next/image'
import Navbar from '@/components/NavbarOfLogin'
import axios from 'axios';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
import Link from "next/link";
import { AiOutlineCheckCircle,  AiOutlineCheck } from "react-icons/ai";



export default  function Nouveau_mp() {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [done ,setDone] = useState(false) ;

  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters.')
      .required('Please enter a new password.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.')
      .required('Passwords must match.'),
  });
  return (
  <div  className='w-screen h-screen flex flex-col'>


{done &&
<div className="w-full absolute top-0 left-0 z-50  bg-blue-900/30  h-screen">
    <div className="h-screen  relative w-screen ">
    <div className='md:w-[30%] w-[80%] rounded-xl overflow-hidden pb-4 absolute bg-white left-1/2 -translate-x-1/2 flex flex-col items-center top-1/2 -translate-y-1/2'>
        <div className='h-3/5 flex items-center justify-center bg-green-500 w-full top-0'>
          <AiOutlineCheckCircle className=' h-[50%] text-white  w-[50%]' />
        </div>
        <p className='font-bold text-2xl mt-2 font-mono  text-neutral-900'>Great!</p>
        <p className='text-sm font-bold w-full px-4 text-center text-zinc-700'>Your password has been successfully changed.</p>
        <Link href='/Login'><button className='flex flex-row whitespace-nowrap items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 mt-4 rounded-full'><AiOutlineCheck className='w-5 text-white h-5'/>Done</button></Link>
      </div>
    </div>

</div>
 }

    <Navbar/>
   <div  className='w-screen  h-full grid grid-cols-1 grid-rows-3 sm:grid-rows-1 sm:grid-cols-2'>
    <div className='h-full  sm:row-span-1 row-span-2 w-full relative    '>
        <div className='sm:w-[75%] w-[80%] flex flex-col bottom-0 justify-between pb-[35%] sm:pb-[20%]   absolute top-[10%] sm:top-1/4 left-1/2 transform -translate-x-1/2  '>
        <p className=' text-[38px] text-blue-800 font-bold sm:-translate-x-[20%] -translate-x-[30%] font-mono  w-full text-center ml-[20%]'>Tapez le nouveau mot de passe</p>
        <Formik
         initialValues={{
          newPassword:'', confirmPassword:''
        }}
        validationSchema={validationSchema}
        onSubmit ={ (values)=>{
          setIsLoadingButton(true)
       
          
          axios.post('https://server-social-benefits.vercel.app/updatePassword', {
          email: email,
          password: values.confirmPassword,
          token : token
          })
        .then(response => {
          setDone(true)
          console.log(response.data);
          setIsLoadingButton(false)
        })
        .catch(error => {
          console.log(error?.response?.data.error);
          setError(error?.response?.data.error)
          setIsLoadingButton(false)
        });
        }}
        
        >



    
    <Form id='my-form'    className='w-full mt-4 flex items-center flex-col justify-center'>
    <p className='text-red-600 font-bold text-sm mt-2 animate-pulse animate-bounce '>{error}</p>

      <div className="relative mt-2 w-full mb-3">
        <Field
          className={` peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
          type="password"
          name="newPassword"
          id="newPassword"
          
          placeholder="password"
       />
<label
    
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Nouveau mot de Passe</label
  >        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="newPassword" component="span"  />
      </div>
      <div className="relative w-full mb-3">
      <Field
    type="password"
    className={` peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none peer-focus:text-primary dark:text-neutral-200  dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
    id="confirmPassword"
    name='confirmPassword'
    placeholder="confirmPassword" 
  
   />
  <label
  
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Confirmer mot de passe</label
  >
        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="confirmPassword" component="span"/>
      </div>
    
    
    </Form>

</Formik>


   
<div className="w-full flex flex-col mt-2   items-center justify-center">
 <button disabled={isLoadingButton} form='my-form' type='submit'   className="text-center flex items-center hover:duration-500 justify-center bg-red-600 hover:bg-blue-500 hover:scale-110 max-w-[12rem] w-screen rounded py-2  text-white   text-xl  ">
{!isLoadingButton && 'Change'}
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




   


