import { useEffect, useState } from "react";

const CreateAuto = () => {
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model, setModel] = useState('');

    const handleColorChange = (event) => {
        setColor(event.target.value);
    }
    const handleYearChange = (event) => {
        setYear(event.target.value);
    }
    const handleVinChange = (event) => {
        setVin(event.target.value);
    }
    const handleModelChange = (event) => {
        setModel(event.target.value);
    }

    const handleSubmit = async (event) =>  {
        event.preventDefault();


    const data = {};
    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model = model;

    const automobileUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfigUrl = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch(automobileUrl, fetchConfigUrl);

    if (response.ok) {

        setColor('')
        setYear('')
        setVin('')
        setModel('')
    }
    window.location.reload();
    }

    return (
        <div className="modal fade" id="createauto" tabIndex="-1" aria-labelledby="createautoLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="createautoLabel">Add an automobile to inventory</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="color" className="col-form-label">Color</label>
                    <input value={color} onChange={handleColorChange} type="text" className="form-control" id="color" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="year" className="col-form-label">Year</label>
                    <input value={year} onChange={handleYearChange} type="text" className="form-control" id="year" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="vin" className="col-form-label">VIN</label>
                    <input value={vin} onChange={handleVinChange} type="text" className="form-control" id="vin" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="model" className="col-form-label">Model Name</label>
                    <input value={model} onChange={handleModelChange} type="select" className="form-control" id="model" />
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

export default CreateAuto;
