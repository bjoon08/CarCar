import React, { useEffect, useState } from 'react';
import CreateVehicleModel from './CreateVehicleModel';
import VehicleModelCard from './VehicleModelCard';

const VehicleModels = () => {
    const [manufacturers, setManufacturers] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]);

    async function fetchVehicleModelData() {
        const vehicleUrl = 'http://localhost:8100/api/models/';
        const response = await fetch(vehicleUrl);
        if (response.ok) {
            const data = await response.json();
            setVehicleModels(data.models);
            console.log(data, "----");
        }
    }

    async function fetchManufacturerData() {
        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(manufacturersUrl);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchVehicleModelData()
        fetchManufacturerData()
    }, []);

    return (
        <>
        <br />
        <div className="container" >
            <div className="row justify-content-end">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createvehiclemodel" data-bs-whatever="@mdo">Create a Model</button>
            </div>
        </div>
        <CreateVehicleModel fetchVehicleModelData={fetchVehicleModelData} vehicleModels={vehicleModels} />

        <div className="row gy-3">
            <VehicleModelCard vehicleModels={vehicleModels} manufacturers={manufacturers} />
        </div>
    </>
    );
}

export default VehicleModels;

