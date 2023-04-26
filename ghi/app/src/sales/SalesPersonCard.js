const SalesPersonCard = ({ salespeople }) => {
    return (
        <div className="row">
            {salespeople?.map((salesperson) => {
                return (
                <div className="col-md-4 mb-4" key={salesperson.id}>
                    <div className="card shadow h-100">
                    <div className="card-body">
                        <h5 className="card-title">Employee ID:</h5>
                        <p className="card-text">{salesperson.employee_id}</p>
                    </div>
                    <div className="card-footer">
                        <h5 className="card-title">First/Last Name:</h5>
                        <p className="card-text">{salesperson.first_name} {salesperson.last_name}</p>
                    </div>
                    </div>
                </div>
                );
            })}
        </div>
    );
}

export default SalesPersonCard;
