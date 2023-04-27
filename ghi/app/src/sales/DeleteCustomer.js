import { useState } from 'react';

const DeleteCustomer = ({ id, fetchCustomerData }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8090/api/customers/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                fetchCustomerData();
            } else {
                throw new Error('Failed to delete customer.');
            }
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
        window.location.reload();
    };

    return (
        <>
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
            Delete
        </button>

        {showModal && (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirm Delete</h5>
                    <button type="button" className="close" onClick={() => setShowModal(false)}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>No cap, you really want to delete this Customer? Like forreal?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                    <button data-bs-dismiss="modal" type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
                </div>
            </div>
            </div>
        )}
        </>
    );
};

export default DeleteCustomer;
