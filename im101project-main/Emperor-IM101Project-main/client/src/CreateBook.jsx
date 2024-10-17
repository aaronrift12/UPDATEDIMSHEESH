import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateBook.css';
import CustomCalendar from './CustomCalendar';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [formData, setFormData] = useState({
        name: '',
        service: '',
        date: new Date(),
        time: '',
        paymentMethod: '',
        email: ''
    });

    const [availableTimes, setAvailableTimes] = useState([
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
        '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
    ]);

    const [bookedTimes, setBookedTimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date });

        // Fetch booked times for the selected date
        axios.post('http://localhost:3030/booked-times', { date })
            .then((response) => {
                setBookedTimes(response.data);
            })
            .catch((err) => console.log(err));
    };

    const handleTimeSelect = (time) => {
        if (!bookedTimes.includes(time)) {
            setFormData({ ...formData, time });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formattedDate = format(formData.date, 'yyyy-MM-dd');

        axios.post('http://localhost:3030/create', { ...formData, date: formattedDate })
            .then(() => {
                setLoading(false);
                navigate('/booking-done');
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    };

    return (
        <div className="container">
            <h2 className="header">Create a New Booking</h2>

            {loading ? (
                <div className="loading-container">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label className="label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="input"
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="input"
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label">Service</label>
                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className="select"
                            required
                        >
                            <option value="">Select a service</option>
                            <option value="haircut">Haircut</option>
                            <option value="shampoo">Shampoo</option>
                            <option value="upper back arm massage">Upper Back Arm Massage</option>
                            <option value="hot towel">Hot Towel</option>
                            <option value="blow dry">Blow Dry</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label className="label">Date</label>
                        <CustomCalendar selectedDate={formData.date} onDateChange={handleDateChange} />
                    </div>
                    <div className="formGroup">
                        <label className="label">Time</label>
                        <div className="time-grid">
                            {availableTimes.map((time) => (
                                <div
                                    key={time}
                                    className={`time-slot ${formData.time === time ? 'selected' : ''} ${bookedTimes.includes(time) ? 'disabled' : ''}`}
                                    onClick={() => !bookedTimes.includes(time) && handleTimeSelect(time)} // Time selection logic
                                >
                                    {time}
                                    {bookedTimes.includes(time) && <span className="booked-indicator"> (Booked)</span>} {/* Indicator for booked times */}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="label">Payment Method</label>
                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleInputChange}
                            className="select"
                            required
                        >
                            <option value="" disabled>Select Payment Method</option>
                            <option value="pay_in_store">Pay in Store</option>
                        </select>
                    </div>
                    <button type="submit" className="button" disabled={!formData.time}>
                        Next
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreateBook;