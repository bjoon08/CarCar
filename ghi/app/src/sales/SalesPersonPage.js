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
            console.log(data, "----");
        }
        console.log(response);
    }

    useEffect(() => {
        fetchSalesPeopleData()
    }, []);

    return (
        <>
        <br />
            <div className="container" >
                <div className="row justify-content-end">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createsalesperson" data-bs-whatever="@mdo">Create a Sales Person</button>
                </div>
            </div>
            <CreateSalesPerson fetchSalesPeopleData={fetchSalesPeopleData} salespeople={salespeople} />

            <div className="row gy-3">
                <SalesPersonCard salespeople={salespeople} />
            </div>
        </>
    );
}

export default SalesPeople;
