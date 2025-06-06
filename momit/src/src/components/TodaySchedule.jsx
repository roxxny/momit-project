import React from "react";

export default function TodaySchedule({ schedules, selectedDate, onDelete }) {
  return (
    <div className="today-schedule">
      <h3>오늘의 일정</h3>
      {schedules.length === 0 ? (
        <p>일정이 없습니다.</p>
      ) : (
        <ul>
          {schedules.map((item, idx) => (
            <li key={idx} className="schedule-item">
              <input type="checkbox" />
              <span>{item.title}</span>
              <button className="btn-delete" onClick={() => onDelete(selectedDate, idx)}>
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
