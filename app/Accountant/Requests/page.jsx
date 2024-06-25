
'use client'
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { FiSearch } from 'react-icons/fi';
import Image from "next/image";
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('apexcharts'), { ssr: false });
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import Loading from '@/components/Loading.js';
import Transactions from '@/components/transactions';



export default function Page() {

  const [activeTab, setActiveTab] = useState('tab-demandes');
  
  function toggleTab(event, tabId) {
  
    setActiveTab(tabId);
  
    const tabButtons = document.querySelectorAll('[role="tab"]');
    const tabContents = document.querySelectorAll('.tab-content');
  
    tabContents.forEach((tabContent) => {
      tabContent.classList.add('hidden');
    });
  
    tabButtons.forEach((tabButton) => {
      tabButton.setAttribute('aria-selected', 'false');
    });
  
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
      selectedTab.classList.remove('hidden');
    }
    event.currentTarget.setAttribute('aria-selected', 'true');
  }
  
  function getStatusColor(status) {
    switch (status) {
      case 'pending':
        return 'text-yellow-500'; // Apply yellow color
      case 'completed':
        return 'text-green-500'; // Apply green color
      case 'rejected':
        return 'text-red-500'; // Apply red color
      case 'archive':
        return 'text-blue-500';
      default:
        return ''; // No specific color class for other statuses
    }
  }
  
  //fcts des charts 
  
  const chartRef = useRef(null);
  
  const [chartData, setChartData] = useState([
    {
      name: 'Dépenses',
      data: [0, 200, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0]
    }
  ]);
  
  const [chartLabels, setChartLabels] = useState([]);
  const [chartValues, setChartValues] = useState([null]);
  const [chartTotal, setChartTotal] = useState(0);
  const [chartLoading, setChartLoading] = useState(true);
  
  const router = useRouter();
  
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      setChartLoading(true);
      setLoading(true);
      const { data } = await axios.get("https://server-social-benefits.vercel.app/searchFilter", {
        params: {
          for: query,
          manager_review: 'approved',
          page: pagination.currentPage || 1,
          limit: 10,
        },
      });
    
      const currentYear = new Date().getFullYear();
      const approvedRequests = data.records.filter((request) => {
        
        const isApproved = request.status === 'completed';
        const isCurrentYear = new Date(request.completedAt).getFullYear() === currentYear;
        
        return isApproved && isCurrentYear;
      });
      
      console.log(approvedRequests);
  
      const totalAmount = approvedRequests.reduce(
        (sum, request) => sum + parseFloat(request.amount), 0);
  
      setChartTotal(totalAmount);
  
  
      const months = Array.from({ length: 12 }, (_, index) => index + 1);
      const monthlyAmounts = months.map((month) => {
        const amountForMonth = approvedRequests
          .filter((request) => new Date(request.completedAt).getMonth() === month - 1)
          .reduce((sum, request) => sum + parseFloat(request.amount), 0);
        return amountForMonth;
      });
      setChartData([
        {
          name: 'Dépenses',
          data: monthlyAmounts,
        },
      ]);
  
      setRecords(data.records);
      setPagination(data.infos);
      setLoading(false);
      const uniqueTitles = [...new Set(approvedRequests.map((request) => request.service_title))];
      setChartLabels(uniqueTitles);
  
      const chartValues = uniqueTitles.map((title) => {
        const requestsForTitle = data.records.filter((request) => request.service_title === title);
        const totalAmount = requestsForTitle.reduce((sum, request) => sum + parseFloat(request.amount), 0);
        const percentage = chartTotal !== 0 ? Math.floor((totalAmount / chartTotal) * 100) : 0;
        return percentage;
      });
      setChartValues(chartValues);
      setChartLoading(false);
    }
  
    fetchData();
  }, [query, pagination.currentPage ,chartTotal]);
  
  useEffect(() => {
  
   if (!chartLoading){
    const chartOptions = {
      series: chartValues,
      chart: {
        height: 250,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
          },
          dataLabels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '22px',
              fontWeight: 600,
              color: undefined,
              offsetY: 16,
              formatter: (val) => {
                return `${val}%`;
              },
            },
            total: {
              show: true,
              label: 'Dépenses',
              color: '#888',
              formatter: () => {
                return chartTotal.toFixed(2);
              },
            },
          },
        },
      },
      labels: chartLabels,
    };
  
    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, chartOptions);
      //chart.render()
  
      return () => {
        //chart.destroy();
      };
    }
  }
  }, [chartData, chartLabels, chartTotal, chartLoading ,chartValues]);
  
  
  function handleInputChange(event) {
    setQuery(event.target.value);
  }
  
  function handlePageClick(data) {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: data.selected + 1,
    }));
  }
  if(loading) return (<Loading/>)
    return (
  
      <div className='h-full w-full'>
      
  {/*charts and title*/}
  
  <div className="flex flex-col md:flex-row md:space-x-0 h-[40%]">
    <div className="md:w-1/3 ">
      <p className="text-[300%] font-bold text-[#0B59A1] mt-[45%] mb-6 ml-5">Archive:</p>
    </div>
  
  
    <div className="md:w-2/3">
      <div className="mt-[10%]">
        <div className="" id="chartpie" ref={chartRef}></div>
        <h1 className="text-center font-bold text-[#0B59A1]">Statistiques des dépenses</h1>
      </div>
    </div>
    <div className="md:w-full">
      <div className="m-[10%]">
        <ReactApexChart
          type="line"
          series={chartData}
          options={{
            chart: {
              zoom: {
                enabled: false
              }
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            stroke: {
              colors: ['#FF3548']
            },
            yaxis: {
              title: {
                text: 'Dépenses annuelles',
                style:{
                  color:'#0B59A1',
                  fontWeight:'bold',
                  fontSize:'17',
                  cssClass:'font-bold text-[#0B59A1]'
                }
              }
            }
          }}
        />
      </div>
    </div>
  </div>
  
  <hr className='mt-10'/>
  
      <div className=' justify-center mt-12 w-full flex flex-col  '>
  
  <ul className=" flex list-none flex-row flex-wrap border-b-0 pl-0" role="tablist">
          <li
            role="presentation"
            className={`flex-auto text-center ${activeTab === 'tab-demandes' ? 'border-b-2 border-[#0B59A1]' : 'border-b-2 border-gray-300'}`}
          >
            <button
              onClick={(event) => toggleTab(event, 'tab-demandes')}
              className={`text-[20px] font-Bahnschrift font-bold p-[3%] ${
                activeTab === 'tab-demandes' ? 'text-[#0B59A1]' : 'text-gray-500 hover:text-gray-700'
              }`}
              role="tab"
              aria-controls="tab-demandes"
              aria-selected={activeTab === 'tab-demandes'}
            >
              Archive des demandes
            </button>
          </li>
          <li
            role="presentation"
            className={`flex-auto text-center ${activeTab === 'tab-transaction' ? 'border-b-2 border-[#0B59A1]' : 'border-b-2 border-gray-300'}`}
          >
            <button
              onClick={(event) => toggleTab(event, 'tab-transaction')}
              className={`text-[20px] font-Bahnschrift font-bold p-[3%] ${
                activeTab === 'tab-transaction' ? 'text-[#0B59A1]' : 'text-gray-500 hover:text-gray-700'
              }`}
              role="tab"
              aria-controls="tab-transaction"
              aria-selected={activeTab === 'tab-transaction'}
            >
              Archive des transactions
            </button>
          </li>
        </ul>
  
        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg">
  {/*listes des demandes*/}
  
  
  
  
  
  
  <div
      className={` ${
        activeTab === 'tab-demandes' ? 'block' : 'hidden'
      } opacity-100 transition-opacity duration-150 ease-linear`}
      id="tab-demandes"
      role="tabpanel"
      aria-labelledby="tab-demandes"
    >
  
  <div className="justify-center flex items-center">
        <div className="relative h-full w-[80%] max-w-[50rem] mt-[2%]">
          <input
            type="text"
            id="search"
            name="search"
            className="w-full border-gray-300 rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:border-[1px] focus:outline-none"
            placeholder="Recherche..."
            value={query}
            onChange={handleInputChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
  
          <div className="flex bg-white/95 z-10 items-cener px-4 pt-4 mx-4 py-2 border-b-[1px]   border-p-8 border-[#2C435A] w-full sticky top-0">
            <p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold  text-[#2C435A] ">#</p>
            <p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Objet</p>
            <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Status</p>
            <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Montant</p>
            <p className="md:w-[30%] hidden md:block  cursor-default text-sm font-bold  text-[#2C435A] ml-2">Demandé par</p>
          </div>
          <div className="flex flex-col w-full  ">
           
            {!loading && records.map((request, index) => (
              <div key={index} onClick={() => { request.accountant_review == 'pending' ? router.push(`/Accountant/A?id=${encodeURIComponent(request.id)}`) : router.push(`/Accountant/D?id=${encodeURIComponent(request.id)}`) }} className="w-full cursor-pointer h-16 rounded-lg hover:bg-blue-200 hover:scale-[101%] mb-1 px-4 mx-4 relative mt-1 items-center flex ">
                <p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold text-[#2C435A] "> {index + 1 + (pagination.currentPage - 1) * 10}</p>
                <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold text-[#2C435A] ml-2">{request.about}</p>
                <p className={`md:w-[30%] w-[50%] cursor-default text-sm font-bold ml-2 ${getStatusColor(request.status)}`}>{request.status}  <span className="text-xs text-[#2C435A]"> - {new Date(request.completedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span> </p>
                 <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold text-[#2C435A] ml-2">{parseInt(request.amount).toLocaleString('en-US', { style: 'decimal' })}.00 {"  DA"}</p>
                <div className="md:w-[30%] md:flex flex-row hidden items-center justify-start cursor-default text-sm font-bold text-[#2C435A] ml-2"><div className="h-10 aspect-square relative"><Image fill alt='' src={request.profileImageUrl} className="rounded-full flex-none ring-[2px] ring-zinc-500 ring-offset-2 mr-4" /></div><p className="grow ml-4">{request.name}</p></div>
              </div>
            ))}
          </div>
          <div className="w-[95%] mt-10 flex flex-col ">
          <ReactPaginate
             pageCount={pagination.totalPages || 1}
             onPageChange={handlePageClick}
             containerClassName="pagination flex justify-center py-4"
             pageClassName="page-item px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
             activeClassName="active bg-blue-500 text-white"
             previousClassName="page-item px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
             nextClassName="page-item px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
             disabledClassName="disabled"
             previousLabel="Previous"
             nextLabel="Next"
             breakLabel="..."
             breakClassName="page-item px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             initialPage={pagination.currentPage - 1}
          />
        </div>
        </div>
  
  
  
  
  
          </div>
        </div>
  
  <div className={`${
            activeTab === 'tab-transaction' ? 'block' : 'hidden'
          } opacity-100 transition-opacity duration-150 ease-linear px-10`}
          id="tab-transaction"
          role="tabpanel"
          aria-labelledby="tab-transaction" >
  {/*liste des transactions*/}
  
  <Transactions/>
        </div>
  
  
  
  </div>
  </div>
  
  
    )
  }
  
