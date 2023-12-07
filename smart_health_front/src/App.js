import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Inscription from './components/Inscription';
import Home from './components/Home';
import Navbar from './components/Navbar'
import Login from './components/Login';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/inscription' element={<Inscription/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
