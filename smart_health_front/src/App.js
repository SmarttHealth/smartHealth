import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Inscription from './components/Inscription';
import Home from './components/Home';
import Navbar from './components/Navbar'
import Login from './components/Login';
import Assistant from './components/Assistant/Assistant';
import Patient from './components/patient/Patient';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/inscription' element={<Inscription/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/assistant' element={<Assistant/>}/>
          <Route path='/patient' element={<Patient/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
