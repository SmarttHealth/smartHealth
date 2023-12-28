import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from "react-scroll";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import logo from "../images/logo.png"
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
    const [showNavItems, setShowNavItems] = useState(true);
  const [isSignIn, setIsSignIn] = useState(true);
  const [userData, setUserData] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is on the login or inscription page
    const isLoginPage = location.pathname === '/login';
    const isInscriptionPage = location.pathname === '/inscription';

    // Hide nav items when on login or inscription page
    setShowNavItems(!(isLoginPage || isInscriptionPage));
    // Récupérer userData depuis le localStorage
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    console.log("user connecter: ",storedUserData)
    setUserData(storedUserData);
  }, [location.pathname]);

  const toggleNavItems = () => {
    setIsSignIn(!isSignIn);
    const destination = isSignIn ? '/login' : '/inscription';
    navigate(destination);
  };

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };
  const openDropdown = () => {
    setDropdown(!dropdown);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('statusCode');

    setUserData(null);
    navigate('/login');
    // Fermez le formulaire
    closeForm();
  };

  const handleProfile = () => {
    // Ajoutez votre logique pour afficher le profil de l'utilisateur
    // Peut-être une nouvelle page de profil ou un panneau latéral, selon votre conception
    // ...
  };

  return (
    <div className="fixed w-full z-10 text-blue">
      <div>
        <div className=" flex flex-row justify-between p-2 md:px-32 px-5 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className=" flex flex-row items-center cursor-pointer">
          <img src={logo} alt="Logo" className="w-16 h-16 mr-2" />
            <Link to="home" spy={true} smooth={true} duration={500}>
            
              <h1 className=" text-2xl font-semibold ">Smart Health</h1>
            </Link>

          </div>
          {showNavItems && (
          <nav className=" hidden lg:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              About Us
            </Link>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Services
            </Link>
            <Link
              to="doctors"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Doctors
            </Link>
            <Link
              to="blog"
              spy={true}
              smooth={true}
              duration={500}
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Blog
            </Link>
          </nav>
      )}
          {userData ? (
            <div className="flex items-center space-x-4">
              <div className="cursor-pointer" onClick={openDropdown}>
                  <AiOutlineUser size={24} />
                </div>
              <span className="text-gray-600">{`${userData.firstName} ${userData.lastName}`}</span>
              <button
                className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
                onClick={openForm}
              >
                Contact Us
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={toggleNavItems} 
              className="text-white bg-[#4d9bba]  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-3 h-12  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isSignIn ?'Sign In':'Sign Up'}
            </button>
          )}

          <div className=" lg:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>
        <div className={`absolute top-14 right-25 px-25 ${dropdown ? 'block' : 'hidden'}`}>
          <div className="bg-white border rounded-md shadow-md p-2 text-blue-700">
            <div className="cursor-pointer" onClick={handleLogout}>
              <AiOutlineLogout size={20} className="mr-2" />
              Logout
            </div>
            <div className="cursor-pointer" onClick={handleProfile}>
              <AiOutlineUser size={20} className="mr-2" />
              Profile
            </div>
          </div>
          </div>
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-[#4d9bba] text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            to="services"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Services
          </Link>
          <Link
            to="doctors"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Doctors
          </Link>
          <Link
            to="blog"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Blog
          </Link>
          <Link
            to="blog"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Contact Us 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

