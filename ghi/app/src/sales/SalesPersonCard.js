const SalesPersonCard = ({ salespeople }) => {
    return (
        <>
        {salespeople?.map(salesperson => {
            return (
                <div className="col-md-4 mb-4" key={salesperson.id}>
                {/* <div className="card h-100 w-50"> */}
                <div className="card shadow h-100">
                <div className="card-body">
                    <h5 className="card-title">{salesperson.employee_id}</h5>
                </div>
                <div className="card-footer">{salesperson.first_name} {salesperson.last_name}</div>
                </div>
                </div>
            );
        })}
        </>
    );
}

export default SalesPersonCard;
