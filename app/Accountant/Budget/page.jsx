'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FiSearch } from 'react-icons/fi';
import Slider from '@/components/Slider'
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading.js';




export default function Page() {
  const [services ,setServices] = useState();
  const[newAmount , setNewAmount] = useState()
  const[loading,setLoading] = useState(true)
  const[loading2,setLoading2] = useState(true)
 const[isLoadingButton, setIsLoadingButton] = useState(false)
    const calculateSum = () => {
      const totalBudget = services?.reduce(
        (acc, line) => acc + parseInt(line.amount),
        0
      );
      return totalBudget
    };


  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axios.get('https://server-social-benefits.vercel.app/services');
        setServices(response.data);
        setLoading(false)
      } catch (error) {
        console.error(error);
       
      }
    }

    fetchServices();
  }, []);

  const [budget, setBudget] = useState(null);

  useEffect(() => {
    async function fetchBudget() {
      try {
        const response = await axios.get('https://server-social-benefits.vercel.app/budget');
        setBudget(response.data.budget);
        setLoading2(false)
      } catch (error) {
        console.error(error);
      }
    }

    fetchBudget();
  }, []);

    const [selectedChapitreID, setSelectedChapitreID] = useState('');
    const [selectedChapitreName, setSelectedChapitreName] = useState('');
    const [somme, setSomme] = useState('');
    const [selectedChapitreBudget, setSelectedChapitreBudget] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (id,title,amount) => {
      setModalOpen(true);
      setSelectedChapitreID(id)
      setSelectedChapitreName(title)
      setSelectedChapitreBudget(amount)
    };
    const closeModal = () => {
      setModalOpen(false);
    };
    

  const lines = [
    {
      ID: "1",
      nom: "Chapitre 01",
      budget: "180000",
      date: "12/12/2012",
    },
    {
      ID: "2",
      nom: "Chapitre 02",
      budget: "180000",
      date: "12/12/2012",
    },
    {
      ID: "3",
      nom: "Chapitre 03",
      budget: "180000",
      date: "12/12/2012",
    },
    {
      ID: "4",
      nom: "Chapitre 04",
      budget: "180000",
      date: "12/12/2012",
    },
    {
      ID: "5",
      nom: "Chapitre 05",
      budget: "180000",
      date: "12/12/2012",
    },
    {
      ID: "6",
      nom: "Chapitre 06",
      budget: "180000",
      date: "12/12/2012",
    },
  ];

  const Line = ({index ,  id ,title, amount, date_modified }) => {
    return (
      <tr>
        <td className="text-[18px] p-3 flex items-center justify-center">
          {index+1}
        </td>
        <td className="text-[18px] p-3">{title}</td>
        <td className="text-[18px] p-3">{amount.toLocaleString('en-US', { style: 'decimal' })}.00 DA</td>
        <td className="text-[18px] p-3 text-center" >{new Date(date_modified).toLocaleString()}</td>
        <td className="p-3">
          <a
            className="gap-8 flex items-center justify-center text-gray-400 hover:text-red-400 mx-2"
            onClick={() => openModal(id, title, amount)}
          >
            <i className="text-[18px] material-icons-outlined cursor-pointer">
            Modifier budget
            </i>
          </a>
        </td>
      </tr>
    );
  };

  
  if(loading||loading2) return(<Loading/>)


  return (
    <div>

     <h1 className="text-[40px] font-Bahnschrift font-bold mt-[10%] ml-[4%] text-[#FF3548]" >Division de budget</h1>

        <div className="w-full flex items-center justify-center overflow-auto lg:overflow-visible pt-[3%]">
          <table className="table text-[#0B59A1] border-separate space-y6 text-sm w-[1000px]">
            <thead className="bg-[#F7F9FC] text-[#0B59A1]">
              <tr>
                <th className=" text-[18px] p-3">#</th>
                <th className=" text-[18px] p-3 text-left">Nom</th>
                <th className="text-[18px] p-3 text-left">Budget</th>
                <th className="text-[18px] p-3 text-center">Dernière modification</th>
                <th className="text-[18px] p-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {services.map((line, index) => (
                <Line key={index} index={index} {...line } />
              ))}
            <tr>
        <td className="text-[18px] mt-20 p-3 flex items-center justify-center"> 
        </td>
        <td className="text-[18px] p-3 font-bold text-[#FF3548]">Total des chapitres :</td>
        <td className="text-[18px] p-3 font-bold"> {calculateSum().toLocaleString('en-US', { style: 'decimal' })}.00 DA</td>
        <td className="p-3">     </td>
      </tr>
            </tbody>
          </table>
        </div>

        <div className="w-full flex items-center justify-center overflow-auto lg:overflow-visible pt-[3%]">
        
         <table className=" text-[18px] table text-[#0B59A1] border-separate space-y6 w-[1000px]">
            <thead className="bg-[#F7F9FC] text-[#0B59A1]">
              <tr>
                <th className="px-16 py-4 text-left text-[18px] w-[55%]">Reste dans la caisse : </th>
                <th className="py-4 text-center text-[18px]">{budget.toLocaleString('en-US', { style: 'decimal' })}.00 Da</th>
              </tr>
            </thead>
          </table>
      </div>

      {modalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg w-[60%] h-[60%]">
        <h1 className="text-[30px] font-Bahnschrift font-bold mt-[4%] ml-[4%] text-[#FF3548]" >Modifier budget </h1>
        
        <div className="mt-[6%]">
        <span className="text-[18px] font-Bahnschrift font-bold mt-[8%] ml-[4%] text-[#0B59A1]" >Chapitre :</span>
        <span className="text-[18px] font-Bahnschrift mt-[8%]  text-[#2C435A] ml-[4%]" >{selectedChapitreName}</span>
        </div>
        <div className="mt-[6%]">
        <span className="text-[18px] font-Bahnschrift font-bold mt-[8%] ml-[4%] text-[#0B59A1]" >Montant  :</span>
        <input defaultValue={selectedChapitreBudget} onChange={(event)=>{setNewAmount(event.target.value); console.log(newAmount)}} type="number" className=" ml-[4%] min-h-[2.5rem] resize-none  z-30 pt-1 w-[50%] text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
        </div>
     
          <button
            className="ml-[14%] mt-[8%] bg-white border border-red-400 text-red-400 py-2 px-4 rounded hover:bg-red-600 hover:text-white "
            onClick={() =>{ 
                setModalOpen(false)
            }}
          >
            Annuler
          </button>

          <button
            className="mt-[8%] ml-[50%] bg-red-400 text-white py-2 px-4 rounded hover:bg-red-600 "
            onClick={async () => {setIsLoadingButton(true) ;
                try {
                    const serviceId = selectedChapitreID; // Replace with the actual service ID
                     const amount = parseInt(newAmount)
                    const response = await axios.post(`https://server-social-benefits.vercel.app/services/${serviceId}`, { amount});
              
                    console.log(response.data); // Handle the response as needed
                    setIsLoadingButton(false)
                    setModalOpen(false)
                   window.location.reload()

                  } catch (error) {
                    console.error(error);
                    // Handle error here
                  }
            }
            }
          >
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
    )}

    </div>
  );
}
