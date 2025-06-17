import React, { useEffect, useState } from "react";
import "./CalendarRecommendation.css";

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

export default function CalendarRecommendation() {
  const [entries, setEntries] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const currentYear = 2025;

  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();
  const todayKey = `${todayMonth}-${todayDate}`;
  const monthName = `${todayMonth}월`;
  const isTodayFilled = Boolean(entries[todayKey]);
  const todayItem =
    recommendations[monthName]?.items?.[todayDate - 1] || "";
  
  useEffect(() => {
    const savedEntries = localStorage.getItem("calendarEntries");
    if (savedEntries) setEntries(JSON.parse(savedEntries));

    fetch("/recommendations.json")
      .then((res) => res.json())
      .then((data) => setRecommendations(data))
      .catch((err) => console.error("추천 데이터를 불러올 수 없습니다:", err));
  }, []);

  const handleInputToday = () => {
    if (isTodayFilled) return;
    const input = prompt("오늘의 활동을 입력하세요:");
    if (input !== null) {
      const updated = { ...entries, [todayKey]: input };
      setEntries(updated);
      localStorage.setItem("calendarEntries", JSON.stringify(updated));
    }
  };

const handleClick = (month, day) => {
  const key = `${month}-${day}`;
  const text = entries[key];

  const isToday = month === todayMonth && day === todayDate;

  if (text) {
    if (isToday) {
      const result = prompt(
        `${month}월 ${day}일 활동 ✨\n"${text}"\n\n수정하려면 입력 후 확인을 눌러주세요!`,
        text
      );
      if (result !== null) {
        const updated = { ...entries, [key]: result };
        setEntries(updated);
        localStorage.setItem("calendarEntries", JSON.stringify(updated));
      }
    } else {
      alert(`${month}월 ${day}일 활동 ✨\n"${text}"`);
    }
  }
};


  return (
    <div className="annual-calendar-container">
      <h1 className="calendar-title no-select">2025 나 가꾸미 연력</h1>

      <div className="today-section">
        <p className="today-recommend">
          <strong>오늘의 활동:</strong> {todayItem}
        </p>
        <button
          onClick={handleInputToday}
          className={`today-button ${isTodayFilled ? "disabled-button" : ""}`}
          disabled={isTodayFilled}
        >
          {isTodayFilled ? "오늘의 활동 입력 완료" : "오늘 활동 입력하기"}
        </button>
      </div>

      <table className="calendar-table">
        <thead>
          <tr>
            <th>월</th>
            {Array.from({ length: 31 }, (_, i) => (
              <th key={i + 1}>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 12 }, (_, monthIndex) => {
            const month = monthIndex + 1;
            const daysInMonth = getDaysInMonth(currentYear, month);

            return (
              <tr key={month}>
                <td className="month-label">{month}월</td>
                {Array.from({ length: 31 }, (_, dayIndex) => {
                  const day = dayIndex + 1;
                  const key = `${month}-${day}`;
                  const filled = entries[key];

                  const isToday =
                    month === todayMonth && day === todayDate;

                  const isPast =
                    new Date(currentYear, month - 1, day) <
                    new Date(today.getFullYear(), today.getMonth(), today.getDate());

                  return (
                    <td
                      key={key}
                      onClick={() => {
                        if (filled) handleClick(month, day);
                      }}
                      className={
                        day > daysInMonth
                          ? "disabled"
                          : filled
                          ? "filled"
                          : isToday
                          ? "today"
                          : isPast
                          ? "past"
                          : ""
                      }
                      title={filled || ""}
                    >
                      {day <= daysInMonth ? day : ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
