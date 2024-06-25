
'use client'
import { useState ,useEffect } from "react"
import {AiFillEdit ,AiFillDelete} from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi';
import Image from "next/image";
import Link from "next/link"
import axios from "axios"
import { useRouter } from 'next/navigation';
import {BsCollectionFill, BsFillCollectionFill  } from 'react-icons/bs'


var queryParams = {
  
};
const fetchAccounts = async (queryParams) => {
  try {
    const response = await axios.get('https://server-social-benefits.vercel.app/accounts', { params: queryParams });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch accounts');
  }
};


export default function Page() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await axios.get(`https://server-social-benefits.vercel.app/searchAccounts?for=${query}`);
        setAccounts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAccounts();
  }, [query]);

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  const [accounts, setAccounts] = useState([]);
   const[menu,setMenu] = useState(false)
   const[choosen,setChoosen] = useState()

  
  return (
    <div className="w-[95%] flex flex-col ">


     <p className="text-6xl font-mono font-bold text-zinc-700 mt-16 ml-5">Employees</p>
     
     <div className="mb-4 mt-4 justify-between flex items-center w-full ">



      <div className="relative h-full w-[90%] sm:w-[30%]">
        <input
          type="text"
          id="search"
          name="search"
          className="w-full  border-gray-300 rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:border-[1px] focus:outline-none "
          placeholder="Search accounts"
          value={query}
          onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
      </div>




      </div>










      
      <div className="flex bg-white/95 z-10 items-cener px-4 pt-4 mx-4 py-2 border-b-[1px]   border-p-8 border-zinc-700 w-full sticky top-0">
<p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold  text-zinc-700 ">#</p>
<p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-zinc-700  ml-2">Name</p>
<p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold  text-zinc-700  ml-2">Profession</p>
<p className="md:w-[30%] hidden md:block  cursor-default text-sm font-bold  text-zinc-700 ml-2">Phone number</p>
      </div>
      <div className="flex flex-col w-full  ">
      {accounts .filter((account) => account.email !== 'admin@com').map((account, index) => (
        <div key={index} onClick={()=>{router.push(`/Manager/EmployeeRequests?id=${encodeURIComponent(account.email)}`);}}    className="w-full  cursor-pointer   rounded-lg hover:bg-blue-200 hover:scale-[101%] mb-1 px-4 mx-4 relative  mt-1 items-center flex ">
              <p  className="md:w-[3%] cursor-pointer   w-[5%]  text-sm font-bold  text-zinc-700 ">{index +1 }</p>
              <div className="md:w-[30%] cursor-pointer  w-[50%] flex items-center  text-sm font-bold relative h-16 text-zinc-700 ml-2"><div className="h-[70%] overflow-hidden mr-2  flex-none relative object-cover rounded-md aspect-square"><Image alt="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" fill className="  mr-2 " src={account.profileImageUrl} /> </div><div className="flex w-full grow  h-full justify-center flex-col "> <p className="text-ellipsis w-[70%] overflow-hidden">{account.name}</p> <p className="text-xs text-zinc-400  text-ellipsis w-[70%] overflow-hidden ">{account.email}</p></div> </div>
              <p className="md:w-[30%] cursor-pointer  w-[50%]  text-sm font-bold  text-zinc-700  ml-2">{account.job}</p>
              <p className="md:w-[30%] cursor-pointer  hidden md:block  text-sm font-bold  text-zinc-700 ml-2">{account.phone}</p>
        
            </div>
            
          ))}

      </div>

      <div className="h-[50rem]"></div>

    </div>
  )
}
