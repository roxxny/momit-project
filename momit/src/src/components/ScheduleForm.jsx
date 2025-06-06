import React, { useState, useEffect } from "react";
import "./ScheduleForm.css";

export default function ScheduleForm({ onAdd, selectedDate }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const [title, setTitle] = useState("");
  const [importance, setImportance] = useState("high");

  useEffect(() => {
    if (selectedDate) {
      const [y, m, d] = selectedDate.split("-").map(Number);
      setYear(y);
      setMonth(m);
      setDay(d);
    }
  }, [selectedDate]);

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const daysInMonth = getDaysInMonth(year, month);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert("일정명을 입력하세요.");
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onAdd({ date: dateStr, title, importance });
    setTitle("");
  };

  return (
    <form className="schedule-form" onSubmit={handleSubmit}>
      <div className="form-title">일정 추가하기</div>

      <label className="label-date">날짜와 시간</label>
      <div className="date-selectors">
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {[2023, 2024, 2025, 2026, 2027].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <select value={day} onChange={(e) => setDay(Number(e.target.value))}>
          {[...Array(daysInMonth)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="일정명"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="importance-label">중요도 선택</div>
      <div className="importance-selector">
        <div
          className={`circle red ${importance === "high" ? "selected" : ""}`}
          onClick={() => setImportance("high")}
          role="button"
          tabIndex={0}
          aria-label="매우 중요"
          onKeyDown={(e) => { if (e.key === "Enter") setImportance("high"); }}
        />
        <div
          className={`circle orange ${importance === "normal" ? "selected" : ""}`}
          onClick={() => setImportance("normal")}
          role="button"
          tabIndex={0}
          aria-label="중요"
          onKeyDown={(e) => { if (e.key === "Enter") setImportance("normal"); }}
        />
        <div
          className={`circle blue ${importance === "low" ? "selected" : ""}`}
          onClick={() => setImportance("low")}
          role="button"
          tabIndex={0}
          aria-label="보통"
          onKeyDown={(e) => { if (e.key === "Enter") setImportance("low"); }}
        />
      </div>

      <button type="submit">추가</button>
    </form>
  );
}
