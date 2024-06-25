'use client'
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";

function getStatusColor(action) {
  switch (action) {
    case "Ajout":
      return "text-green-500"; 
    case "Retrait":
      return "text-red-500"; 
    default:
      return "";
  }
}

export default function Page() {

  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState({ currentPage: 1 });
  const [loading, setLoading] = useState(false);

  const records = [
    {
      id: 1,
      about: "Service 1",
      action: "Ajout",
      amount:"1000",
      createdAt: "2023-05-20",
      AccomplishedBy: "John Doe",
      profileImageUrl: "/image.jpg",
    },
    {
      id: 2,
      about: "Service 2",
      action: "Retrait",
      amount:"1000",
      createdAt: "2023-05-19",
      AccomplishedBy: "Jane Smith",
      profileImageUrl: "/image.jpg",
    },
    {
      id: 1,
      about: "Service 1",
      action: "Ajout",
      amount:"1000",
      createdAt: "2023-05-20",
      AccomplishedBy: "John Doe",
      profileImageUrl: "/image.jpg",
    },
    {
      id: 2,
      about: "Service 2",
      action: "Retrait",
      amount:"1000",
      createdAt: "2023-05-19",
      AccomplishedBy: "Jane Smith",
      profileImageUrl: "/image.jpg",
    },
    {
      id: 1,
      about: "Service 1",
      action: "Ajout",
      amount:"1000",
      createdAt: "2023-05-20",
      AccomplishedBy: "John Doe",
      profileImageUrl: "/image.jpg",
    },
    {
      id: 2,
      about: "Service 2",
      action: "Retrait",
      amount:"1000",
      createdAt: "2023-05-19",
      AccomplishedBy: "Jane Smith",
      profileImageUrl: "/image.jpg",
    },
    
  ];

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handlePageClick(data) {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: data.selected + 1,
    }));
  }

  return (
    <div className="w-[95%] ">

<div className="flex items-center">
  <p className="text-6xl font-bold text-[#0B59A1] mt-16 ml-5">Transactions :</p>
  <div className="relative h-full w-[50%] max-w-[50rem] ml-[6%] mt-[7%]">
    <input
      type="text"
      id="search"
      name="search"
      className="w-full border-gray-300 rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:border-[1px] focus:outline-none "
      placeholder="Search transactions"
      value={query}
      onChange={handleInputChange}
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiSearch className="h-5 w-5 text-gray-400" />
    </div>
  </div>
</div>


      <div className="flex bg-white/95 z-10 items-cener px-4 pt-4 mx-4 py-2 border-b-[1px] border-p-8 border-[#2C435A] w-full sticky mt-[4%]">
        <p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold  text-[#2C435A] ">#</p>
        <p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Service</p>
        <p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Action</p>
        <p className="md:w-[30%] w-[50%]  cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Montant</p>
        <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold  text-[#2C435A]  ml-2">Date</p>
      </div>

      <div className="flex flex-col w-full  ">
        {loading && (
          <div className="w-full h-16 rounded-lg px-4 mx-4 relative mt-1 items-center flex justify-center">
            <p>Loading...</p>
          </div>
        )}
        {!loading &&
          records.map((transaction, index) => (
            <div
              key={index}
             /* onClick={() => {
                if (transaction.action !== "pending") {
                  router.push(`/Manager/D?id=${encodeURIComponent(transaction.id)}`);
                } else if (transaction.AccomplishedBy === localStorage.getItem("id")) {
                  router.push(`/Manager/Ma?id=${encodeURIComponent(transaction.id)}`);
                } else {
                  router.push(`/Manager/A?id=${encodeURIComponent(transaction.id)}`);
                }
              }} */
              className="w-full cursor-pointer h-16 rounded-lg hover:bg-blue-200 hover:scale-[101%] mb-1 px-4 mx-4 relative mt-1 items-center flex "
            >
              <p className="md:w-[3%] w-[5%] cursor-default text-sm font-bold text-[#2C435A] ">
                {" "}
                {index + 1 + (pagination.currentPage - 1) * 10}
              </p>
              <p className="md:w-[30%] w-[50%] cursor-default text-sm font-bold text-[#2C435A] ml-2">{transaction.about}</p>
              <p className={`md:w-[30%] w-[50%] cursor-default text-sm font-bold ${getStatusColor(transaction.action)} ml-2`}> {transaction.action} {} {transaction.action=='Ajout' ? '++' : '--'} </p>
              <p className={`md:w-[30%] w-[50%] cursor-default text-sm font-bold } ml-2 text-[#2C435A] `}> {transaction.amount} DA </p>
              <p className={`md:w-[30%] w-[50%] cursor-default text-sm font-bold ml-2`}>
                <span className="text-xs text-[#2C435A]">
                   {new Date(transaction.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </p>
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
  );
}
