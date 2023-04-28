import React, { useEffect, useState } from 'react';
import SalesCard from './SalesCard';
import CreateSales from './CreateSales';


const Sales = () => {
    const [sales, setSales] = useState([]);

    async function fetchSalesData() {
        const saleUrl = 'http://localhost:8090/api/sales/';
        const response = await fetch(saleUrl);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }

    useEffect(() => {
        fetchSalesData()
    }, []);

    return (
        <>
        <br />
        <h1 className="text-center">Sales List</h1>
        <br />
            <div className="container mt-4">
                <div className="row justify-content-end text-center">
                    <button type="button" className="btn btn-primary btn-lg btn-block" data-bs-toggle="modal" data-bs-target="#createsale" data-bs-whatever="@mdo">Create a Sale</button>
                </div>
            </div>
            <CreateSales fetchSalesData={fetchSalesData} sales={sales} />

            <div className="container mt-4">
            <div className="row gy-3">
                <SalesCard sales={sales} />
            </div>
            </div>
        </>
    );
}

export default Sales;
