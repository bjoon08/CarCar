const VehicleModelCard = ({ vehicleModels, manufacturers }) => {
    console.log("VehicleModel", vehicleModels);
    return (
        <>
        {vehicleModels?.map(vehicleModel => {
            const manufacturer = manufacturers.find(m => m.id === vehicleModel.manufacturer);
            return (
            <div className="col-4" key={vehicleModel.href}>
            <div className="card h-100 w-100">
            <img src={vehicleModel.picture_url} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{vehicleModel.name}</h5>
                <p className="card-text">
                {vehicleModel.manufacturer.name}
                </p>
            </div>
            </div>
            </div>
            );
        })}
        </>
    );
};

export default VehicleModelCard;
