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

    const resetForm = () => {
        const form = document.getElementById('createManufacturerForm');
        form.reset();
    }

    useEffect(() => {
        fetchManufacturerData()
    }, []);

    return (
        <>
        <br />
        <h1 className="text-center">Manufacturer's List</h1>
        <br />
        <div className="container mt-4">
            <div className="row justify-content-end text-center">
                <button type="button" className="btn btn-primary btn-lg btn-block" data-bs-toggle="modal" data-bs-target="#createmanufacturer" data-bs-whatever="@mdo">Create a Manufacturer</button>
            </div>
        </div>
        <CreateManufacturer fetchManufacturerData={fetchManufacturerData} manufacturers={manufacturers} resetForm={resetForm} />

        <div className="container mt-4">
        <div className="row gy-3">
            <ManufacturerCard manufacturers={manufacturers} />
        </div>
        </div>
    </>
    );
}

export default Manufacturers;
