'use client'
import React, { useState ,useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {User} from '@/components/User'
import '../../globals.css'
import Loading from '@/components/Loading.js';

import { piecejointes } from '@/components/piecejointes';
import { useSearchParams } from 'next/navigation';
import axios  from 'axios';
import { useRouter } from 'next/navigation';
import { AiFillCaretLeft, AiFillCaretRight , AiOutlineClose } from "react-icons/ai";
import Image from 'next/image';
import * as Yup from 'yup';
import {AiFillFileImage} from 'react-icons/ai'
import { AiOutlineCheckCircle,  AiOutlineCheck } from "react-icons/ai";
import Link from 'next/link';
import 'react-icons'
function getStatusColor(status) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500'; // Apply yellow color
    case 'completed':
      return 'bg-green-500'; // Apply green color
    case 'rejected':
      return 'bg-red-500'; // Apply red color
    default:
      return ''; // No specific color class for other statuses
  }
}
const validationSchema = Yup.object({
  state: Yup.string().required('Please select a state') ,
  motif : Yup.string().required()
});
export default function Page() {
  const [approved , setApproved] = useState(false)
  const [filled , setFilled] = useState(false)
  const [isLoadingButton, setLoadingButton] = useState(false) ;
   const [done, setDone] = useState(false)
  const [textAreaHeight, setTextAreaHeight] = useState('auto');

  function handleTextAreaChange(event) {
    const element = event.target;
    setTextAreaHeight(`${element.scrollHeight}px`);
  }


  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get('id');
  const [slider , setSlider] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingPics , setLoadingPics] = useState(true)
  const[records , setRecords] = useState()
  const [pics , setPics] = useState()
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await axios.get("https://server-social-benefits.vercel.app/searchFilter", {
        params: {
          id : id , 
        },
      });
      if(data.records[0].manager_review!='pending'){router.push(`/Manager/D?id=${encodeURIComponent(id)}`)}
      setRecords(data.records);
      setLoading(false);

    }
    fetchData();
  }, [id, router]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProofs = async () => {
      try {
        const response = await axios.get(`https://server-social-benefits.vercel.app/pics/${id}`); // Replace '123' with the actual request_id you want to fetch
        setPics(response.data);
        console.log(response.data)
        setLoadingPics(false)
      } catch (error) {
        console.error('Error fetching proofs:', error);
      }
    };

    fetchProofs();
  }, [id]);


  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    setActiveIndex((activeIndex - 1 + pics.length) % pics.length);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % pics.length);
  };



  if (loading) return <Loading/>
  
 return (
  <div className='flex flex-col items-center w-full justify-center'>
  {slider &&  <div className='absolute  h-screen w-screen top-0 left-0 z-50 '>
     <div className=' h-full relative flex items-center justify-center -full bg-black/80'>
      <AiOutlineClose onClick={()=>{setSlider(false)}} className='w-8 h-8 text-zinc-400 absolute top-16 right-8 sm:top-4 sm:right-16 cursor-pointer ' />
        <div className="relative w-[80%] sm:w-auto sm:h-[95%] aspect-[3/4]">

<AiFillCaretLeft
className='absolute z-10  w-7 sm:w-10 h-7 sm:h-10  sm:-translate-y-[50%] -translate-y-[80%] hover:text-blue-800 left-0  cursor-pointer hover:scale-110  sm:-translate-x-[150%]  text-red-500  top-[50%]'
  onClick={handlePrevClick}
>
  {"<"}
</AiFillCaretLeft>

<AiFillCaretRight 
  className=' absolute z-10  w-7 sm:w-10 h-7 sm:h-10  sm:-translate-y-[50%] -translate-y-[80%] hover:text-blue-800 right-0 cursor-pointer hover:scale-110  sm:translate-x-[150%]  text-red-500  top-[50%]'
  onClick={handleNextClick}
>
  {">"}
</AiFillCaretRight>


{!loadingPics && pics.map((item, index) => (
  <div key={index} className={`flex absolute w-full h-full   flex-row items-end ${
    index === activeIndex ? "opacity-100" : "opacity-0"
  } transition-opacity duration-1000`}>
    <Image 
      fill
      src={item.image_url}
      alt={`Slide ${index}`}
      className= " object-fill "
    />
     </div>
))}




<div className="absolute bottom-2 left-0 right-0 flex justify-center mt-4">

{!loadingPics && pics.map((_, index) => (
  <button
    key={index}
    onClick={() => handleDotClick(index)}
    className={`h-2 w-2  shadow-xl mx-1 rounded-full ${
      index === activeIndex ? "bg-red-500" : "bg-gray-300"
    }`}
  ></button>
))}

</div>



</div>
    </div>
     </div>}
     {done &&
<div className="w-screen absolute top-0 left-0 z-50  bg-blue-900/30  h-screen">
    <div className="h-screen  relative w-screen ">
    <div className='md:w-[30%] w-[80%] rounded-xl overflow-hidden pb-4 absolute bg-white left-1/2 -translate-x-1/2 flex flex-col items-center top-1/2 -translate-y-1/2'>
        <div className='h-3/5 flex items-center justify-center bg-green-500 w-full top-0'>
          <AiOutlineCheckCircle className=' h-[50%] text-white  w-[50%]' />
        </div>
        <p className='font-bold text-2xl mt-2 font-mono  text-neutral-900'>Great!</p>
        <p className='text-sm font-bold w-full px-4 text-center text-zinc-700'>Success! The review was submitted successfully. </p>
        <Link href='/Manager'><button className='flex flex-row whitespace-nowrap items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 mt-4 rounded-full'><AiOutlineCheck className='w-5 text-white h-5'/>Done</button></Link>
      </div>
    </div>

</div>
 }

  <div className='objetdem max-w-[60rem]'>
      <div className='cont1'>
      <div className='flex w-full justify-end'>     <span className={`px-8 text-sm mr-16  animate-bounce rounded-full py-2 text-white ${getStatusColor(records[0].status)}`}>{records[0].status}</span>
</div>
     <h1 className='px-8'>{records[0].about}</h1>
     </div>
     <div className='cont2'>
     <div className='cont5'>
     
     <div className='flex flex-row ml-8 m-4 items-center ' > 
        <div className='w-16 relative h-16 mr-5'><Image className='ring-2 ring-zinc-700 rounded-full  ring-offset-2 rignt' fill src={records[0].profileImageUrl} alt='' /></div>
        
         <div>
         <div className="name">{records[0].name}  </div>
         <div className="job">{records[0].job} </div>
         </div>

          

     </div>  

   </div>
   <h2 className='px-8'>CONTENU :</h2>
      <p className="whitespace-pre-wrap px-8"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
       {records[0].description}</p>
    
       <h2 className='px-8' >PIECE JOINTES :</h2>

<div className='  py-8 w-[80%]  gap-4 sm:gap-auto grid grid-cols-1 sm:grid-cols-4 justify-center items-center'>
 {loadingPics ? <p>Loading ...</p> : pics.map((pic,index)=>{
    return           <div onClick={()=>{setSlider(true) ;setActiveIndex(index)}} key={index} className='pl-8  cursor-pointer'>
<div  className=' w-40  relative   h-40'><Image src={pic.image_url} className='rounded ring-1 ring-offset-[3px] ring-zinc-400' alt='' fill/></div>
     </div>

 })}
   
   
 
</div>
<h2 className='px-8'>Requested Amount :</h2>
      <p className="whitespace-pre-wrap px-8"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
       {records[0].requested_amount.toLocaleString('en-US', { style: 'decimal' })} Da</p>
       <h2 className='px-8'>Service :</h2>
      <p className="whitespace-pre-wrap px-8"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
       {records[0].service_title} </p>
       </div>
       <div className='cont'>
       <h3 className='pl-8'>TRAITEMENT DE LA DEMANDE</h3>
       

       <Formik
  initialValues={{
    state: '' ,motif:'' , amount :''  ,
  }}
  validationSchema={approved ? Yup.object({
    state: Yup.string().required('Please select a state') ,
    amount:Yup.string().required(), 
    motif : Yup.string().required()
  }) :Yup.object({
    state: Yup.string().required('Please select a state') ,
    motif : Yup.string().required(), 
  }) }
  onSubmit={(values, { setSubmitting }) => {
    setLoadingButton(true)
  
    axios
      .post("https://server-social-benefits.vercel.app/reviewRequest", {
      id:id , review : values.state ,frrom:records[0].requestedBy ,  email:localStorage.getItem('id') ,amount:parseInt(values.amount) , motif : values.motif
      })
      .then(async(response) => {
        console.log(response.data);
        if(values.state=='approved'){
        try {
          await axios.post('https://socialbenefitssamir.onrender.com/updateNotifs', {email:'employee5@com' });
          console.log('Notifications updated successfully');
          setLoadingButton(false)
          setDone(true)
        } catch (error) {
          console.error('Error updating notifications:', error);
        }
      }else{
        try {
          await axios.post('https://socialbenefitssamir.onrender.com/updateNotifs', {email:records[0].requestedBy });
          console.log('Notifications updated successfully');
          setLoadingButton(false)
          setDone(true)
        } catch (error) {
          console.error('Error updating notifications:', error);
        }
      }

      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        setLoading(false)
        setLoadingButton(false)
      });
  }}
>
  {({ values , handleBlur ,handleChange}) => (
    <Form id='my-form' className='flex flex-col'>
             <div className='cont4'>

      <div className='cont41'>
        <Field type='radio' onClick={()=>{setApproved(true) , setFilled(true)}} name='state' value="approved" />
        Accepter demande
      </div>
      <div className='cont42'>
        <Field type='radio' onClick={()=>{setApproved(false), setFilled(true)}} name='state' value="rejected" />
        Refuser demande
      </div>
      </div>
      <ErrorMessage name="state" component="span" className="error w-full text-center text-red-500 text-sm font-bold" />
     { approved && <div>
      <h2 className='pl-8'>Request Amount</h2>
      <div className="relative mt-5 ml-2 mr-2 flex w-full flex-col mb-8 col-span-2  ">
      <Field
          className={` peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
          name="amount"
          type="number"
          placeholder="Amount"
          onBlur={handleBlur}
         onChange={handleChange}
         value={values.amount}
        
        />
<label
    
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Amount</label
  >        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="amount" component="span"  />
  </div></div>
  }
     {(approved && filled)&&<h2 className='pl-8'>More Details:</h2> }
     {(!approved && filled)&& <h2 className='pl-8'>Rejection purpose:</h2>}
   { filled && <div className="relative mt-5 mx-4 flex w-[90%] flex-col mb-8   ">
 <Field component="textarea"     style={{ height: textAreaHeight }} onChange={(event) => {handleChange(event);handleTextAreaChange(event); }}   value={values.description}   name="motif"   onBlur={handleBlur} className={`block  pt-1 resize-none   h-auto  w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " />
      <label  className="pl-2  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Aa...</label>
      <ErrorMessage className="text-red-500 w-full ml-8 text-center  text-sm error-message font-bold" name="motif" component="span"/>
  </div>}

    </Form>
  )}
</Formik>

 

    
        
     

       <div className='cont3'>
     <button disabled={isLoadingButton}  form="my-form" type="submit"  className="px-12 py-4 mt-8 bg-red-500 text-white text-sm text-bold rounded">
  
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
      ) : 'Send Review'}
</button>
       </div>
       </div>
        
  </div>
  </div>

 )}
