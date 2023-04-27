import React, { useState, useEffect } from 'react';
import CreateTechnician from './CreateTechnician';
import TechnicianCard from './TechnicianCard';

const TechnicianList =() => {
    const [technician, setTechnician] = useState([]);

    async function fetchTechData() {
        const techUrl = 'http://localhost:8080/api/technicians/';
        const response = await fetch(techUrl);
        if (response) {
            const data = await response.json();
            setTechnician(data.technician);
        }
    }

    useEffect(() => {
        fetchTechData();
    }, []);

    return (
        <>
        <br />
            <div className="px-4 py-3 mt-0 text-center big-info">
                <h1 className="display-5 fw-bold">Technicians</h1>
            </div>
            <div className="container" >
                <div className="row justify-content-end">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createtechnician" data-bs-whatever="@mdo">Create a Technician</button>
                </div>
            </div>
            <CreateTechnician fetchTechData={fetchTechData} technician={technician}/>
            <div className="container mt-4">
            <div className="row gy-3">
                <TechnicianCard technician={technician} />
            </div>
            </div>
        </>
    );
}

export default TechnicianList
