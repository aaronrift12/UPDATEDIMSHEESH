import { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        name: '',
        service: '',
        date: new Date(),
        time: '',
        paymentMethod: '',
        email: ''
    });

    return (
        <BookingContext.Provider value={{ formData, setFormData }}>
            {children}
        </BookingContext.Provider>
    );
};
