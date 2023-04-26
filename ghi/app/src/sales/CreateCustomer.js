import { useEffect, useState } from "react";

const CreateCustomer = () => {
    const [firstName, setFirstName] = useState('');
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    const [lastName, setLastName] = useState('');
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }
    const [address, setAddress] = useState('');
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const [phoneNumber, setPhoneNumber] = useState('');
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfigUrl = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(customerUrl, fetchConfigUrl);

        if (response.ok) {
            setFirstName('')
            setLastName('')
            setAddress('')
            setPhoneNumber('')
        }
        window.location.reload();
    }

    return (
        <div className="modal fade" id="createcustomer" tabIndex="-1" aria-labelledby="createcustomerLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="createcustomerLabel">Create a New Customer</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label htmlFor="firstname" className="col-form-label">First Name</label>
                    <input value={firstName} onChange={handleFirstNameChange} type="text" className="form-control" id="firstname" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="lastname" className="col-form-label">Last Name</label>
                    <input value={lastName} onChange={handleLastNameChange} type="text" className="form-control" id="lastname" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="address" className="col-form-label">Address</label>
                    <input value={address} onChange={handleAddressChange} type="text" className="form-control" id="address" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="phonenumber" className="col-form-label">Phone Number</label>
                    <input value={phoneNumber} onChange={handlePhoneNumberChange} type="text" className="form-control" id="phonenumber" />
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

export default CreateCustomer;
