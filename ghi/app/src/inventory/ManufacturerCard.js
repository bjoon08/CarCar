const ManufacturerCard = ({ manufacturers }) => {
    return (
        <>
        {manufacturers.map(manufacturer => {
            return (
                <div className="col-md-4 mb-4" key={manufacturer.id}>
                {/* <div className="card h-100 w-50"> */}
                <div className="card shadow h-100">
                <div className="card-body">
                    <h5 className="card-title fs-6">Name:</h5>
                    <p className="card-text fs-4">{manufacturer.name}</p>
                </div>
                {/* <div className="card-footer">{manufacturer.name}</div> */}
                </div>
                </div>
            );
        })}
        </>
    );
};

export default ManufacturerCard;
