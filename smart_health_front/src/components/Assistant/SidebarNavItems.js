import React, { useState } from "react";

function SidebarNavItems({ activeidx, setidx }) {
  return (
    <div className="SidebarNavItems flex-7 ">
      <div
      className='h-12 flex justify-start items-center pl-4 text-base font-semibold gap-4 '
        
        title="Overview"
        idx={1}
        activeidx={activeidx}
        setidx={setidx}
      />
      <div
      className='h-12 flex justify-start items-center pl-4 text-base font-semibold gap-4 '
       
        title="Calendar"
        idx="2"
        activeidx={activeidx}
        setidx={setidx}
      />
      <div
      className='h-12 flex justify-start items-center pl-4 text-base font-semibold gap-4 '
       
        title="Patiant List"
        idx="3"
        activeidx={activeidx}
        setidx={setidx}
      />
      <div
      className='h-12 flex justify-start items-center pl-4 text-base font-semibold gap-4 '
        
        title="Messages"
        idx="4"
        activeidx={activeidx}
        setidx={setidx}
      />
      <div
      className='h-12 flex justify-start items-center pl-4 text-base font-semibold gap-4 '
        
        title="Payment Information"
        idx="5"
        activeidx={activeidx}
        setidx={setidx}
      />
      <div
      className='h-12 flex justify-start items-center pl-4 text-base font-semibold gap-4 '
        
        title="Setting"
        idx="6"
        activeidx={activeidx}
        setidx={setidx}
      />
    </div>
  );
}

export default SidebarNavItems;