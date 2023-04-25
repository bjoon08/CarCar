import { useEffect, useState } from "react";

const CreateManufacturer = () => {
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;

        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfigUrl = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(manufacturersUrl, fetchConfigUrl);

        if (response.ok) {

            setName('')
        }
        window.location.reload();
    }

    return (
        <div className="modal fade" id="createmanufacturer" tabIndex="-1" aria-labelledby="createmanufacturerLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="createmanufacturerLabel">Create a New Manufacturer</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="name" className="col-form-label">Manufacturer Name</label>
                    <input value={name} onChange={handleNameChange} type="text" className="form-control" id="name" />
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

export default CreateManufacturer;
