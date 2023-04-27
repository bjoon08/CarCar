import React, { useState, useEffect } from 'react';
import CreateAuto from './AutoCreate';

const AutomobilesList =() => {
    const [autos, setAuto] = useState([]);

    async function fetchAutoData() {
        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(autoUrl);
        if (response) {
            const data = await response.json();
            setAuto(data.autos);
        }
    }


    useEffect(() => {
        fetchAutoData();

    }, []);

    return (
        <>
        <br />
        <div className="px-4 py-3 mt-0 text-center big-info">
            <h1 className="display-5 fw-bold">Automobiles</h1>
        </div>
        <div className="container" >
            <div className="row justify-content-end">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createauto" data-bs-whatever="@mdo">Create an Auto</button>
            </div>
        </div>
        <CreateAuto fetchAutoData={fetchAutoData} autos={autos} />
        <table className="table table-striped">
            <thead>
            <tr>
                <th>VIN</th>
                <th>Color</th>
                <th>Year</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Sold</th>
            </tr>
            </thead>
            <tbody>
                {autos?.map(auto => {
                    return (
                    <tr key={auto.id}>
                        <td>{ auto.vin }</td>
                        <td>{ auto.color }</td>
                        <td>{ auto.year }</td>
                        <td>{ auto.model.name }</td>
                        <td>{ auto.model.manufacturer.name }</td>
                        <td>{ auto.sold ? "Yes": "No"}</td>
                    </tr>
                    );
                },
                )}
            </tbody>
        </table>
        </>
    );
}

export default AutomobilesList;
