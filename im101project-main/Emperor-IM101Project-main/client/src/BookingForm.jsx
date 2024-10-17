import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    date: '',
    time: '',
    paymentMethod: '',
    email: '',
    contactNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3030/submit-booking', formData) // Using your existing route
      .then((res) => {
        alert('Booking successful!'); // Inform the user
      })
      .catch((err) => {
        console.error(err);
        alert('Booking failed!');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
      <input type="text" name="service" placeholder="Service" onChange={handleChange} value={formData.service} required />
      <input type="date" name="date" onChange={handleChange} value={formData.date} required />
      <input type="time" name="time" onChange={handleChange} value={formData.time} required />
      <input type="text" name="paymentMethod" placeholder="Payment Method" onChange={handleChange} value={formData.paymentMethod} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
      <input type="text" name="contactNo" placeholder="Contact Number" onChange={handleChange} value={formData.contactNo} required />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;
