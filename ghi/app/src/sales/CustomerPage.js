import React, { useEffect, useState } from 'react';
import CustomerCard from './CustomerCard';
import CreateCustomer from './CreateCustomer';


const Customer = () => {
    const [customers, setCustomers] = useState([]);

    async function fetchCustomerData() {
        const customerUrl = 'http://localhost:8090/api/customers/';
        const response = await fetch(customerUrl);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        fetchCustomerData()
    }, []);

    return (
        <>
        <br />
        <h1 className="text-center">Customer List</h1>
        <br />
            <div className="container mt-4">
                <div className="row justify-content-end text-center">
                    <button type="button" className="btn btn-primary btn-lg btn-block" data-bs-toggle="modal" data-bs-target="#createcustomer" data-bs-whatever="@mdo">Create a Customer</button>
                </div>
            </div>
            <CreateCustomer fetchCustomerData={fetchCustomerData} customers={customers} />

            <div className="container mt-4">
            <div className="row gy-3">
                <CustomerCard customers={customers} />
            </div>
            </div>
        </>
    );
}

export default Customer;
