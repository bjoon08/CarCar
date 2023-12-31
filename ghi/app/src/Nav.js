import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" to="manufacturers/">Manufacturer List</NavLink>
            </li>
            <li>
              <NavLink className="nav-link active" to="models/">Vehicle Model List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="automobiles/">Automobiles List</NavLink>
            </li>
            <li>
              <NavLink className="nav-link active" to="salespeople/">Sales People</NavLink>
            </li>
            <li>
              <NavLink className="nav-link active" to="customers/">Customer List</NavLink>
            </li>
            <li>
              <NavLink className="nav-link active" to="sales/">Sales List</NavLink>
            </li>
            <li>
              <NavLink className="nav-link active" to="saleshistory/">Salesperson History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="technicians/">Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="appointments/">Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="appointments/history">Service History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
