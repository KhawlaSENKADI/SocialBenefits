'use client'
import {AiOutlineCheckCircle ,AiFillCheckCircle, AiOutlineCheck} from 'react-icons/ai'
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';
import EditPass from '@/components/EditPass';
import Loading from '@/components/Loading.js';
import Image from 'next/image';

export default function Page() {
  

  const id = localStorage.getItem('id');
  
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
      phone:Yup.string()
    .matches(phoneRegExp, 'Phone number must be in Algerian format: +213 XX XXXXXXX or 0 XX XXXXXXX')
    .required('Please enter a phone number'),
    maritalStatus: Yup.string().required("Please provide a marital status."),
    name: Yup.string().required("Please enter the employee's name.") ,

    });

   
    
  
    const [profileImageUrl, setProfileImageUrl] = useState(account?.profileImageUrl);

  

const [activeTab, setActiveTab] = useState('tab-account-info');

function toggleTab(event, tabId) {

  setActiveTab(tabId);

  const tabButtons = document.querySelectorAll('[role="tab"]');
  const tabContents = document.querySelectorAll('.tab-content');

  tabContents.forEach((tabContent) => {
    tabContent.classList.add('hidden');
  });

  tabButtons.forEach((tabButton) => {
    tabButton.setAttribute('aria-selected', 'false');
  });

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.remove('hidden');
  }
  event.currentTarget.setAttribute('aria-selected', 'true');
}



const AccountInfoSection = () => (
  <div
    className={`${
      activeTab === 'tab-account-info' ? 'block' : 'hidden'
    } opacity-100 transition-opacity duration-150 ease-linear`}
    id="tab-account-info"
    role="tabpanel"
    aria-labelledby="tab-account-info"
  >
    <div className='w-full max-w-[60rem]'>
     
      <div className=' mt-[6%]  grow flex justify-center items-center '>
       <div className=' w-[95%] sm:w-[80%] flex flex-col '>
       <p className='text-red-600 font-bold text-sm mt-2 animate-pulse animate-bounce '>{error}</p>



       <Formik  
  initialValues={{
    name:account?.name ,
    phone:account?.phone ,
    maritalStatus:account?.maritalStatus,
  }}
  validationSchema={validationSchema}
  onSubmit={(values) => {
    setIsLoadingButton(true);
    console.log(account.email)  
  
      axios.post(`https://server-social-benefits.vercel.app/accounts/${account.email}`, {
        name: values.name,
        maritalStatus: values.maritalStatus,
        phone: values.phone,
      }).then(axios.spread((accountResponse, pictureResponse) => {
        window.location.reload()

        console.log(accountResponse.data);
        console.log(pictureResponse.data);

        setDone(true);
        setIsLoadingButton(false);
      }))
      .catch((error) => {
        console.log(error?.response?.data.error);
        setError(error?.response?.data.error);
        setIsLoadingButton(false);
      });  }}
  

>
  {({ values, errors, touched, handleChange, handleBlur, setFieldValue  }) => (

    <> <div className=' mb-[6%] w-full flex flex-col items-center justify-center '>
    <div className='h-full relative aspect-square'>
      <label htmlFor='imageUpload'>
        <div           className='h-[140px] relative p-2 overflow-hidden w-[140px] rounded-full ring-2 hover:ring-blue-500 hover:ring-3 ring-neutral-400 cursor-pointer'
>
  <Image 
  className='p-1 rounded-full'
  fill 
  alt='Profile Image'
  src={profileImageUrl || account?.profileImageUrl}
  />

        </div>
     
        <div className='absolute flex justify-center cursor-pointer items-center hover:scale-110 hover:bg-blue-500 rounded bg-red-400 top-1/1 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
         <div className='w-full cursor-pointer h-full relative'>  
           <svg
            className='h-8 w-8 text-white cursor-pointer'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
          <input
           id="images"
           name="images"
           type="file"
           accept=".png, .jpg, .jpeg"
           className=' absolute cursor-pointer  inset-0 opacity-0 '
            onChange={(event) => {
              setLoadingfetch(true)
              const files = event.currentTarget.files;
              const fileArray = Array.from(files);
             // setFieldValue("images", fileArray);
             const formData = new FormData();

             for (let i = 0; i < fileArray.length; i++) {
              formData.append("pic", fileArray[i]);
            }
            formData.append('email', account?.email);
     
                    axios
              .post("https://server-social-benefits.vercel.app/updateProfilePicture", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                console.log(response.data);
                window.location.reload()
                setLoadingfetch(false)
    
              })
              .catch((error) => {
                console.log(error);
                setSubmitting(false);
              });
              }}
          /></div>
      
        </div>
      </label>
    </div>
  </div>
    
    <Form id='my-form'   className='mt-4  w-full grid grid-cols-2 gap-2 gap-x-8 justify-center'>



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
          className={`${touched.phone && errors.phone ? 'error' : ''} peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
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
  <Field as="select" name="maritalStatus" onChange={handleChange} onBlur={handleBlur} value={values.maritalStatus} className="block appearance-none w-full text-neutral-400 focus:text-black  duration-500  bg-white border border-neutral-200 hover:border-[#0B59A1] px-4 py-4 pr-8 rounded   focus:outline-none focus:shadow-outline">
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



    </Form>
    </>
  )}
</Formik>











       <div className=' mt-[6%] flex pr-4 gap-4 flex-row justify-end bottom-5 bg-white flex-none'>
     <Link href='/Admin' ><button className='bg-white  hover:scale-110 hover:bg-blue-700 hover:text-white hover:border-blue-700 rounded  border-2 border-red-500 text-red-500 font-bold py-2 px-8 '>Cancel</button></Link> 
      <button disabled={isLoadingButton}  form='my-form' type='submit' className='rounded hover:scale-110  bg-red-500 text-white font-bold py-2 px-4'>
      {!isLoadingButton && 'Enregistrer'}


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
);


if(Loadingfetch) return (<Loading/>)

    ////////actual page
  return (

    <div className='h-full w-full'>
    


    <div className='pb-5 justify-center pt-4  w-full flex flex-col  '>
    {done &&
<div className="w-screen absolute  top-0 left-0 z-20  bg-blue-900/30  h-screen">
    <div className="h-screen  relative w-screen ">
    <div className='md:w-[30%] w-[80%] rounded-xl overflow-hidden pb-4 absolute bg-white left-1/2 -translate-x-1/2 flex flex-col items-center top-1/2 -translate-y-1/2'>
        <div className='h-3/5 flex items-center justify-center bg-green-500 w-full top-0'>
          <AiOutlineCheckCircle className=' h-[50%] text-white  w-[50%]' />
        </div>
        <p className='font-bold text-2xl mt-2 font-mono  text-neutral-900'>Great!</p>
        <p className='text-sm font-bold w-full px-4 text-center text-zinc-700'>Your account informations have been updated successfully. The changes have been saved to the system. </p>
        <Link href='/Employee'><button className='flex flex-row whitespace-nowrap items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 mt-4 rounded-full'><AiOutlineCheck className='w-5 text-white h-5'/>Done</button></Link>
      </div>
    </div>

</div>
 }




<ul className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0" role="tablist">
        <li
          role="presentation"
          className={`flex-auto text-center ${activeTab === 'tab-account-info' ? 'border-b-2 border-[#0B59A1]' : 'border-b-2 border-gray-300'}`}
        >
          <button
            onClick={(event) => toggleTab(event, 'tab-account-info')}
            className={`text-[20px] font-Bahnschrift font-bold p-[4%] ${
              activeTab === 'tab-account-info' ? 'text-[#0B59A1]' : 'text-gray-500 hover:text-gray-700'
            }`}
            role="tab"
            aria-controls="tab-account-info"
            aria-selected={activeTab === 'tab-account-info'}
          >
            Modifier informations de compte
          </button>
        </li>
        <li
          role="presentation"
          className={`flex-auto text-center ${activeTab === 'tab-password' ? 'border-b-2 border-[#0B59A1]' : 'border-b-2 border-gray-300'}`}
        >
          <button
            onClick={(event) => toggleTab(event, 'tab-password')}
            className={`text-[20px] font-Bahnschrift font-bold p-[4%] ${
              activeTab === 'tab-password' ? 'text-[#0B59A1]' : 'text-gray-500 hover:text-gray-700'
            }`}
            role="tab"
            aria-controls="tab-password"
            aria-selected={activeTab === 'tab-password'}
          >
            Modifier mot de passe
          </button>
        </li>
      </ul>

      <div className="flex justify-center">
        <div className="w-full max-w-screen-lg">
          <AccountInfoSection />
        </div>
      </div>

<div className={`${
          activeTab === 'tab-password' ? 'block' : 'hidden'
        } opacity-100 transition-opacity duration-150 ease-linear`}
        id="tab-password"
        role="tabpanel"
        aria-labelledby="tab-password" >
<EditPass/>
</div>
    </div>
 </div>
  )
}

