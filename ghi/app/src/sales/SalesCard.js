const SalesCard = ({ sales }) => {
    return (
        <div className="row">
            {sales?.map(sale => {
                return (
                <div className="col-md-4 mb-4" key={sale.id} value={sale.id}>
                    <div className="card shadow h-100">
                    <div className="card-body">
                        <h5 className="card-title fs-6"><strong>Customer:</strong></h5>
                        <p className="card-text fs-5">{sale.customer} {sale.customer_last_name}</p>
                        <h6 className="card-title fs-6"><strong>VIN:</strong></h6>
                        <p className="card-text fs-5">{sale.automobile}</p>
                        <h6 className="card-title fs-6"><strong>Price:</strong></h6>
                        <p className="card-text fs-5">${sale.price}</p>
                    </div>
                    <div className="card-footer">
                        <h5 className="card-title fs-6"><strong>Salesperson Employee ID:</strong></h5>
                        <p className="card-text fs-5">{sale.salesperson}</p>
                        <h5 className="card-title fs-6"><strong>Salesperson Name:</strong></h5>
                        <p className="card-text fs-5">{sale.salesperson_first_name} {sale.salesperson_last_name}</p>
                    </div>
                    </div>
                </div>
                );
            })}
        </div>
    );
}

export default SalesCard;
