'use client'
import React from 'react'
import AccordionItem from './AccordionItem'
import { useState ,useEffect } from "react"




export default function Programs() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('https://server-social-benefits.vercel.app/socialBenefits')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching programs:', error));
  }, []);
  return (
    <div id="programs" className="w-full max-w-[65rem] flex items-center flex-col">
      <p className="text-5xl text-center font-mono mt-20 border-b-2 border-red-600 text-blue-900">Notre Programmes</p>
      <div className="divide-y w-full mt-12">
        {items.map(({  title, description, coverage, needed_proofs }, index) => (
          <AccordionItem key={index} title={title} description={description} coverage={coverage} needed_proofs={needed_proofs}/>
        ))}
      </div>
    </div>
  );
}
