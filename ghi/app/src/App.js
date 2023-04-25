import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Manufacturers from './inventory/ManufacturerPage';
import AutomobilesList from './services/Automobiles';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/" element={<Manufacturers />} />
          <Route path="automobiles/" element={<AutomobilesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
