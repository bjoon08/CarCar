import DeleteCustomer from "./DeleteCustomer";

const CustomerCard = ({ customers, fetchCustomerData }) => {
    return (
        <div className="row">
            {customers?.map((customer) => {
                return (
                <div className="col-md-4 mb-4" key={customer.id}>
                    <div className="card shadow h-100">
                    <div className="card-body">
                        <h5 className="card-title"><strong>First Name/Last Name:</strong></h5>
                        <p className="card-text">{customer.first_name} {customer.last_name}</p>
                    </div>
                    <div className="card-footer">
                        <h5 className="card-title"><strong>Phone Number:</strong></h5>
                        <p className="card-text">{customer.phone_number}</p>
                        <h5 className="card-title"><strong>Address:</strong></h5>
                        <p className="card-text">{customer.address}</p>
                        <DeleteCustomer id={customer.id} fetchCustomerData={fetchCustomerData} />
                    </div>
                    </div>
                </div>
                );
            })}
        </div>
    );
}

export default CustomerCard;
