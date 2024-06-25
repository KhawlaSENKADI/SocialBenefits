/////////Edit Employee
'use client'
import {AiOutlineCheckCircle ,AiFillCheckCircle, AiOutlineCheck} from 'react-icons/ai'
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Loading from '@/components/Loading.js';

function decimalToBinary(decimal) {
    // Convert the decimal number to its binary representation
    let binary = decimal.toString(2);
    
    // Pad the binary string with zeros to a length of 4
    while (binary.length < 4) {
      binary = '0' + binary;
    }
    
    return binary;
  }


const roles = {
    employee: 0b0001,
    responsable: 0b0010,
    funder: 0b0100,
    comptable: 0b1000,
  };
  
  
  
  const validate = (values) => {
    const errors = {};
    if (values.bitmask === 0) {
      errors.bitmask = 'Please select at least one role';
    }
    return errors;
  };
  
  const CheckboxGroup = ({ label, name, options, values, setFieldValue }) => {
    return (
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">{label}</label>
        <ErrorMessage name={name} component="div" className="text-red-500 text-xs font-bold mt-2" />
        <div role="group" aria-labelledby={name}>
          {options.map(option => (
            <label key={option.value} className="flex items-center mb-2">
              <Field
                type="checkbox"
                name={name}
                value={option.value}
                checked={(option.value & values[name]) !== 0}
                onChange={(event) => {
                  const newValue = event.target.checked
                    ? values[name] | option.value
                    : values[name] & ~option.value;
                  setFieldValue(name, newValue);
                console.log(decimalToBinary(newValue))
                }}
                className="mr-2"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
       
      </div>
    );
  };




export default function Page() {

    const searchParams = useSearchParams();

    const id = searchParams.get('id');
  
    const [account, setAccount] = useState(null);
    const[Loadingfetch,setLoadingfetch] = useState(true) ;

    useEffect(() => {
        axios.get('https://server-social-benefits.vercel.app/accounts', {
          params: {
            email: id
          }
        })
        .then((response) => {
          setAccount(response.data[0]);
          console.log(response.data[0])      ; 
          setLoadingfetch(false)
        })
        .catch((error) => {
          console.error(error);
        });
      }, [id]);


    const router = useRouter();
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [error, setError] = useState('');
    const [done ,setDone] = useState(false) ;
    const phoneRegExp = /^(?:\+213|0)(?:5|6|7)[0-9]{8}$/;
    const validationSchema = Yup.object().shape({
      job: Yup.string().required("Please select a job."),
      maritalStatus: Yup.string().required("Please provide a marital status."),
      bitmask: 0b0000,
    });

  
  
  
  
  
  
  
  
  






if(Loadingfetch) return (<Loading/>)

    ////////actual page
  return (

    <div className='h-full w-full '>
    


    <div className='pb-5 justify-center pl-5 pt-4  w-full flex flex-col  '>
    {done &&
<div className="w-screen absolute  top-0 left-0 z-20  bg-blue-900/30  h-screen">
    <div className="h-screen  relative w-screen ">
    <div className='md:w-[30%] w-[80%] rounded-xl overflow-hidden pb-4 absolute bg-white left-1/2 -translate-x-1/2 flex flex-col items-center top-1/2 -translate-y-1/2'>
        <div className='h-3/5 flex items-center justify-center bg-green-500 w-full top-0'>
          <AiOutlineCheckCircle className=' h-[50%] text-white  w-[50%]' />
        </div>
        <p className='font-bold text-2xl mt-2 font-mono  text-neutral-900'>Great!</p>
        <p className='text-sm font-bold w-full px-4 text-center text-zinc-700'>Employee information updated successfully. The changes have been saved to the system. Thank you for keeping the employee records up-to-date.</p>
        <Link href='/Employee'><button className='flex flex-row whitespace-nowrap items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 mt-4 rounded-full'><AiOutlineCheck className='w-5 text-white h-5'/>Done</button></Link>
      </div>
    </div>

</div>
 }
      <div className='w-full max-w-[60rem]'>
      <p className='text-blue-700 font-bold flex-none text-2xl font-mono m-3'>Employee Account Configuration:</p>
      <div className='w-full  aspect-[3/1] sm:aspect-[6/1] flex flex-col items-center justify-center'>
        <div className='h-full relative aspect-square '>
        <Image fill    className='rounded-full p-1 ring-2  ring-neutral-400 hover:scale-110' alt='https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg' src={account?.profileImageUrl}/>
        </div>
        <p className='mt-2 font-mono text-3xl font-bold   text-zinc-800'>{account?.name}</p>
        <p className='text-sm text-neutral-400 font-semibold'>{account?.email}</p>
      </div>
     <div className=' mt-5  grow flex justify-center items-center '>
       <div className=' w-[95%] sm:w-[80%] flex flex-col '>

       <p className='text-red-600 font-bold text-sm mt-2 animate-pulse animate-bounce '>{error}</p>



       <Formik  
  initialValues={{
    job:account?.job ,
    maritalStatus:account?.maritalStatus,
    bitmask:  parseInt(account?.role, 2)
  }}
  validate={validate}
  validationSchema={validationSchema}
  onSubmit ={ (values)=>{
    setIsLoadingButton(true)
    let binaryValue = "";
    Object.keys(roles).forEach((role) => {
      if ((values.bitmask & roles[role]) !== 0) {
        binaryValue += "1";
      } else {
        binaryValue += "0";
      }
    });
   let theRoles = binaryValue.split('').reverse().join('') ;
    
   axios.post(`https://server-social-benefits.vercel.app/accounts/${id}`, {
    role : theRoles ,
    job:values.job,
    maritalStatus : values.maritalStatus ,
  })
  .then(response => {
    console.log(response.data);
    setDone(true)
    setIsLoadingButton(false)
  })
  .catch(error => {
    console.log(error?.response?.data.error);
    setError(error?.response?.data.error)
    setIsLoadingButton(false)
  });
  }}

>
  {({ values, errors, touched, handleChange, handleBlur, setFieldValue  }) => (
    
    <Form id='my-form'   className='mt-4  w-full grid grid-cols-2 gap-2 gap-x-8 justify-center'>


    

      <div className=" relative mb-3">
  <Field as="select" name="job" onChange={handleChange} onBlur={handleBlur} value={values.job} className="block appearance-none w-full text-neutral-400 focus:text-black  duration-500  bg-white border border-neutral-200 hover:border-blue-500 px-4 py-4 pr-8 rounded   focus:outline-none focus:shadow-outline">
    <option  value="">Select a job</option>
    <option>maître de conférences</option>
    <option>maître assistant</option>
    <option>secretaire</option>
    <option>personnel administratif et de soutien</option>
    <option>bibliothécaires</option>
    <option>sécurité et sûreté du campus</option>
    <option>personnel de maintenance</option>
  </Field>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current text-red-500 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
  </div>
  <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="job" component="span" />

      </div>


    

      <div className=" relative mb-3 flex items-center">
  <Field as="select" name="maritalStatus" onChange={handleChange} onBlur={handleBlur} value={values.maritalStatus} className="block appearance-none w-full text-neutral-400 focus:text-black  duration-500  bg-white border border-neutral-200 hover:border-blue-500 px-4 py-4 pr-8 rounded   focus:outline-none focus:shadow-outline">
    <option  value="">Select a marital Status</option>
    <option>marié</option>
    <option>célibataire</option>
    <option>divorcé</option>
  </Field>
  <div className="pointer-events-none absolute right-0">
    <svg className="fill-current h-4 w-4 text-red-500 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
  </div>
  <ErrorMessage className="text-red-500 text-xs absolute bottom-7 error-message font-bold" name="maritalStatus" component="span" />
</div>





<div className="relative ml-8 mb-3">
<CheckboxGroup
              label="Roles"
              name="bitmask"
              options={[
                { label: 'Employee', value:roles.employee  },
                { label: 'Responsable', value: roles.responsable },
                { label: 'Funder', value: roles.funder },
                { label: 'Comptable', value:roles.comptable },
              ]}
              values={values}
              setFieldValue={setFieldValue}
            />
        </div>



    </Form>
  )}
</Formik>











       <div className='flex pr-4 gap-4 flex-row justify-end bottom-5 bg-white flex-none'>
     <Link href='/Admin' ><button className='bg-white  hover:scale-110 hover:bg-blue-700 hover:text-white hover:border-blue-700 rounded  border-2 border-red-500 text-red-500 font-bold py-2 px-4 text-xs '>Cancel</button></Link> 
      <button disabled={isLoadingButton}  form='my-form' type='submit' className='rounded hover:scale-110  bg-red-500 text-white font-bold py-2 px-4 text-xs'>
      {!isLoadingButton && 'Register'}
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
      ) : null}</button>
 </div>
       </div>
     </div>
     </div>
    </div>



    </div>
  )
}
