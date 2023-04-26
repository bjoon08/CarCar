const VehicleModelCard = ({ vehicleModels, manufacturers }) => {
    return (
        <div className="row">
        {vehicleModels?.map(vehicleModel => {
            const manufacturer = manufacturers.find(m => m.id === vehicleModel.manufacturer);
            return (
            <div className="col-md-4 mb-4" key={vehicleModel.href}>
                <div className="card shadow h-100">
                <img src={vehicleModel.picture_url} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title fs-5"><strong>Name:</strong> {vehicleModel.name}</h5>
                        <p className="card-text fs-6">
                        <strong>Vehicle Model:</strong> {vehicleModel.manufacturer.name}
                        </p>
                    </div>
                </div>
            </div>
            );
        })}
        </div>
    );
};

export default VehicleModelCard;
