import React, { useState, useEffect } from 'react';


const ServiceHistoryList =() => {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState('');


    async function fetchAppointmentData() {
        const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const response = await fetch(appointmentUrl);
        if (response) {
            const data = await response.json();
            setAppointments(data.appointment);
        }
    }



    useEffect(() => {
        fetchAppointmentData();
    }, []);

    const filteredAppointments = appointments.filter(appointment =>
        appointment.vin.toLowerCase().includes(search.toLowerCase()));

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }


    return (
        <>
        <br />
        <div className="px-4 py-3 mt-0 text-center big-info">
            <h1 className="display-5 fw-bold">Service History</h1>
            <div className="form-group">
                <label htmlFor="vin-search"> Search by VIN...</label>
                <input type="text" className="form-control" id="vin-search" value={search} onChange={handleSearchChange} />
            </div>
        </div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>VIN</th>
                <th>is VIP?</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
                {filteredAppointments.map(appointment => {
                    return (
                    <tr key={appointment.id} >
                        <td>{ appointment.vin }</td>
                        <td>{ appointment.sold ? "Yes": "No" }</td>
                        <td>{ appointment.customer }</td>
                        <td>{ new Date(appointment.date_time).toLocaleDateString() }</td>
                        <td>{ new Date(appointment.date_time).toLocaleTimeString() }</td>
                        <td>{ appointment.technician.first_name }</td>
                        <td>{ appointment.reason }</td>
                        <td>{ appointment.status }</td>
                    </tr>
                    );
                },
                )}
            </tbody>
        </table>
        </>
    );
}

export default ServiceHistoryList




       {/* <div className="ui search">
            <div className="ui icon input">
                <input ref={inputEl} type="text" placeholder="Search by VIN..." className="prompt"/>
                <i className="search icon">

                </i>
            </div>
        </div> */}
