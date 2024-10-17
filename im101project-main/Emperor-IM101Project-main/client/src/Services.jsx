import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateBook.css';
import DatePicker from 'react-datepicker';
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
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', 
        '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
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

        axios.post('http://localhost:3030/booked-times', { date })
            .then((response) => {
                setBookedTimes(response.data);
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        axios.post('http://localhost:3030/create', formData)
            .then(() => {
                setLoading(false);
                navigate('/booking-done');
            })
            .catch((err) => {
                setLoading(false);
                const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
                alert(errorMessage);
            });
    };

    const getFilteredTimes = () => {
        return availableTimes.filter(time => !bookedTimes.includes(time));
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
                        <DatePicker
                            selected={formData.date}
                            onChange={handleDateChange}
                            className="form-control"
                            dateFormat="MMMM d, yyyy"
                            inline
                            calendarClassName="custom-calendar"
                        />
                    </div>
                    <div className="formGroup">
                        <label className="label">Time</label>
                        <select
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="select"
                            required
                        >
                            <option value="">Select a time</option>
                            {getFilteredTimes().map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
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
                    <button type="submit" className="button">Next</button>
                </form>
            )}
        </div>
    );
};

export default CreateBook;
