import React,{useState} from 'react';
import  axios  from 'axios';
import {useNavigate} from 'react-router-dom'
import hospitalBackground from '../images/bg_login.jpg';
import {login} from './Api'
export default function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await login({ email, password });
      console.log('Response from server:', response.status);
      localStorage.setItem('statusCode', response.status);
      
      //localStorage.setItem('statusCode', response.status);
      localStorage.setItem('user', JSON.stringify(response.data.userData));
      // Navigate based on user role
      switch (response.data.userData.role) {
        case 'Patient':
          navigate('/assistant');
          break;
        case 'Medecin':
          navigate('/medecin');
          break;
        case 'Assistant':
          navigate('/assistant');
          break;
        // Add more cases if needed

        default:
          // Handle unknown role
          break;
      }
  
      // Handle the response, e.g., redirect the user or set authentication state
      console.log(response.data);
  
    } catch (error) {
        localStorage.setItem('statusCode', error.response?.status || 500);

      // Handle errors, e.g., show an error message to the user
      console.error('Login failed', error);
    }
  };
  
    return (
        <div 
    style={{
      backgroundImage: `url(${hospitalBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
     
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="container mx-auto">
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="lg:w-5/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-md bg-white bg-opacity-50 my-20 rounded-md mx-auto">
          <div className="pb-5">
                <h1 className="text-3xl font-semibold text-center text-black-500  uppercase decoration-wavy">
                   Sign in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm text-left font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full lg:w-full px-20 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm text-left font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full lg:w-full px-5 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    
                    <div className="mt-6">
                        <button
                        onClick={handleLogin}
                         className="w-full px-2 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-white hover:text-red-500">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/inscription"
                        className="font-medium text-black-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}