import { useEffect, useState } from "react";

const CreateVehicleModel = () => {
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const [picture, setPicture] = useState('');
    const handlePictureChange = (event) => {
        setPicture(event.target.value);
    }
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        setManufacturer(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name
        data.picture_url = picture
        data.manufacturer_id = manufacturer

        const vehicleUrl = 'http://localhost:8100/api/models/';
        const fetchConfigUrl = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(vehicleUrl, fetchConfigUrl);

        if (response.ok) {

            setName('')
            setPicture('')
            setManufacturer('')
        }
        window.location.reload();
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="modal fade" id="createvehiclemodel" tabIndex="-1" aria-labelledby="createvehiclemodelLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="createvehiclemodelLabel">Create a new Vehicle Model</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="name" className="col-form-label">Model Name</label>
                    <input value={name} onChange={handleNameChange} type="text" className="form-control" id="name" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="pictureurl" className="col-form-label">Picture url</label>
                    <input value={picture} onChange={handlePictureChange} className="form-control" id="pictureurl"></input>
                    </div>
                    <div className="mb-3">
                    <select value={manufacturer} onChange={handleManufacturerChange} className="form-select" aria-label="Default select example">
                        <option value="">Select a manufacturer</option>
                        {manufacturers?.map(manufacturer => {
                        return (
                            <option value={manufacturer.id} key={manufacturer.id}>{manufacturer.name}</option>
                        )
                        })}
                    </select>
                    </div>
                    <div className="modal-footer">
                    <button data-bs-dismiss="modal" type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    );
}

export default CreateVehicleModel;
