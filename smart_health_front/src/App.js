import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar'

import Assistant from './components/Assistant/Assistant';

import AuthGuard from './components/AuthGuard';
import Inscription from './pages/Inscription'
import Login from './pages/Login';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import Patient from './pages/Patient';
import Medecin from './pages/Medecin';

function App() {
  return (
    <Router>
      <div className="App">
         
      <Navbar/>
   

        <Routes>
       <Route path='/inscription' element={<Inscription/>}/> 
         <Route path='/home' element={<Home/>}/>
         <Route path="/services/:id" element={<ServiceDetails/>} />
         <Route path='/patient1' element={<Patient/>}/> 
          <Route path='/login' element={<Login/>}/>

          <Route path='/assistant' element={
          <AuthGuard>
            <Assistant/>
            </AuthGuard>
          }/>
          <Route path='/patient' element={
          <AuthGuard>
            <Patient/>
            </AuthGuard>
          }/>
          <Route path='/services' element={<ServiceDetails/>}/>
          <Route path='/medecin' element={<Medecin/>}/>
        </Routes>
        
      </div>
    </Router>
    
  );
}

export default App;
