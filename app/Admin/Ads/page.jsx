'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { IoIosAddCircle } from 'react-icons/io';
import { Link } from 'react-scroll';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter()
  const [announcements, setAnnouncements] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Add activeIndex state variable
  const handleViewMoreClick = (index) => {
    setActiveIndex(index);
    toggleDialog();
  };
  
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  
  useEffect(() => {
    fetch('https://server-social-benefits.vercel.app/announcements')
      .then(response => response.json())
      .then(data => {
        setAnnouncements(data);
      })
      .catch(error => {
        console.log('Error fetching announcements:', error);
      });
  }, []);

  return (
    <main className="flex flex-col w-full  items-center">
       <IoIosAddCircle onClick={()=>{router.push('/Admin/AddAnnouncement')} }   className=' cursor-pointer absolute bottom-[10%] right-[5%] hover:scale-125 z-50  h-20 w-20 text-green-600' />
      <p className="text-5xl font-mono mt-20 border-b-2 border-red-600 text-blue-900 mb-20">Nos Annonces</p>
      
      <div className={`w-full px-8 sm:px-0 gap-8 max-w-[60rem] grid grid-cols-1 lg:grid-cols-2`}>
        {announcements.map((item, index) => (
          <div
            key={index}
            className={`w-full h-full aspect-[4/5] sm:aspect-[3/1] grid-rows-2  sm:gid-rows-1 grid sm:grid-cols-2  items-center transition-opacity duration-1000 `}
          >
            <div className=" sm:row-span-full row-span-1   h-full w-full relative">
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-transparent to-white z-10"></div>
              <Image
                src={item.cover_url}
                className="object-cover rounded-md"
                fill
                alt=''
              />
            </div>
            <div className=" sm:row-span-full row-span-1  h-full flex flex-col ml-4 w-full">
  <p style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}
  className=" truncate-2-lines w-full overflow-hidden text-blue-800 font-mono text-2xl font-bold">
    {item.title}
  </p>
  <p style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}
     className="truncate-2-lines w-full overflow-hidden text-blue-900">
    {item.description}
  </p>
  <button 
   onClick={() => handleViewMoreClick(index)}
  className="border-[#DC143C] text-[#DC143C] hover:scale-110 hover:bg-[#2c3a51] hover:border-0 hover:text-white text-xs font-bold border-2 rounded-lg py-2 px-4 mt-2">
    View More
  </button>
</div>
 </div>
  ))}
      </div>

      <Modal
  isOpen={isDialogOpen}
  onRequestClose={toggleDialog}
  className="bg-white text-[20px] w-[1200px] h-[700px] flex flex-col justify-center items-center px-2 py-1 rounded-[10px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-red-500"
  contentLabel="Announcement Details"
>
  {activeIndex !== null && announcements.length > activeIndex && (
    <div>
      <div className="flex shadow-md justify-center items-center">
        <div className="w-[470px] h-[230px]  mt-[10px] relative">
          <Image
            src={announcements[activeIndex].cover_url}
            className="object-cover rounded-md"
            fill
            alt=''
          />
        </div>
      </div>
      <h2 className="ml-[20px] mt-[10px] font-bold text-[28px]">
        {announcements[activeIndex].title}
      </h2>
      <p className="ml-[15px] mr-[15px] mt-[20px]">
        {announcements[activeIndex].description}
      </p>

      <div className="flex justify-center mt-4">
        <button className="mr-[60px] text-[16px] w-[140px] h-[45px] flex justify-center items-center border-red-500 bg-white px-4 py-2 text-red-500 border-2 font-bold text-sm gap-1 hover:scale-110 rounded-[10px]">
          Supprimer
        </button>

        <button 
        onClick={toggleDialog}
        className="text-[16px] w-[140px] h-[45px] flex justify-center items-center bg-red-500 px-4 py-2 text-white font-bold text-sm gap-1 hover:scale-110 rounded-[10px]">
          Fermer
        </button>
      </div>
    </div>
  )}
</Modal>



    </main>
  );
}
