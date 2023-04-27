const SalesHistoryCard = ({sales}) => {
    return (
        <>
        {sales?.map(sale => {
            return (
            <div className="col-4" key={sale.id}>
                <div className="card shadow h-100">
                <div className="card-body">
                    <h5 className="cardtitle"><strong>Customer:</strong></h5>
                    <p className="card-text">{sale.customer} {sale.customer_last_name}</p>
                    <h5 className="card-title"><strong>Vin/Price:</strong></h5>
                    <p className="card-text">
                    {sale.automobile} | {sale.price}
                    </p>
                </div>
                <div className="card-footer">
                    <h5 className="card-title"><strong>Salesperson:</strong></h5>
                    <p>{sale.salesperson_first_name} {sale.salesperson_last_name}</p>
                </div>
                </div>
            </div>
            );
        })}
        </>
    );
}

export default SalesHistoryCard;
