import React, { useEffect, useState } from 'react';
import SalesHistoryCard from './SalesHistoryCard';

const SalesHistory = () => {
    const [sales, setSales] = useState([]);
    const [salespeople, setSalesPeople] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState(null);

    async function fetchSalesData(salespersonId) {
        let saleUrl = 'http://localhost:8090/api/sales/';
        if (salespersonId) {
            saleUrl += `?salesperson_id=${salespersonId}`;
        }
        const response = await fetch(saleUrl);
        if (response.ok) {
            const data = await response.json();
            return data.sales;
        }
        return [];
    }

    useEffect(() => {
        async function fetchSalesPeopleData() {
            const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
            const response = await fetch(salespeopleUrl);
            if (response.ok) {
                const data = await response.json();
                setSalesPeople(data.salespersons);
            }
        }

        fetchSalesPeopleData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            let data;

            if (selectedSalesperson) {
                console.log(`Fetching data for salesperson with id: ${selectedSalesperson}`);
                data = await fetchSalesData(selectedSalesperson);
            } else {
                console.log('Fetching data for all salespeople');
                data = await fetchSalesData();
            }

            console.log(`Received data:`, data);
            setSales(data || []);
        }

        fetchData();
    }, [selectedSalesperson]);

    const handleSalespersonChange = (event) => {
        setSelectedSalesperson(event.target.value || null);
    };

    const filteredSales = selectedSalesperson
        ? sales.filter((sale) => sale.salesperson_id === selectedSalesperson)
        : sales;

    return (
        <>
            <br />
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-sm-3">
                        <select
                            className="form-select"
                            value={selectedSalesperson || ''}
                            onChange={handleSalespersonChange}
                        >
                            <option value=''>Select a Salesperson</option>
                            {salespeople.map((salesperson) => (
                                <option key={salesperson.id} value={salesperson.id}>
                                    {`${salesperson.first_name} ${salesperson.last_name}`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="row gy-3">
                {filteredSales?.map((sale) => (
                    <div className="col-4" key={sale.id}>
                        <SalesHistoryCard
                            salesperson={`${sale.salesperson_first_name} ${sale.salesperson_last_name}`}
                            customer={`${sale.customer_first_name} ${sale.customer_last_name}`}
                            automobile={sale.automobile}
                            price={sale.price}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default SalesHistory;
