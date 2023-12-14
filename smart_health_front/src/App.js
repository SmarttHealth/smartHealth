import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Inscription from './components/Inscription';
import Home from './components/Home';
import Navbar from './components/Navbar'
import Login from './components/Login';
import Home from './components/home/Home';
import Navbar from './components/home/Navbar';


function App() {
  return (
    <Router>
      <div className="App">
         
       <Navbar/>
        <Navbar/>
        <Routes>
          
       <Route path='/inscription' element={<Inscription/>}/> 
         <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
