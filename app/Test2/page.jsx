'use client'
import { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {RiImageAddFill} from 'react-icons/ri'
import Image from "next/image";
import {IoIosArrowDropdown} from 'react-icons/io'

import axios from "axios";
import { FcRemoveImage} from "react-icons/fc";
import { Menu } from "@headlessui/react";



export default function Page() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-screenitems-center justify-center h-screen">
  <div onMouseLeave={()=>setIsOpen(false)} className="relative flex flex-col  ml-40">
    <button
      className="w-min aspect-square bg-transparent"
      onMouseEnter={() => setIsOpen(true)}>
     <IoIosArrowDropdown className="w-8 text-blue-900 h-8"/>
    </button>

    {isOpen && (
      <div className="transition duration-500 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <Menu>

         
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } block px-4 py-2 text-sm`}
              >
                Item 1
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } block px-4 py-2 text-sm`}
              >
                Item 2
              </a>
            )}
          </Menu.Item>
          </Menu>
        </div>
      </div>
    )}
  </div>
    </div>

  



  );
};
