import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Homepage.css';
import Books from './Books';
import Homepage from './Homepage';
import CreateBook from './CreateBook';
import BookingDone from './BookingDone';
import Login from './login';
import CustBook from './custbook';
import Payments from './payments';
import ServicesBarber from './ServicesBarber';
import CustomerDetails from './CustomerDetails';
import TimeDatePayment from './TimeDatePayment';
import { BookingProvider } from './BookingContext';
import BookingPage from './BookingPage'; // Import your BookingPage component

const App = () => {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          {/* Original routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Books />} />
          <Route path="/create" element={<CreateBook />} />
          <Route path="/booking-done" element={<BookingDone />} />
          <Route path="/login" element={<Login />} />
          <Route path="/custbook" element={<CustBook />} />
          <Route path="/payments" element={<Payments />} />

          {/* New booking process routes */}
          <Route path="/services-barber" element={<ServicesBarber />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/time-date-payment" element={<TimeDatePayment />} />
          <Route path="/booking-done" element={<BookingDone />} />

          {/* Add the BookingPage route */}
          <Route path="/book-service" element={<BookingPage />} /> 
        </Routes>
      </Router>
    </BookingProvider>
  );
};

export default App;
