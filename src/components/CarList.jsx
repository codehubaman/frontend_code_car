import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://car-management-system-backend.onrender.com/api/cars', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCars(response.data);
                setFilteredCars(response.data);
            } catch (error) {
                console.error('Failed to fetch cars:', error);
            }
        };
        fetchCars();
    }, []);

    const handleSearch = (query) => {
        const filtered = cars.filter(car => car.title.toLowerCase().includes(query.toLowerCase()));
        setFilteredCars(filtered);
    };

    return (
        <div>
            <h2>Your Cars</h2>
            <SearchBar onSearch={handleSearch} />
            <ul>
                {filteredCars.map(car => (
                    <li key={car._id}>
                        <a href={`/cars/${car._id}`}>{car.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;
