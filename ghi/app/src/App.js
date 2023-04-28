import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import Manufacturers from './inventory/ManufacturerPage';
import AutomobilesList from './inventory/Automobiles';
import VehicleModels from './inventory/VehicleModelPage';
import CreateAuto from './inventory/AutoCreate';
import SalesPeople from './sales/SalesPersonPage';
import Customer from './sales/CustomerPage';
import Sales from './sales/SalesPage';
import TechnicianList from './services/Technicians';
import AppointmentList from './services/Appointments';
import ServiceHistoryList from './services/ServiceHistory';

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
          <Route path="salespeople/" element={<SalesPeople />} />
          <Route path="customers/" element={<Customer />} />
          <Route path="sales/" element={<Sales />} />
          <Route path="saleshistory/" element={<SalesHistory />} />
          <Route path="technicians/" element={<TechnicianList />} />
          <Route path="appointments/" element={<AppointmentList />} />
          <Route path="appointments/history" element={<ServiceHistoryList />} />
          <Route path="appointments/" element={<AppointmentList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
