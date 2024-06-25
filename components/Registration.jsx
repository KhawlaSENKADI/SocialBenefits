'use client'
import Image from 'next/image'
import axios from 'axios';
import {AiOutlineCheckCircle ,AiFillCheckCircle, AiOutlineCheck} from 'react-icons/ai'
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

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



export default function Registration() {

  const router = useRouter();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [error, setError] = useState('');
  const [done ,setDone] = useState(false) ;
  const phoneRegExp = /^(?:\+213|0)(?:5|6|7)[0-9]{8}$/;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Please enter an email address."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Please enter a password."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Please confirm the password."),
    job: Yup.string().required("Please select a job."),
    phone:Yup.string()
    .matches(phoneRegExp, 'Phone number must be in Algerian format: +213 XX XXXXXXX or 0 XX XXXXXXX')
    .required('Please enter a phone number'),
    maritalStatus: Yup.string().required("Please provide a marital status."),
    name: Yup.string().required("Please enter the employee's name.") ,
    bitmask: 0b0000,
  });

  










  return (
    <div className='pb-5 justify-center pl-5 pt-4  w-full flex flex-col  '>
    {done &&
<div className="w-screen absolute  top-0 left-0 z-20  bg-blue-900/30  h-screen">
    <div className="h-screen  relative w-screen ">
    <div className='md:w-[30%] w-[80%] rounded-xl overflow-hidden pb-4 absolute bg-white left-1/2 -translate-x-1/2 flex flex-col items-center top-1/2 -translate-y-1/2'>
        <div className='h-3/5 flex items-center justify-center bg-green-500 w-full top-0'>
          <AiOutlineCheckCircle className=' h-[50%] text-white  w-[50%]' />
        </div>
        <p className='font-bold text-2xl mt-2 font-mono  text-neutral-900'>Great!</p>
        <p className='text-sm font-bold w-full px-4 text-center text-zinc-700'>Employee account registration has been successfully completed. The new employee has been added to the system.</p>
        <Link href='/Employee'><button className='flex flex-row whitespace-nowrap items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 mt-4 rounded-full'><AiOutlineCheck className='w-5 text-white h-5'/>Done</button></Link>
      </div>
    </div>

</div>
 }
      <div className='w-full max-w-[60rem]'>
      <p className='text-blue-700 font-bold flex-none text-2xl font-mono m-3'>Register An Employee :</p>
     <div className=' mt-5  grow flex justify-center items-center '>
       <div className=' w-[95%] sm:w-[80%] flex flex-col '>

       <p className='text-red-600 font-bold text-sm mt-2 animate-pulse animate-bounce '>{error}</p>



       <Formik  
  initialValues={{
    email: '',
    name:'',
    password: '',
    confirmPassword:'',
    job: '',
    maritalStatus:'',
    phone: '' ,
    bitmask: 0b0000
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
    
    axios.post('https://server-social-benefits.vercel.app/signup', {
    email: values.email,
    password: values.password ,
    role : theRoles ,
    job:values.job,
    phone : values.phone,
    maritalStatus : values.maritalStatus ,
    name : values.name ,
    profileImageUrl:"https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
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
     <div className="relative mb-3">
        <Field
          className={`${touched.email && errors.email ? 'error' : ''} peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
          type="email"
          name="email"
          id="email"
          placeholder="email"
          onBlur={handleBlur}
         onChange={handleChange}
         value={values.email}
        
        />
<label
    
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >E-mail</label
  >        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="email" component="span"  />
      </div>

      <div className="relative mb-3">
        <Field
          className={`${touched.email && errors.email ? 'error' : ''} peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
          type="text"
          name="name"
          placeholder="name"
          onBlur={handleBlur}
         onChange={handleChange}
         value={values.name}
        
        />
<label
    
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Name</label
  >        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="name" component="span"  />
      </div>

      <div className="relative mb-3">
      <Field
    type="password"
    className={`${touched.password && errors.password ? 'error' : null} peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none peer-focus:text-primary dark:text-neutral-200  dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
    id="password"
    name='password'
    placeholder="Password" 
    onChange={handleChange}
         value={values.password}
         onBlur={handleBlur}
   />
  <label
  
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Password</label
  >
        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="password" component="span"/>
      </div>
    
      <div className="relative mb-3">
      <Field
    type="password"
    className={`${touched.password && errors.password ? 'error' : null} peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none peer-focus:text-primary dark:text-neutral-200  dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
    id="confirmPassword"
    name='confirmPassword'
    placeholder="Confirm password" 
    onChange={handleChange}
         value={values.confirmPassword}
         onBlur={handleBlur}
   />
  <label
  
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >confirm Password</label
  >
        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="confirmPassword" component="span"/>
      </div>

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

      
      <div className="relative mb-3">
        <Field
          className={`${touched.email && errors.email ? 'error' : ''} peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
          type="text"
          name="phone"
          placeholder="phone"
          onBlur={handleBlur}
         onChange={handleChange}
         value={values.phone}
        
        />
<label
    
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Phone number</label
  >        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="phone" component="span"  />
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





<div className="relative mb-3">
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
  )
}
