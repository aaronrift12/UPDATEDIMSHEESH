import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Books.css';

const Books = () => {
    const [customers, setCustomers] = useState([]);
    const [totalBookings, setTotalBookings] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const navigate = useNavigate();

    // Fetch customer data and totals from backend
    useEffect(() => {
        const fetchCustomersAndTotals = async () => {
            try {
                const customerResponse = await axios.get('http://localhost:3030/customers');
                setCustomers(customerResponse.data);

                const totalsResponse = await axios.get('http://localhost:3030/totals');
                setTotalBookings(totalsResponse.data.totalBookings);
                setTotalIncome(totalsResponse.data.totalIncome);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCustomersAndTotals();
    }, []);

    const handleDelete = async (customerId) => {
        try {
            await axios.delete(`http://localhost:3030/customers/delete/${customerId}`);
            setCustomers(customers.filter((customer) => customer.customerID !== customerId));
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    const handleLogout = () => {
        // Add any logout logic here (like clearing tokens)
        navigate('/');
    };

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
                            <i className="fas fa-box"></i> Customer's Booking
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
                    {/* Totals Display */}
                    <div className="row mb-4">
                        <div className="col-md-6 col-lg-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Total Accepted Bookings</h5>
                                    <p className="card-text">{totalBookings}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <h5 className="card-title">Total Income</h5>
                                    <p className="card-text">₱{totalIncome.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Records Table */}
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>Name</th>
                                        <th>Contact No</th>
                                        <th>Email Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.length > 0 ? (
                                        customers.map((customer) => (
                                            <tr key={customer.customerID}>
                                                <td>{customer.customerID}</td>
                                                <td>{customer.name}</td>
                                                <td>{customer.contactNo}</td>
                                                <td>{customer.email}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(customer.customerID)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5">No Records</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Books;