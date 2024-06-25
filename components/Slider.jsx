'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

const Slider = () => {
  const [ads, setAds] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("https://server-social-benefits.vercel.app/announcements")
      .then((response) => response.json())
      .then((data) => {
        setAds(data);
      })
      .catch((error) => {
        console.log("Error fetching ads:", error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % ads.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, ads]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    setActiveIndex((activeIndex - 1 + ads.length) % ads.length);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % ads.length);
  };

  return (
    <div id="ads" className="flex flex-col  w-full items-center">
        <div className="relative mt-10 w-screen max-w-[65rem] aspect-[7/4] sm:aspect-[3/1]">

<IoIosArrowDropleft
className='absolute z-10  w-7 sm:w-10 h-7 sm:h-10  sm:-translate-y-[50%] -translate-y-[80%] hover:text-blue-800 left-0  cursor-pointer hover:scale-110  sm:-translate-x-[150%]  text-red-500  top-[50%]'
  onClick={handlePrevClick}
>
  {"<"}
</IoIosArrowDropleft>

<IoIosArrowDropright 
  className=' absolute z-10  w-7 sm:w-10 h-7 sm:h-10  sm:-translate-y-[50%] -translate-y-[80%] hover:text-blue-800 right-0 cursor-pointer hover:scale-110  sm:translate-x-[150%]  text-red-500  top-[50%]'
  onClick={handleNextClick}
>
  {">"}
</IoIosArrowDropright>


{ads.map((item, index) => (
  <div key={index} className={`flex absolute w-full h-full   flex-row items-end ${
    index === activeIndex ? "opacity-100" : "opacity-0"
  } transition-opacity duration-1000`}>
    <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-transparent to-white z-10'></div>
    <Image 
      fill
      src={item.cover_url}
      alt={`Slide ${index}`}
      className= " object-fill "
    />
    <div className="flex-col ml-4 overflow-hidden relative mb-2 z-10 grow ">
      <p className='text-blue-800 font-mono text-2xl font-bold'>{item.title} </p>
      <p className='truncate w-[100%] '> {item.description}</p>
    </div>
    <button className='z-10 flex-none hover:duration-300 hover:scale-110 hover:bg-blue-800 bg-red-600 text-white rounded py-2 px-4 m-4'>View More</button>
     </div>
))}




<div className="absolute top-0 left-0 right-0 flex justify-center mt-4">

{ads.map((_, index) => (
  <button
    key={index}
    onClick={() => handleDotClick(index)}
    className={`h-3 w-3  shadow-xl mx-1 rounded-full ${
      index === activeIndex ? "bg-red-500" : "bg-gray-300"
    }`}
  ></button>
))}

</div>



</div>
    </div>
    
  
  );
};

export default Slider;

