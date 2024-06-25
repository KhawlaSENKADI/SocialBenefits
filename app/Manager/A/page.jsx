'use client'
import { useEffect ,useState } from 'react';
import React from 'react';
import '../../globals.css'
import 'react-icons'
import { useSearchParams } from 'next/navigation';
import axios  from 'axios';
import Image from 'next/image';
import Loading from '@/components/Loading.js';

import { AiFillCaretLeft, AiFillCaretRight , AiOutlineClose } from "react-icons/ai";
import { useRouter } from 'next/navigation';
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

export default function Page() {
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
      setRecords(data.records);
      setLoading(false);

    }
    fetchData();
  }, [id]);

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





  <div className='w-full flex flex-col items-center justify-center '>

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

















    <div className='objetdem max-w-[60rem] '>
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
       {records[0].service_title}</p>
       <div className='cont3'>
     <a onClick={()=>{router.push(`/Manager/TraiterDemande?id=${encodeURIComponent(id)}`);}}className='a2 cursor-pointer'>Traiter la demande</a>
       </div>
         
        </div>
      </div>

  </div>
 

 )}
