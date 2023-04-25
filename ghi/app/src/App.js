import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Manufacturers from './inventory/ManufacturerPage';
import AutomobilesList from './inventory/Automobiles';
import VehicleModels from './inventory/VehicleModelPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/" element={<Manufacturers />} />
          <Route path="models/" element={<VehicleModels />} />
          <Route path="automobiles/" element={<AutomobilesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
