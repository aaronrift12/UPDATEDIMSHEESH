import React, { useContext, useEffect, useState } from 'react';
import { BookingContext } from './BookingContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './assets/emlogo.png';
import './ServicesBarber.css';

const ServicesBarber = () => {
    const { formData, setFormData } = useContext(BookingContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [barbers, setBarbers] = useState([]); // State to hold barbers

    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                const response = await axios.get('http://localhost:3030/staff'); // Adjust the endpoint as needed
                setBarbers(response.data);
            } catch (error) {
                console.error('Error fetching barbers:', error);
            }
        };

        fetchBarbers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleNext = async () => {
        if (!formData.service || !formData.barber) {
            alert("Please select a service and a barber.");
            return;
        }

        try {
            const serviceResponse = await axios.get(`http://localhost:3030/services?serviceType=${formData.service}`);
            if (serviceResponse.data.length === 0) {
                alert("Selected service is not available.");
                return;
            }

            const selectedService = serviceResponse.data[0];
            setFormData((prevFormData) => ({
                ...prevFormData,
                serviceID: selectedService.serviceID,
                staffID: selectedService.staffID, // Ensure this matches the selected barber's staffID
            }));

            navigate('/customer-details');
        } catch (error) {
            console.error('Error fetching service:', error);
            alert("Failed to fetch service information. Please try again.");
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <Link to="/" style={{ position: 'absolute', top: '45px', left: '73px' }}>
                <img src={logo} alt="Logo" style={{ width: '55px', height: 'auto' }} />
            </Link>

            <div className="hamburger" onClick={toggleMenu}>
                <div className={isMenuOpen ? "bar bar1 open" : "bar bar1"}></div>
                <div className={isMenuOpen ? "bar bar2 open" : "bar bar2"}></div>
                <div className={isMenuOpen ? "bar bar3 open" : "bar bar3"}></div>
            </div>

            {isMenuOpen && (
                <div className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/services">Services</Link>
                </div>
            )}

            <div className="container">
                <h2>Choose Service and Barber</h2>
                <div className="formGroup">
                    <label>Service</label>
                    <select name="service" value={formData.service || ''} onChange={handleInputChange} className="dropdown">
                        <option value="" disabled>Select a service</option>
                        <option value="haircut">Haircut - ₱400</option>
                        <option value="shampoo">Shampoo - ₱450</option>
                        <option value="upper back & arm massage">Massage - ₱500</option>
                        <option value="hot towel">Hot Towel - ₱400</option>
                        <option value="blow dry">Blow Dry - ₱500</option>
                    </select>
                </div>
                <div className="formGroup">
                    <label>Barber</label>
                    <select name="barber" value={formData.barber || ''} onChange={handleInputChange} className="dropdown">
                        <option value="" disabled>Choose a barber</option>
                        {barbers.map(barber => (
                            <option key={barber.staffID} value={barber.staffName}>{barber.staffName}</option>
                        ))}
                    </select>
                </div>
                <div className="buttonGroup">
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
        </>
    );
};

export default ServicesBarber;