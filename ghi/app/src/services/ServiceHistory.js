import React, { useState, useEffect, useRef } from 'react';


const ServiceHistoryList =() => {
    const [appointments, setAppointments] = useState([]);
    const inputEl = useRef("");

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
const getSearchTerm = () => {
    console.log(inputEl.current.value);
}
    return (
        <>
        <br />
        <div className="px-4 py-3 mt-0 text-center big-info">
            <h1 className="display-5 fw-bold">Service History</h1>
        </div>
        {/* <div className="ui search">
            <div className="ui icon input">
                <input ref={inputEl} type="text" placeholder="Search by VIN..." className="prompt"/>
                <i className="search icon">

                </i>
            </div>
        </div> */}
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
                {appointments?.map(appointment => {
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
