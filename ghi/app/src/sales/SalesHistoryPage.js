import { useEffect, useState } from "react";

const SalesHistory = () => {
    const [salespeople, setSalespeople] = useState([]);
    async function loadSalespeople() {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespersons);
        } else {
            console.error(response)
        }
    }
    const [salesHistory, setSalesHistory] = useState([]);
    async function loadSalesHistory() {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const data = await response.json();
            setSalesHistory(data.sales);
        } else {
            console.error(response)
        }
    }

    useEffect(() => {
        loadSalesHistory();
        loadSalespeople();
    }, []);

    const [salesperson, setSalesperson] = useState('');
    const [saleslist, setSaleslist] = useState([]);
    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
        const filteredList = salesHistory.filter(history => history.salesperson === value)
        setSaleslist(filteredList);
    }

    return (
        <>
        <h1 className="mt-5 text-center"><strong>Salesperson History</strong></h1>
        <br />
        <select value={salesperson} onChange={handleSalespersonChange} id="salesperson" name="salesperson" className="form-select mb-3 mt-0" aria-label=".form-select-lg example">
            <option value="">Choose a salesperson</option>
            {salespeople?.map(salesperson => {
                return <option value={salesperson.employee_id} key={salesperson.employee_id}>{salesperson.first_name} {salesperson.last_name}</option>
            })}
        </select>
        <table className="table table-striped">
        <thead className="table border-dark">
            <tr>
            <th>Salesperson Employee ID</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
            </tr>
        </thead>
        <tbody>
        {saleslist.map(sale => {
                return (
                <tr key={sale.id}>
                    <td>{sale.salesperson}</td>
                    <td>{sale.salesperson_first_name} {sale.salesperson_last_name}</td>
                    <td>{sale.customer} {sale.customer_last_name}</td>
                    <td>{sale.automobile}</td>
                    <td>${sale.price}</td>
                </tr>
                )
            })}
        </tbody>
        </table>
        </>
    )
}
export default SalesHistory;
