import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import ScheduleForm from "./ScheduleForm";
import "./ScheduleManager.css";

export default function ScheduleManager({ calendarData, setCalendarData }) {
 

  const [category, setCategory] = useState("전체");
  const [selectedDate, setSelectedDate] = useState(null);

  const todaySchedules = selectedDate ? (calendarData[selectedDate] || []) : [];

  // calendarData 변경 시 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }, [calendarData]);

  // 일정 추가 함수
  const handleAddSchedule = (item) => {
    const key = item.date;
    setCalendarData((prev) => {
      const updated = { ...prev };
      if (!updated[key]) updated[key] = [];
      updated[key] = [...updated[key], item];
      return updated;
    });
    setSelectedDate(item.date); // 추가 후 해당 날짜 선택 유지
  };

  // 일정 삭제 함수
  const handleDeleteSchedule = (date, idx) => {
    setCalendarData((prev) => {
      const updated = { ...prev };
      updated[date].splice(idx, 1);
      if (updated[date].length === 0) delete updated[date];
      return updated;
    });
  };

  // 현재 년월 계산
  const currentYearMonth = selectedDate
    ? selectedDate.slice(0, 7)
    : Object.keys(calendarData)[0]?.slice(0, 7) || "";

  // 해당 월 일정 모으기
  const mainSchedules = Object.entries(calendarData)
    .filter(([date]) => date.startsWith(currentYearMonth))
    .flatMap(([_, items]) => items);

  return (
    <div className="schedule-manager-container">
      <aside className="left-panel">
        <h3>이번 달 주요 일정</h3>
        {mainSchedules.length === 0 ? (
          <p>등록된 일정이 없습니다.</p>
        ) : (
          <ul>
            {mainSchedules.map((item, idx) => (
              <li key={idx}>• {item.title}</li>
            ))}
          </ul>
        )}
      </aside>

      <section className="center-panel">
        <Calendar
          category={category}
          calendarData={calendarData}
          onDateClick={setSelectedDate}
        />
      </section>

      <aside className="right-panel">
        <h3>일정 추가하기</h3>
        <ScheduleForm onAdd={handleAddSchedule} selectedDate={selectedDate} />

        <h3>오늘의 일정</h3>
        {selectedDate && todaySchedules.length === 0 && (
          <p className="empty-msg">등록된 일정이 없습니다.</p>
        )}
        <ul className="today-schedule-list">
          {todaySchedules.map((item, idx) => {
            let importanceText = "";
            if (item.importance === "high") importanceText = "매우중요";
            else if (item.importance === "normal") importanceText = "중요";
            else if (item.importance === "low") importanceText = "보통";

            const importanceClass =
              item.importance === "high"
                ? "importance-high"
                : item.importance === "normal"
                ? "importance-normal"
                : "importance-low";

            return (
              <li key={idx}>
                <input type="checkbox" />
                <span>{item.title} </span>
                <span className={importanceClass}>({importanceText})</span>
                <button
                  onClick={() => handleDeleteSchedule(selectedDate, idx)}
                  aria-label="삭제"
                >
                  🗑
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
