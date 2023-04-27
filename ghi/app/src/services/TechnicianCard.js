const TechnicianCard = ({ technician }) => {
    return (
        <div className="row">
            {technician?.map(tech => {
                        return (
                        <div className="col-md-4 mb-4" key={tech.id}>
                            <div className="card shadow h-100">
                            <div className="card-body">
                                <h5 className="card-title fs-6"><strong>Employee ID:</strong></h5>
                                <p className="card-text fs-4">{tech.employee_id}</p>
                        </div>
                        <div className="card-footer">
                            <h5 className="card-title fs-6"><strong>First/Last Name:</strong></h5>
                            <p className="card-text fs-5">{tech.first_name} {tech.last_name}</p>
                        </div>
                        </div>
                    </div>
                );
            },)}
        </div>
    );
}

export default TechnicianCard
