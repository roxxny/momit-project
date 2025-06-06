import React, { useState } from "react";
import "./Calendar.css";

export default function Calendar({ category, calendarData, onDateClick }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0~11

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelectedDate(null);
    if (onDateClick) onDateClick(null);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDate(null);
    if (onDateClick) onDateClick(null);
  };

  const handleDateClick = (day) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateKey);
    if (onDateClick) onDateClick(dateKey);
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const items = (calendarData[dateKey] || []).filter(
        (item) => category === "전체" || item.category === category
      );

      days.push(
        <div key={day} className="day" onClick={() => handleDateClick(day)}>
          <span>{day}</span>
          <div className="dots">
            {items.map((item, idx) => (
              <span
                key={idx}
                className={`dot ${item.importance === "high" ? "high" : "normal"}`}
              />
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={prevMonth}>◀</button>
        <span>{year}년 {month + 1}월</span>
        <button className="nav-btn" onClick={nextMonth}>▶</button>
      </div>

      <div className="calendar-grid">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, i) => (
          <div key={i} className="day header">{d}</div>
        ))}
        {renderDays()}
      </div>

      {selectedDate && (
        <div className="selected-info">
          <h4>{selectedDate} 일정</h4>
          <ul>
            {(calendarData[selectedDate] || [])
              .filter((item) => category === "전체" || item.category === category)
              .map((item, idx) => (
                <li key={idx}>
                  {item.title} ({item.importance === "high" ? "매우중요" : item.importance === "normal" ? "중요" : "보통"})
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
