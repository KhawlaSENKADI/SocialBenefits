import { useState } from "react";
import { IoIosArrowDropdown } from 'react-icons/io'
import { CgShapeHexagon } from 'react-icons/cg'
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { FaSpinner } from 'react-icons/fa';
import axios from "axios";
export default function AccordionItem({benefit_id, title, description, coverage, needed_proofs , imageUrl, expired}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  
  
    const yesUpdateExpiration = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`https://server-social-benefits.vercel.app/setExpired/${benefit_id}`, { expired: "yes" });
        console.log(response.data); // Optional: Handle the response data as needed
      } catch (error) {
        console.error(error);
        // Optional: Handle error states or display error messages
      } finally {
       window.location.reload()
        setLoading(false);
      }
    };
  


    const noUpdateExpiration = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`https://server-social-benefits.vercel.app/setExpired/${benefit_id}`, { expired: "no" });
        console.log(response.data); // Optional: Handle the response data as needed
      } catch (error) {
        console.error(error);
        // Optional: Handle error states or display error messages
      } finally {
        window.location.reload()
        setLoading(false);
      }
    };
  
  const handleServiceClick = () => {
    setShowModal(true);
    console.log(benefit_id)
    console.log("selected service : ", title )
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="border-b px-4 z-50  w-full max-w-[65rem]">
      <div className="w-full py-2 text-left focus:outline-none">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center flex-row">
          <p className="text-xl overflow-hidden text-ellipsis  cursor-pointer max-w-[50%] truncate  text-[#2C435A]" onClick={handleServiceClick}>
            {title} : 
          </p>
          {expired=='yes' && <div className="rounded w-min px-2 ml-4 h-min animate-pulse bg-red-500 font-bold text-white text-[10px]">Expired</div>}
          </div>
        
          <IoIosArrowDropdown
            onClick={() => setIsOpen(!isOpen)}
            className={`w-6 h-6  transition-transform cursor-pointer text-red-500 ${
              isOpen ? "transform duration-500 rotate-180" : "duration-500"
            }`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all max-h-0 ${
          isOpen ? "max-h-40 duration-1000 ease-out" : " ease-in"
        }`}
      >
        <div className="py-2 flex flex-col w-full  text-gray-500">
          <div className="flex items-center  flex-row w-full">
            <CgShapeHexagon className="text-red-500 mr-1" />
            <p className="whitespace-nowrap text-red-500 font-bold"> Description : &nbsp;</p>
            <p className="truncate w-full"> {description}</p>
          </div>
          <div className="flex items-center  flex-row w-full">
            <CgShapeHexagon className="text-red-500 mr-1" />
            <p className="whitespace-nowrap text-red-500 font-bold"> Couverture : &nbsp;</p>
            <p className="truncate w-full"> {coverage}</p>
          </div>
          <div className="flex items-center  flex-row w-full">
            <CgShapeHexagon className="text-red-500 mr-1" />
            <p className="whitespace-nowrap text-red-500 font-bold"> Papiers Demandés : &nbsp;</p>
            <p className="truncate w-full"> {needed_proofs}</p>
          </div>
        </div>



      </div>

      {showModal && (
        
        <div className="fixed inset-0 z-50 rounded  flex justify-center overflow-hidden items-center bg-gray-800 bg-opacity-50">
        <div className="overflow-hidden w-[70%] max-h-[30rem] h-full   rounded"> 
          <div className="bg-white  text-[20px]  max-h-[30rem] overflow-y-scroll  flex flex-col p-10  rounded-[10px]">
          <p className="text-xl cursor-pointer w-[90%] font-bold text-[#2C435A]" onClick={handleServiceClick}>
            {title} :
          </p>
          <div className="py-2 flex flex-col w-full text-gray-500">
  <div className="flex items-start w-full my-6">
    <CgShapeHexagon className="text-red-500 mr-1" />
    <p className="whitespace-nowrap text-red-500 font-bold">Description : &nbsp;</p>
    <p className="w-full">{description}</p>
  </div>
  <div className="flex items-start w-full my-6"> 
    <CgShapeHexagon className="text-red-500 mr-1" />
    <p className="whitespace-nowrap text-red-500 font-bold">Couverture : &nbsp;</p>
    <p className="w-full">{coverage}</p>
  </div>
  <div className="flex items-start w-full my-6"> 
    <CgShapeHexagon className="text-red-500 mr-1" />
    <p className="whitespace-nowrap text-red-500 font-bold">Papiers Demandés : &nbsp;</p>
    <p className="w-full">{needed_proofs}</p>
  </div>
</div>
<Link legacyBehavior href={imageUrl} passHref>
  <a target="_blank" rel="noopener noreferrer">
    <div className="w-40 shadow ring-[2px] ring-zinc-400 hover:ring-blue-500 hover:ring-[3px] cursor-pointer overflow-hidden rounded h-40 relative">
      <Image className="p-2" fill src={imageUrl} alt="" />
    </div>
  </a>
</Link> 
<div className="flex justify-end mt-4"> {/* Add mt-4 class */}


{expired=='no' ? <button    
                onClick={()=>{yesUpdateExpiration()}}
                className="text-[16px] mr-4 w-[140px] h-[45px] flex justify-center items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 rounded-[10px]"
              >
             {loading ? <FaSpinner className="spin" /> : 'suspend'}
              </button> :
              
              <button    
              onClick={()=>{noUpdateExpiration()}}
                            className="text-[16px] mr-4 w-[140px] h-[45px] flex justify-center items-center bg-green-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 rounded-[10px]"
            >
             {loading ? <FaSpinner className="spin" /> : 'resume'}
            </button>}


<button
                onClick={handleCloseModal}
                className="text-[16px] w-[140px] h-[45px] flex justify-center items-center bg-white px-4 py-2 text-red-500 border border-red-500 font-bold text-sm gap-1 hover:scale-110 mr-5 rounded-[10px]"
              >
                Fermer
              </button>

            
      </div>

          </div></div>
     
        </div>
      )}
    </div>
  );
}
