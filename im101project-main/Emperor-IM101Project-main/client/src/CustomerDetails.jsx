import React, { useContext, useState } from 'react';
import { BookingContext } from './BookingContext';
import { useNavigate, Link } from 'react-router-dom';
import logo from './assets/emlogo.png'; // Adjust the path as needed
import './CustomerDetails.css';

const CustomerDetails = () => {
    const { formData, setFormData } = useContext(BookingContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(`Input changed: ${name} = ${value}`);
    };

    const handleNext = () => navigate('/time-date-payment');
    const handleBack = () => navigate('/services-barber');
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <Link to="/" style={{ position: 'absolute', top: '45px', left: '73px' }}>
                <img src={logo} alt="Logo" style={{ width: '55px', height: 'auto' }} />
            </Link>

            <div className="hamburger" onClick={toggleMenu}>
                <div className={isMenuOpen ? "bar open" : "bar"}></div>
                <div className={isMenuOpen ? "bar open" : "bar"}></div>
                <div className={isMenuOpen ? "bar open" : "bar"}></div>
            </div>

            {isMenuOpen && (
                <div className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/services">Services</Link>
                </div>
            )}

            <div className="customerDetails-container">
                <h2>Enter Your Details</h2>
                <div className="customerDetails-formGroup">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="customerDetails-formGroup">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="customerDetails-buttonGroup">
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
        </>
    );
};

export default CustomerDetails;