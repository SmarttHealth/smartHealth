import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Inscription from './components/Inscription';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/inscription' element={<Inscription/>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
