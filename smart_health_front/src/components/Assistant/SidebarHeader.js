import React from "react";
function SidebarHeader() {
  return (
    <div className="SidebarHeader flex-one flex justify-between items-center pr-4">
      <div className="flex justify-center align-middle ">
        <img
          src="https://thumbs.dreamstime.com/b/meta-ball-icon-vector-design-template-190394869.jpg"
          alt="logo"
          className="logo w-12 h-12"
        />
        <div className="title">
          <h3 className="font-black font text-lg">Zendenta</h3>
          <p className="xxsmall text-gray-400">Lorem ipsum dolor sit.</p>
        </div>
      </div>
    </div>
  );
}

export default SidebarHeader;