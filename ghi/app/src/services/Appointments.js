import React, { useState, useEffect } from 'react';
import CreateAppointment from './CreateAppointment';

const AppointmentList =() => {
    const [appointment, setAppointments] = useState([]);

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

    return (
        <>
        <br />
        <div className="px-4 py-3 mt-0 text-center big-info">
            <h1 className="display-5 fw-bold">Service Appointments</h1>
        </div>
        <div className="container" >
            <div className="row justify-content-end">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createappointment" data-bs-whatever="@mdo">Create an Appointment</button>
            </div>
        </div>
        <CreateAppointment fetchAppointmentData={fetchAppointmentData} appointment={appointment} />
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
            </tr>
            </thead>
            <tbody>
                {appointment?.map(appointment => {
                    return (
                    <tr key={appointment.id} >
                        <td>{ appointment.vin }</td>
                        <td>{ appointment.sold ? "Yes": "No" }</td>
                        <td>{ appointment.customer }</td>
                        <td>{ appointment.date_time }</td>
                        <td>{ appointment.date_time }</td>
                        <td>{ appointment.technician }</td>
                        <td>{ appointment.reason }</td>
                    </tr>
                    );
                },
                )}
            </tbody>
        </table>
        </>
    );
}

export default AppointmentList
