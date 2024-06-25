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
import { useSearchParams } from 'next/navigation';


export default function Page() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [loading, setLoading] = useState(true);
    const [done ,setDone] = useState(false) ;
    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const id = searchParams.get('id');
    const service = searchParams.get('service');


const [isLoadingButton, setLoadingButton] = useState(false) ;
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true)
            try{
          const response = await axios.get('https://server-social-benefits.vercel.app/socialBenefits2');
          setItems(response.data);
        }catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchItems();
      }, []);
      

      const [textAreaHeight, setTextAreaHeight] = useState('auto');

      function handleTextAreaChange(event) {
        const element = event.target;
        setTextAreaHeight(`${element.scrollHeight}px`);
      }
    


  if(loading) return   <div>Loading...</div>

  return (






    <div className=" flex justify-center items-center p-8  md:py-16   flex-col  ">



{done &&
<div className="w-screen absolute top-0 left-0 z-20  bg-blue-900/30  h-screen">
    <div className="h-screen  relative w-screen ">
    <div className='md:w-[30%] w-[80%] rounded-xl overflow-hidden pb-4 absolute bg-white left-1/2 -translate-x-1/2 flex flex-col items-center top-1/2 -translate-y-1/2'>
        <div className='h-3/5 flex items-center justify-center bg-green-500 w-full top-0'>
          <AiOutlineCheckCircle className=' h-[50%] text-white  w-[50%]' />
        </div>
        <p className='font-bold text-2xl mt-2 font-mono  text-neutral-900'>Great!</p>
        <p className='text-sm font-bold w-full px-4 text-center text-zinc-700'>Your request has been successfully submitted. We will review it and process it as soon as possible. </p>
        <Link href='/Employee'><button className='flex flex-row whitespace-nowrap items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 mt-4 rounded-full'><AiOutlineCheck className='w-5 text-white h-5'/>Done</button></Link>
      </div>
    </div>

</div>
 }






        <div className="border-[3px] w-full   max-w-[50rem] pb-20 md:pb-auto mb-20 relative rounded p-8 border-neutral-300 ">
     <p className="lg:text-6xl text-4xl font-mono font-bold mb-8 text-zinc-700 mt-8 md:ml-5">Ajouter demande :</p>

   <Formik 
    initialValues={{
        images: [],description :  '' ,about : title ,amount:''
      }}
      
      validationSchema={Yup.object({
        images: Yup.array().min(1, "Please select at least one image"),
        about: Yup.string().required(),
        description: Yup.string(),
        amount : Yup.string().required()
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(selectedItem)
        setLoadingButton(true)
        const formData = new FormData();
        for (let i = 0; i < values.images.length; i++) {
          formData.append("pic", values.images[i]);
        }
       formData.append("status", "pending");
       formData.append("requestedBy", localStorage.getItem('id'));
        formData.append("about", values.about);
        formData.append("description",values.description);
        formData.append("service" ,id) ;
        formData.append("service_title" ,service) ;
        formData.append("requested_amount", parseInt(values.amount))
        axios
          .post("https://server-social-benefits.vercel.app/uploadRequest", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then( async(response) => {
            console.log(response.data);
            try {
              await axios.post('https://socialbenefitssamir.onrender.com/updateNotifs', {email:'employee1@com' });
              console.log('Notifications updated successfully');
              setSubmitting(false);
            setLoading(false)
            setLoadingButton(false)
            setDone(true)
            } catch (error) {
              console.error('Error updating notifications:', error);
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
      {({ values,errors, touched , isSubmitting, setFieldValue ,handleBlur ,handleChange }) => (









        <Form id="my-form" className="mb-12  relative gap-2 grid grid-cols-2  " >



<div className="col-span-2  relative mb-3">
  <Field as="select" name="about" 
  disabled
   onChange={(event) => {
    handleChange(event);
    setSelectedItem(items.find((item) => item.benefit_title === event.target.value))
    
     }}
   onBlur={handleBlur} value={values.about} className="block appearance-none w-full text-neutral-400 focus:text-black  duration-500  bg-white border border-gray-400 hover:border-blue-500 py-4 pl-2 rounded   focus:outline-none focus:shadow-outline">
    <option  value="">L'article concerné</option>
  
    {items.map((item ,index) => (
    <option key={index}>
      {item.benefit_title}
    </option>
  ))}
  </Field>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current text-red-500 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
  </div>
  <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="about" component="span" />

      </div>











      <div className="relative mt-5 ml-2 mr-2 flex w-full flex-col mb-8 col-span-2  ">
      <Field
          className={`${touched.email && errors.email ? 'error' : ''} peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-200 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]`}
          name="amount"
          type="number"
          placeholder="Amount"
          onBlur={handleBlur}
         onChange={handleChange}
         value={values.amount}
        
        />
<label
    
    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
    >Montant</label
  >        <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="amount" component="span"  />
  </div>


 <div className="relative mt-5 ml-2 mr-2 flex w-full flex-col mb-8 col-span-2  ">
 <Field component="textarea"     style={{ height: textAreaHeight }} onChange={(event) => {handleChange(event);handleTextAreaChange(event); }}   value={values.description}   name="description"   onBlur={handleBlur} className={`block  pt-1 resize-none  h-auto  w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`} placeholder=" " />
      <label  className="pl-2  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Plus de détails...</label>
      <ErrorMessage className="text-red-500 text-xs error-message font-bold" name="description" component="span"/>
  </div>









<div className="w-full col-span-2 flex flex-col">
    <p className="text-zinc-700 font-bold mb-4 text-xl ml-4">Papiers demandés :</p>
<div className="grid gap-2 ml-6 w-fit grid-cols-2 sm:grid-cols-3">

{values.images && Array.from(values.images).map((image ,index) => (
<div key={index} className="w-20 sm:w-40 shadow ring-zinc-400 ring-2 rounded overflow-hidden md:h-40 relative h-20">
<Image key={image.name} fill src={URL.createObjectURL(image)} alt="selected" className="rounded object-cover" />
<div className="absolute -top-0 -right-0">
        <button type="button" onClick={() => {
          const newImages = [...values.images];
          newImages.splice(index, 1);
          setFieldValue("images", newImages);
        }} >
          <IoMdCloseCircle className="md:w-12 w-8 h-8 md:h-12 text-red-600" />
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
multiple
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
