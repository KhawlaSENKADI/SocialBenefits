
'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose, AiFillFileAdd } from 'react-icons/ai';
import {BsFillPeopleFill ,BsFillCollectionFill ,BsStars, BsStar ,BsFillPersonFill } from 'react-icons/bs'
import {GoSignOut ,GoSettings} from 'react-icons/go'
import { BsBellFill } from 'react-icons/bs';
import { TbFileX ,TbFileCheck} from 'react-icons/tb'
import { MdCollectionsBookmark } from 'react-icons/md';
import Loading from '@/components/Loading.js';

export default function Admin({ children }) {
    const[nav , setNav] = useState(false)
    const [isLoadingButton, setLoadingButton] = useState(false)
    const [notifs , setNotifs] = useState(false)

    const router = useRouter();
  const [isLoading, setLoading] = useState(true)
  const [account, setAccount] = useState(null);
  const[profileImageUrl,setProfileImageUrl]=useState('https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg')
  const[notifNums ,setNotifNums] = useState(0)
  const[loadingNotifs,setLoadingNotifs]=useState(true)
  const [notifications , setNotifications] = useState([])

  ////////protecting Route
  useEffect(() => {
    setLoading(true)
   const token = localStorage.getItem('token');
   const headers = { Authorization: `Bearer ${token}` };
 axios.get('https://server-social-benefits.vercel.app/verify', { headers, withCredentials: true })
     .then((response) => { 
      if(response.data.email==="admin@com") {router.push('/Admin/Employees') }
       else {
      
        
        const role = response.data.account.role;
         console.log(role)
      switch (role) {
        case '0011':
          router.push('/Manager');
          break;
        case '0101':
          router.push('/Funder');
          break;
        case '1001':
          router.push('/Accountant');
          break;
        default:
       setAccount(response.data.account)
        console.log(response.data.account)
        setNotifNums(response.data.account.notifications)
        setLoading(false)     
             break;
      } } 
     })
     .catch((error) => {console.error(error?.response?.data) ; router.push('/')
     });
}, [router]);


const handleClick = async () => {
  try {
    setNotifNums(0)
    await axios.post('https://socialbenefitssamir.onrender.com/updateNotifs', {email:localStorage.getItem('id'),  number: 0 });
    console.log('Notifications updated successfully');
  } catch (error) {
    console.error('Error updating notifications:', error);
  }
};


useEffect(() => {
  // const ws = new WebSocket('wss://socialbenefitssamir.onrender.com');
  const ws = new WebSocket('wss://socialbenefitssamir.onrender.com');
   ws.onopen = () => {
     console.log('WebSocket connection established.');
   };

   ws.onmessage = (event) => {
     const newDecision = JSON.parse(event.data);
     if(newDecision.data.email==localStorage.getItem('id'))
     {console.log(newDecision.data)
      setNotifNums(newDecision.data.number)
    }
   };

   ws.onclose = () => {
     console.log('WebSocket connection closed.');
   };


   return () => {
     ws.close();
   };
 }, []);


 const fetchData = async () => {
  try {
    const response = await axios.get('https://server-social-benefits.vercel.app/notifications', {
      params: {
        forr: localStorage.getItem('id')
      },
    }// Replace with your desired 'forr' value
   );
    setNotifications(response.data);
    setLoadingNotifs(false)
    console.log(response.data)
  } catch (error) {
    console.error('Error retrieving notifications:', error);
  }
};

const handleRefresh = () => {
  fetchData();
};


////////loading state 
    if (isLoading) return <Loading/>

  return (
   
    <section className='flex flex-col    w-full sm:flex-row'>

<div className='  sm:flex-none z-50 sm:w-min relative justify-between py-2 pb-4  sm:pt-4 sm:pb-12 sm:h-screen   overflow-visible flex-row sm:flex-col items-center flex bg-[#2c3a51]'>
    <div className="flex items-center overflow-visible flex-col w-full">





    <div className="flex w-full px-4 mt-4 overflow-visible relative flex-row justify-between">
    <div className='relative overflow-visible ' onClick={()=>{setNotifs(!notifs) ; handleClick() ;handleRefresh()}} >       <BsBellFill  className='w-5 hidden sm:block h-5 cursor-pointer hover:text-neutral-100 hover:scale-125 text-neutral-400' />

{notifNums!=0 && <div className='absolute flex items-center justify-center bottom-[60%] left-[70%] bg-red-600 text-white rounded-full text-xs aspect-square'><p className='text-[12px] mx-[5px]'>{notifNums}</p></div>
}
</div>
{notifs &&
         <div className='absolute   top-full flex flex-col mt-4 ml-4 left-0 w-[30rem] rounded shadow-lg max-h-[50rem] min-h-[20rem] '>
   <div className='relative z-20  bg-[#e8e8e8]'>

  <p  className=" text-zinc-700 font-bold pl-2 font-mono bg-[#f8f8f8]   text-2xl py-2 pr-2">Notifications</p>
   <div className='flex flex-row items-end justify-end  bg-[#f8f8f8] '><p className='text-xs cursor-pointer font-semibold mb-[2px] underline-offset-2 hover:scale-110   underline pr-2 text-blue-600'>See All</p></div>
   <ul className="max-h-64 overflow-y-auto ">
        {notifications.map((notification) => (
          <li onClick={()=>{router.push(`/Employee/D?id=${encodeURIComponent(notification.request_id)}`);setNotifs(false)}} key={notification.id} className=" cursor-pointer hover:bg-[#F0F4F8] hover:scale-[102%] py-2 w-full px-4 flex  flex-col ">
          <p className='text-[10px] flex-none text-zinc-500  text-end w-full'>{new Date(notification.time).toLocaleString(undefined, {year: 'numeric',month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric' ,
  hour12:false
})}</p>
            <div className='w-full  flex '>
            <div className={`w-[10%] ring-2 ring-offset-2 ring-500 aspect-square rounded-full relative ${notification.text === 'We are pleased to inform you that your request has been approved.' ? 'bg-green-500 ring-green-500' : 'bg-red-500 ring-red-500'}`}>{notification.text=='We are pleased to inform you that your request has been approved.' ? <TbFileCheck className='text-white h-full w-full p-[8px]'  />: <TbFileX className='text-white h-full w-full p-[8px]'  />}</div>
              <p className='w-full pl-2 text-sm'>{notification.text}</p>
            </div>
          </li>
        ))}
      </ul>
         </div></div>
}
      <div>
      { nav ? <AiOutlineClose onClick={()=>{setNav(!nav)}} className='w-5  sm:hidden h-5 cursor-pointer hover:text-neutral-100 hover:scale-125 text-neutral-400' />
      : <AiOutlineMenu onClick={()=>{setNav(!nav)}} className='w-5  sm:hidden h-5 cursor-pointer hover:text-neutral-100 hover:scale-125 text-neutral-400' />
  }
        </div>
    <GoSignOut onClick={()=>{ setLoadingButton(true) ; localStorage.removeItem('token') ;localStorage.removeItem('id') ;router.push('/') } } className={`${isLoadingButton && 'hidden'} w-5 cursor-pointer h-5 hover:text-neutral-100 hover:scale-125 text-neutral-400`} />
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
      ) : null}

    </div>













    <div className='hidden  relative overflow-hidden ring-2 ring-zinc-500 sm:block mt-8 rounded-full   hover:scale-110 aspect-square  w-[40%]'>
    <Image fill    className='rounded-full p-1' alt='https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg' src={account.profileImageUrl}/>
    </div> 
    <p className='hidden sm:block font-bold mt-2 text-xl font-mono text-neutral-100'>{account?.name}</p>
    <p className='hidden sm:block font-bold mt-1  text-xs font text-neutral-400'>{account?.job}</p>

 
  <div className="sm:flex hidden   flex-col w-full bg-[#35465e]   mt-4 ">
  <Link href='/Employee/AddRequest'><div className='py-4 hover:bg-[#4b6485] px-2 flex hover:scale-105 gap-2 items-center font-bold text-xs text-neutral-300'><AiFillFileAdd className='h-4 w-4'/> Add a request</div></Link>
  <Link href='/Employee/Requests'><div className='py-4 hover:bg-[#4b6485]  px-2 flex hover:scale-105  gap-2 items-center font-bold text-xs text-neutral-300'><MdCollectionsBookmark className='h-4 w-4'/> Requests</div></Link>
  <Link href='/Employee/Programs'><div className='py-4 hover:bg-[#4b6485]  px-2 flex hover:scale-105 gap-2 items-center font-bold text-xs text-neutral-300'><BsFillCollectionFill className='h-3 w-3'/> Programs</div></Link>

      <Link href='/Employee/Profile'><div className='py-4 hover:bg-[#4b6485] px-2 flex hover:scale-105 gap-2 items-center font-bold text-xs text-neutral-300'><BsFillPersonFill className='h-3 w-3'/>Profile</div></Link>

    </div>







 




   
     
    </div>
    
    <p className='text-2xl hidden sm:block font-mono font-bold mx-[4rem] cursor-default   text-neutral-500  whitespace-nowrap'>ESI SBA.</p>
    </div>









    <div className={ nav ? `flex absolute top-14 sm:hidden animate duration-300   left-0 right-0 z-10 flex-col w-full bg-[#35465e]` : '-translate-y-[200%] flex absolute left-0 right-0 z-10 flex-col w-full bg-[#35465e] animate duration-300'}>
      <Link onClick={()=>{setNav(!nav)}} href='/Employee/AddRequest'><div className='py-4 hover:bg-[#4b6485] px-2 flex hover:scale-105 gap-2 items-center font-bold text-xs text-neutral-300'><AiFillFileAdd className='h-4 w-4'/> Add a request</div></Link>
      <Link onClick={()=>{setNav(!nav)}} href='/Manager/Requests'><div className='py-4 hover:bg-[#4b6485]  px-2 flex hover:scale-105  gap-2 items-center font-bold text-xs text-neutral-300'><BsFillPeopleFill className='h-3 w-3'/> Requests</div></Link>
      <Link onClick={()=>{setNav(!nav)}} href='/Employee/Programs'><div className='py-4 hover:bg-[#4b6485] z-50  px-2 flex hover:scale-105 gap-2 items-center font-bold text-xs text-neutral-300'><BsFillCollectionFill className='h-3 w-3'/> Programs</div></Link>

      <Link onClick={()=>{setNav(!nav)}} href='/Employee/Profile'><div className='py-4 hover:bg-[#4b6485] px-2 z-50 flex hover:scale-105 gap-2 items-center font-bold text-xs text-neutral-300'><BsFillPersonFill className='h-3 w-3'/>Profile</div></Link>

    </div>










































    <section className='sm:grow  sm:w-min   h-screen overflow-hidden'>
    <div onClick={()=>{setNotifs(false)}} className='h-full  w-full overflow-y-auto'>
     {children}
    </div>
    </section>

 
    
  </section>
  
 
  );
}

