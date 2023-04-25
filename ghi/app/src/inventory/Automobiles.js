import { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";

function AutomobilesList() {

    const [autos, setAuto] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const url = "http://localhost:8100/api/automobiles/";
            const response = await fetch(url);
            if (response) {
                const data = await response.json();
                setAuto(data.autos);
            }
        }
        fetchdata();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>VIN</th>
                <th>Color</th>
                <th>Year</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Sold</th>
            </tr>
            </thead>
            <tbody>
                {autos?.map(auto => {
                    return (
                    <tr key={auto.id}>
                        <td>{ auto.vin }</td>
                        <td>{ auto.color }</td>
                        <td>{ auto.year }</td>
                        <td>{ auto.models }</td>
                        <td>{ auto.manufacturer }</td>
                        <td>{ auto.sold }</td>
                    </tr>
                    );
                    })}
            </tbody>
        </table>

    );
}

export default AutomobilesList;
