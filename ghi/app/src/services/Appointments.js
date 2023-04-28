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

const handleCancel = async (id) => {
    const cancelUrl = `http://localhost:8080/api/appointments/${id}/cancel`;
    const fetchConfig = {
        method: 'put',
    }
    const response = await fetch(cancelUrl, fetchConfig);
    if (response.ok) {
        setAppointments(appointment.filter((appointment) => appointment.id));
    }
    document.location.reload();
}

const handleFinish = async (id) => {
    const finishUrl = `http://localhost:8080/api/appointments/${id}/finish`;
    const fetchConfig = {
        method: 'put',
    }
    const response = await fetch(finishUrl, fetchConfig);
    if (response.ok) {
        setAppointments(appointment.filter((appointment) => appointment.id));
    }
    document.location.reload();
}

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
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
            </tr>
            </thead>
            <tbody>
                {appointment?.map(appointment => {
                    if (appointment.status === "created"){
                    return (
                    <tr key={appointment.id } >
                        <td>{ appointment.vin }</td>
                        <td>{ appointment.customer }</td>
                        <td>{ new Date(appointment.date_time).toLocaleDateString() }</td>
                        <td>{ new Date(appointment.date_time).toLocaleTimeString() }</td>
                        <td>{ appointment.technician.employee_id }</td>
                        <td>{ appointment.reason }</td>
                        <td>
                            <div>
                                <button onClick={() => handleCancel(appointment.id)} type="button" className="btn btn-outline-danger">Cancel</button>
                                <button onClick={() => handleFinish(appointment.id)} type="button" className="btn btn-outline-success">Finish</button>
                            </div>
                        </td>
                    </tr>
                );
                    }},
                )}
            </tbody>
        </table>
        </>
    );
}

export default AppointmentList
