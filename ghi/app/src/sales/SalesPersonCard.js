import DeleteSalesPerson from "./DeleteSalesPerson";

const SalesPersonCard = ({ salespeople, fetchSalesPeopleData }) => {
    return (
        <div className="row">
            {salespeople?.map((salesperson) => {
                return (
                <div className="col-md-4 mb-4" key={salesperson.id}>
                    <div className="card shadow h-100">
                    <div className="card-body">
                        <h5 className="card-title fs-6"><strong>Employee ID:</strong></h5>
                        <p className="card-text fs-4">{salesperson.employee_id}</p>
                    </div>
                    <div className="card-footer">
                        <h5 className="card-title fs-6"><strong>First/Last Name:</strong></h5>
                        <p className="card-text fs-5">{salesperson.first_name} {salesperson.last_name}</p>
                        <DeleteSalesPerson id={salesperson.id} fetchSalesPeopleData={fetchSalesPeopleData} />
                    </div>
                    </div>
                </div>
                );
            })}
        </div>
    );
}

export default SalesPersonCard;
