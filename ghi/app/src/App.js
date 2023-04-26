import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Manufacturers from './inventory/ManufacturerPage';
import AutomobilesList from './inventory/Automobiles';
import VehicleModels from './inventory/VehicleModelPage';
import CreateAuto from './inventory/AutoCreate';
import TechnicianList from './services/Technicians';


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
          <Route path="auto/new/" element={<CreateAuto />} />
          <Route path="technicians/" element={<TechnicianList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
