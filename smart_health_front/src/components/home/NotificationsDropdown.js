import React, { useState } from "react";
import { Link } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import Contact from "./Contact";
import logo from "../../images/logoss.PNG";

const NotificationsDropdown = ({ notifications, closeDropdown }) => {
  // Ici, vous pouvez personnaliser le contenu de votre dropdown de notifications
  return (
    <div className="absolute right-0 mt-8 w-48 bg-white border rounded shadow-md">
      <div className="p-2">Notifications:</div>
      {notifications.map((notification, index) => (
        <div key={index} className="p-2 border-t">
          {notification}
        </div>
      ))}
      <div className="p-2 text-center text-blue-500 cursor-pointer" onClick={closeDropdown}>
        Close
      </div>
    </div>
  );
};
export default NotificationsDropdown;