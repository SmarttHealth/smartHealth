import React from "react";

const ServicesCard = ({ icon, title, image,description }) => {
  return (
    <div className="group flex flex-col items-center text-left gap-2 w-full lg:w-1/3 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer lg:hover:-translate-y-6 transition duration-300 ease-in-out hover:bg-blue-600">
      <div className=" p-6 rounded-full   transition-colors duration-300 ease-in-out group-hover:bg-[#ade9dc] flex flex-row">
        {icon}
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>
     
      
      <img src={image} alt={title} className="mt-2 max-h-40 object-cover font-medium" />
      <p>
       {description}
      </p>

      <a href="#" class="flex-row items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             {/* <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg> */}
        </a>
    </div>
  );
};

export default ServicesCard;
