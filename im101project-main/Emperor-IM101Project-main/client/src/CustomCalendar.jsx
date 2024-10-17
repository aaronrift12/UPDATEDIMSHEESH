import React, { useState } from 'react';
import './CustomCalendar.css';
import { format, startOfMonth, endOfMonth, addMonths, subMonths, isSameDay, isToday, isBefore } from 'date-fns';

const CustomCalendar = ({ selectedDate, onDateChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = new Date();

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const renderDays = () => {
        const startDate = startOfMonth(currentMonth);
        const endDate = endOfMonth(currentMonth);
        const days = [];

        // Fill in the days of the month
        for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
            days.push(new Date(day));
        }

        // Fill in leading empty days
        const leadingDays = Array(startDate.getDay()).fill(null);

        return [...leadingDays, ...days].map((date, index) => (
            <div
                key={index}
                className={`day ${date ? (isSameDay(date, selectedDate) ? 'selected' : '') : 'empty'} ${date && isToday(date) ? 'today' : ''} ${date && isBefore(date, today) ? 'disabled' : ''}`}
                onClick={() => date && !isBefore(date, today) && onDateChange(date)} // Check if date is not in the past
            >
                {date ? date.getDate() : ''}
            </div>
        ));
    };

    return (
        <div className="calendar">
            <div className="header">
                <button onClick={handlePrevMonth}>&lt;</button>
                <span>{format(currentMonth, 'MMMM yyyy')}</span>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                    <div key={day} className="day-name">{day}</div>
                ))}
                {renderDays()}
            </div>
        </div>
    );
};

export default CustomCalendar;