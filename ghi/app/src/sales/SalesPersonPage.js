import React, { useEffect, useState } from 'react';
import SalesPersonCard from './SalesPersonCard';
import CreateSalesPerson from './CreateSalesPerson';

const SalesPeople = () => {
    const [salespeople, setSalesPeople] = useState([]);

    async function fetchSalesPeopleData() {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(salespeopleUrl);
        if (response.ok) {
            const data = await response.json();
            setSalesPeople(data.salespersons);
        }
    }

    useEffect(() => {
        fetchSalesPeopleData()
    }, []);

    return (
        <>
        <br />
        <h1 className="text-center">Salespeople List</h1>
        <br />
            <div className="container mt-4">
                <div className="row justify-content-end text-center">
                    <button type="button" className="btn btn-primary btn-lg btn-block" data-bs-toggle="modal" data-bs-target="#createsalesperson" data-bs-whatever="@mdo">Create a Sales Person</button>
                </div>
            </div>
            <CreateSalesPerson fetchSalesPeopleData={fetchSalesPeopleData} salespeople={salespeople} />

            <div className="container mt-4">
            <div className="row gy-3">
                <SalesPersonCard salespeople={salespeople} />
            </div>
            </div>
        </>
    );
}

export default SalesPeople;
