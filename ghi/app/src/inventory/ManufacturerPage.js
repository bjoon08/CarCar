import React, { useEffect, useState } from 'react';
import ManufacturerCard from './ManufacturerCard';
import CreateManufacturer from './CreateManufacturer';

const Manufacturers = () => {
    const [manufacturers, setManufacturers] = useState([]);

    async function fetchManufacturerData() {
        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(manufacturersUrl);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchManufacturerData()
    }, []);

    return (
        <>
        <br />
        <div className="container" >
            <div className="row justify-content-end">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createmanufacturer" data-bs-whatever="@mdo">Create a Manufacturer</button>
            </div>
        </div>
        <CreateManufacturer fetchManufacturerData={fetchManufacturerData} manufacturers={manufacturers} />

        <div className="row gy-3">
            <ManufacturerCard manufacturers={manufacturers} />
        </div>
    </>
    );
}

export default Manufacturers;
