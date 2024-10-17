import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './BookingDone.css'; // Import the CSS file for styling

const BookingDone = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleDoneClick = () => {
        navigate('/'); // Redirect to homepage when Done button is clicked
    };

    return (
        <div className="booking-done-container">
            <div className="booking-done-box">
                <h2 className="booking-done-header">Thank you for booking!</h2>
                <p className="booking-done-message">Please check your email for the receipt.</p>
                <button className="done-button" onClick={handleDoneClick}>
                    Done
                </button>
            </div>
        </div>
    );
};

export default BookingDone;
