import React, { useState, useEffect } from 'react';
import CreateTechnician from './CreateTechnician';

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
            <div className="px-4 py-5 my-5 mt-0 text-center big-info">
                <h1 className="display-5 fw-bold">Technicians</h1>
            </div>
            <div className="container" >
                <div className="row justify-content-end">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createtechnician" data-bs-whatever="@mdo">Create a Technician</button>
                </div>
            </div>
            <CreateTechnician fetchTechData={fetchTechData}  />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {technician?.map(tech => {
                        return (
                        <tr key={tech.id}>
                            <td>{ tech.employee_id }</td>
                            <td>{ tech.first_name }</td>
                            <td>{ tech.last_name }</td>
                        </tr>
                        );
                    },)}
                </tbody>
            </table>
        </>
    );
}

export default TechnicianList
