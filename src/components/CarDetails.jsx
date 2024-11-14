import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/cars/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCar(response.data);
            } catch (error) {
                console.error('Failed to fetch car:', error);
            }
        };
        fetchCar();
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://car-management-system-backend.onrender.com/api/cars/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');
        } catch (error) {
            console.error('Failed to delete car:', error);
        }
    };

    if (!car) return <p>Loading...</p>;

    return (
        <div>
            <h2>{car.title}</h2>
            <p>{car.description}</p>
            {car.image && <img src={car.image} alt={car.title} />}
            <button onClick={() => navigate(`/cars/edit/${id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default CarDetails;
