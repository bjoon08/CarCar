import { useEffect, useState } from "react";

const CreateAppointment = () => {
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [technician, setTechnician] = useState('');
    const [reason, setReason] = useState('');
    const [technicians, setTechnicians] = useState([]);

    const handleVinChange = (event) => {
        setVin(event.target.value);
    }
    const handleCustomerChange = (event) => {
        setCustomer(event.target.value);
    }
    const handleDateChange = (event) => {
        setDate(event.target.value);
    }
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    }
    const handleTechnicianChange = (event) => {
        setTechnician(event.target.value);
    }
    const handleReasonChange = (event) => {
        setReason(event.target.value);
    }


    const handleSubmit = async (event) =>  {
        event.preventDefault();

        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.date = date;
        data.time = time;
        data.technician = technician;
        data.reason = reason;

        const appointmentsUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfigUrl = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(appointmentsUrl, fetchConfigUrl);
        console.log(response)

        if (response.ok) {
            setVin('')
            setCustomer('')
            setDate('')
            setTime('')
            setTechnician('')
            setReason('')
        }
        window.location.reload();
    };
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technician);
        }
    }
    useEffect(() =>{
        fetchData();
    }, []);

    return (
        <div className="modal fade" id="createappointment" tabIndex="-1" aria-labelledby="createappointmentlabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="createappointmentlabel">Create a Service Appointment</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="color" className="col-form-label">Automobile VIN</label>
                    <input value={vin} onChange={handleVinChange} type="text" className="form-control" id="vin" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="customer" className="col-form-label">Customer</label>
                    <input value={customer} onChange={handleCustomerChange} type="text" className="form-control" id="customer" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="date" className="col-form-label">Date</label>
                    <input value={date} onChange={handleDateChange} type="date" className="form-control" id="date" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="time" className="col-form-label">Time</label>
                    <input value={time} onChange={handleTimeChange} type="time" className="form-control" id="time" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="technician" className="col-form-label">Technician</label>
                    <select value={technician} onChange={handleTechnicianChange} className="form-select" aria-label="Default select example">
                    <option value="">Choose a technician</option>
                        {technicians?.map(technician => {
                            return (
                                <option value={technician.id} key={technician.id}>{technician.employee_id}</option>
                            )
                            })}
                    </select>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="reason" className="col-form-label">Reason</label>
                    <input value={reason} onChange={handleReasonChange} type="text" className="form-control" id="reason" />
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

export default CreateAppointment;
