import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Books.css';

const Payments = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);

    const handleLogout = () => {
        navigate('/');
    };

    const fetchPayments = async () => {
        try {
            const response = await axios.get('http://localhost:3030/bookings');
            console.log('Fetched payments:', JSON.stringify(response.data, null, 2)); // Log the entire response
            setPayments(response.data); // Set payments directly since status is included
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const handleDelete = async (bookingID) => {
        try {
            await axios.delete(`http://localhost:3030/bookings/delete/${bookingID}`);
            setPayments(payments.filter(payment => payment.id !== bookingID));
            console.log(`Deleted payment with Booking ID: ${bookingID}`);
        } catch (error) {
            console.error(`Error deleting payment with Booking ID ${bookingID}:`, error);
        }
    };

    const handleAccept = async (bookingID) => {
        try {
            const response = await axios.put(`http://localhost:3030/bookings/accept/${bookingID}`);
            console.log(`Response from server:`, response.data);
    
            if (response.data.message) {
                // Fetch payments again to ensure we have the latest data
                fetchPayments();
                console.log(`Accepted payment with Booking ID: ${bookingID}`);
            }
        } catch (error) {
            console.error(`Error accepting payment with Booking ID ${bookingID}:`, error);
            console.error('Error details:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchPayments(); // Fetch payments on component mount
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-2 bg-dark sidebar">
                    <div className="text-white text-center py-3">
                        <h4>Emperor's Lounge</h4>
                    </div>
                    <hr className="text-white" />
                    <div className="text-center">
                        <button className="nav-link text-white btn btn-link" onClick={() => navigate('/admin')}>
                            <i className="fas fa-home"></i> Dashboard
                        </button>
                        <button className="nav-link text-white btn btn-link" onClick={() => navigate('/custbook')}>
                            <i className="fas fa-calendar-alt"></i> Customer's Booking
                        </button>
                        <button className="nav-link text-white btn btn-link" onClick={() => navigate('/payments')}>
                            <i className="fas fa-credit-card"></i> Payment
                        </button>
                        <button className="nav-link text-white btn btn-link" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Log out
                        </button>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-10 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Payment</h2>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Booking ID</th>
                                        <th>Name</th>
                                        <th>Service Price</th>
                                        <th>Contact No</th>
                                        <th>Payment Method</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td>{payment.id}</td>
                                            <td>{payment.customerName}</td>
                                            <td>₱{payment.servicePrice.toFixed(2)}</td>
                                            <td>{payment.contactNo}</td>
                                            <td>{payment.paymentMethod}</td>
                                            <td>{payment.status}</td> {/* Display status directly */}
                                            <td>
                                                {payment.status === 'Pending' ? (
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => handleAccept(payment.id)}
                                                    >
                                                        Accept
                                                    </button>
                                                ) : null /* No text or button for completed payments */}
                                                <button
                                                    className="btn btn-danger btn-sm ml-2"
                                                    onClick={() => handleDelete(payment.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Payments;