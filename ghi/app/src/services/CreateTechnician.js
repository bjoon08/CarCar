import { useEffect, useState } from "react";

const CreateTechnician = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }
    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()


        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(technicianUrl, fetchConfig);
        console.log(response)

        if (response.ok) {

            setFirstName('')
            setLastName('')
            setEmployeeId('')
        }
        window.location.reload();
    }
    useEffect(() =>{
    }, []);

    return (
        <div className="modal fade" id="createtechnician" tabIndex="-1" aria-labelledby="createtechnicianlabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="createtechnicianlabel">Create a Technician</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="firstname" className="col-form-label">First Name</label>
                    <input value={firstName} onChange={handleFirstNameChange} type="text" className="form-control" id="firstname"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="lastname" className="col-form-label">Last Name</label>
                    <input value={lastName} onChange={handleLastNameChange} type="text" className="form-control" id="lastname"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="employeeid" className="col-form-label">Employee ID</label>
                    <input value={employeeId} onChange={handleEmployeeIdChange} type="text" className="form-control" id="employeeid"/>
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

export default CreateTechnician;
