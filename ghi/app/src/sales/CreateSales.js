import { useEffect, useState } from "react";

const CreateSales = () => {
    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }

    const [automobiles, setAutomobiles] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const handleAutomobileChange = (event) => {
        setAutomobile(event.target.value);
    }

    const [salespersons, setSalespersons] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const handleSalespersonChange = (event) => {
        setSalesperson(event.target.value);
    }

    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState('');
    const handleCustomerChange = (event) => {
        setCustomer(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.price = price
        // if (automobile) {
        //     data.automobile = automobile;
        // }
        data.automobile = automobile
        data.salesperson = salesperson
        data.customer = customer
        console.log(data)

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfigUrl = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(salesUrl, fetchConfigUrl);

        if (response.ok) {
            const newSalesRecord = await response.json();
            setPrice('');
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
        }
        window.location.reload();
    }

    const fetchAutomobileData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    }

    const fetchSalespersonData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespersons(data.salespersons);
        }
    }

    const fetchCustomerData = async () => {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        fetchAutomobileData();
        fetchSalespersonData();
        fetchCustomerData();
    }, []);

    return (
        <div className="modal fade" id="createsale" tabIndex="-1" aria-labelledby="createsaleLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="createsaleLabel">Record a new sale</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="automobile" className="col-form-label"><strong>Automobile VIN:</strong></label>
                    <select value={automobile} onChange={handleAutomobileChange} className="form-select" aria-label="Default select example">
                        <option value="">Select a VIN</option>
                        {automobiles?.map(automobile => {
                        return (
                            <option value={automobile.vin} key={automobile.id}>{automobile.vin}</option>
                        )
                        })}
                    </select>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="salesperson" className="col-form-label"><strong>Salesperson:</strong></label>
                    <select value={salesperson} onChange={handleSalespersonChange} className="form-select" aria-label="Default select example">
                        <option value="">Select a Salesperson</option>
                        {salespersons?.map(salesperson => {
                        return (
                            <option value={salesperson.employee_id} key={salesperson.id}>{salesperson.employee_id}</option>
                        )
                        })}
                    </select>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="automobile" className="col-form-label"><strong>Customer:</strong></label>
                    <select value={customer} onChange={handleCustomerChange} className="form-select" aria-label="Default select example">
                        <option value="">Select a Customer</option>
                        {customers?.map(customer => {
                        return (
                            <option value={customer.first_name} key={customer.id}>{customer.first_name}</option>
                        )
                        })}
                    </select>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="price" className="col-form-label"><strong>Price</strong></label>
                    <input value={price} onChange={handlePriceChange} type="text" className="form-control" id="price" />
                    </div>
                    <div className="modal-footer">
                    <button data-bs-dismiss="modal" type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    );
}

export default CreateSales;
