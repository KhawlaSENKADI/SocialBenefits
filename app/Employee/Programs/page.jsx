'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import AccordionItem_Employee from '@/components/AccordionItem_Employee';

export default function Page() {
  const [items, setItems] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [chapterNames, setChapterNames] = useState([]);

  useEffect(() => {
    fetch('https://server-social-benefits.vercel.app/socialBenefits2')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        const uniqueChapters = [...new Set(data.map(item => item.title))];
        setChapters(uniqueChapters);
        console.log('Fetched programs:', data);
      })
      .catch(error => console.error('Error fetching programs:', error));
  }, []);

  useEffect(() => {
    setChapterNames([...new Set(items.map(item => item.title))]);
  }, [items]);

  return (
    <div className='w-full  flex justify-center items-center'> 
  <div className="divide-y  mb-20 mt-12">
      {chapters.map((chapter, index) => (
        <div key={index}>
          <p className="text-xl font-bold mt-10 mb-6 text-[#0B59A1]">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            {chapter}
          </p>
          {items
            .filter(item => item.title === chapter) // Filter items by chapter name
            .map(({service,title ,  benefit_title, description, coverage, needed_proofs, imageUrl }, index) => (
              <AccordionItem_Employee
                key={index}
                service={service}
                service_title={title}
                title={benefit_title}
                description={description}
                coverage={coverage}
                needed_proofs={needed_proofs}
                imageUrl={imageUrl}
              />
            ))}
        </div>
      ))}
    </div>
    </div>
  
  );
}
