import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PhotoDetails from './pages/PhotoDetails/PhotoDetails';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/photo/:id' element={<PhotoDetails />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
