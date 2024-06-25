'use client'
import { useRef, useState  , useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {RiImageAddFill} from 'react-icons/ri'
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";

import { AiOutlineCheckCircle,  AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import { FcRemoveImage} from "react-icons/fc";
import Link from "next/link";


export default function Page() {
    const [done ,setDone] = useState(false) ;

const [isLoadingButton, setLoadingButton] = useState(false) ;


    



  return (






    <div className=" flex justify-center items-center px-8  md:py-16   flex-col  ">



{done &&
<div className="w-screen absolute top-0 left-0 z-50  bg-blue-900/30  h-screen">
    <div className="h-screen  relative w-screen ">
    <div className='md:w-[30%] w-[80%] rounded-xl overflow-hidden pb-4 absolute bg-white left-1/2 -translate-x-1/2 flex flex-col items-center top-1/2 -translate-y-1/2'>
        <div className='h-3/5 flex items-center justify-center bg-green-500 w-full top-0'>
          <AiOutlineCheckCircle className=' h-[50%] text-white  w-[50%]' />
        </div>
        <p className='font-bold text-2xl mt-2 font-mono  text-neutral-900'>Great!</p>
        <p className='text-sm font-bold w-full px-4 text-center text-zinc-700'>Success! The website features a new public announcement now. </p>
        <Link href='/Admin'><button className='flex flex-row whitespace-nowrap items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 mt-4 rounded-full'><AiOutlineCheck className='w-5 text-white h-5'/>Done</button></Link>
      </div>
    </div>

</div>
 }






        <div className="border-[3px] w-full   max-w-[50rem] pb-20 md:pb-auto mb-20 relative rounded p-8 border-neutral-300 ">
     <p className="md:text-5xl w-full text-center text-4xl font-mono font-bold mb-8 text-zinc-700 mt-8 md:ml-5">New Announcement </p>

   <Formik 
    initialValues={{
        images: [],title :  '' ,description: ''
      }}
      
      validationSchema={Yup.object({
        images: Yup.array().min(1, "Please select at least one image"),
        title: Yup.string().required(),
        description: Yup.string().required(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setLoadingButton(true)
        const formData = new FormData();
       
        for (let i = 0; i < values.images.length; i++) {
          formData.append("pic", values.images[i]);
        }
        formData.append('title', values.title);
        formData.append('description', values.description);
        axios
          .post("https://server-social-benefits.vercel.app/uploadAnnouncement", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            setSubmitting(false);
            setLoadingButton(false)
            setDone(true)

          })
          .catch((error) => {
            console.log(error);
            setSubmitting(false);
            setLoadingButton(false)
          });
      }}
    
    >
      {({ values,errors, touched , isSubmitting, setFieldValue ,handleBlur ,handleChange }) => (









        <Form id="my-form" className="mb-12  relative gap-2 grid grid-cols-2  " >

















<div className="flex flex-col  col-span-2  ml-2">

<p className="block  mb-2 font-bold text-[#0B59A1] mt-8 text-26px">Title:</p>

<div className="relative  break-all py-2" >
  <p className="opacity-0 w-full text-sm">{values.title}</p>

<div className="w-full h-full absolute top-0">

<div className="relative h-full  flex flex-col w-full ">

<Field component="textarea"  onChange={handleChange} value={values.title}   name="title"   onBlur={handleBlur} className={`block h-full min-h-[2.5rem] resize-none  z-30 pt-1 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " />
<label  className="pl-2   peer-focus:font-medium absolute text-sm text-gray-500  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Aa...</label>
<ErrorMessage className="mt-1 cursor-default text-red-500 text-xs error-message font-bold" name="title" component="span"/>

</div>

</div>


</div>


</div>




<div className="flex flex-col  mt-4 col-span-2  ml-2">

<p className="block mb-2 font-bold text-[#0B59A1] mt-8 text-26px">Description:</p>

<div  className="relative  break-all py-2" >
  <p  className="w-full opacity-0 text-sm">{values.description}</p>

<div className="w-full h-full absolute top-0">

<div className="relative h-full   flex flex-col w-full ">

<Field component="textarea"  onChange={handleChange} value={values.description}   name="description"   onBlur={handleBlur} className={`block h-full min-h-[2.5rem] resize-none  z-30 pt-1 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " />
<label  className="pl-2   peer-focus:font-medium absolute text-sm text-gray-500  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Aa...</label>
<ErrorMessage className="mt-1 cursor-default text-red-500 text-xs error-message font-bold" name="description" component="span"/>

</div>

</div>


</div>


</div>




<div className="w-full mt-12 col-span-2 flex flex-col">
    <p className="text-zinc-700 font-bold mb-4 text-xl ml-4">Select Needed Documents :</p>
<div className="grid gap-2 ml-6 w-fit grid-cols-2 md:grid-cols-3">

{values.images && Array.from(values.images).map((image ,index) => (
<div key={index} className="w-20 md:w-40 shadow ring-zinc-400 ring-2 rounded overflow-hidden md:h-40 relative h-20">
<Image key={image.name} fill src={URL.createObjectURL(image)} alt="selected" className="rounded object-cover" />
<div className="absolute -top-0 -right-0">
        <button type="button" onClick={() => {
          const newImages = [...values.images];
          newImages.splice(index, 1);
          setFieldValue("images", newImages);
        }} >
          <IoMdCloseCircle className="md:w-12 w-8 h-8 md:h-12 text-red-500" />
        </button>
      </div>
</div>
))}

<div className=" aspect-square w-20 md:w-40  rounded border-[3px]  border-zinc-400  relative">
<RiImageAddFill className="md:h-16  h-10 w-10 text-zinc-400 md:w-16 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
<input
id="images"
name="images"
type="file"
accept=".png, .jpg, .jpeg"
onChange={(event) => {
const files = event.currentTarget.files;
const fileArray = Array.from(files);
setFieldValue("images", fileArray);
}}
className="opacity-0 cursor-pointer w-20 h-20 md:w-40 md:h-40 bg-red-900"
/>


</div>
</div>

<ErrorMessage name="images" component="span" className="text-red-500 ml-6 mt-2 text-xs error-message font-bold" />

</div>
         
        </Form>
      )}
    </Formik>

    <button disabled={isLoadingButton}  form="my-form" type="submit"  className="bg-red-500 absolute md:bottom-5 md:right-16 md:left-auto md:translate-x-0 left-1/2 -translate-x-1/2 md:mt-5  text-white px-8 py-4 rounded">
  
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
      ) : 'Submit'}
</button>
    </div>
    </div>
  );
};
