import React, { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import Timer from "./components/Timer";
import WeeklyRecord from "./components/WeeklyRecord";
import ScheduleManager from "./components/ScheduleManager";
import CalendarHeader from "./components/CalendarHeader";

export default function MainView() {
  const [darkMode, setDarkMode] = useState(false);
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("timerRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [calendarData, setCalendarData] = useState(() => {
    const saved = localStorage.getItem("calendarData");
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  });

  const [viewMode, setViewMode] = useState("main");

  const todaySchedules = calendarData[selectedDate] || [];

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("timerRecords", JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }, [calendarData]);

  const handleDeleteSchedule = (date, idx) => {
    setCalendarData((prev) => {
      const updated = { ...prev };
      updated[date].splice(idx, 1);
      if (updated[date].length === 0) delete updated[date];
      return updated;
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <div
          className="logo"
          onClick={() => {
            setViewMode("main");
            const today = new Date();
            setSelectedDate(
              `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
            );
          }}
        >
          M✱MiT
        </div>
        <nav>
          <button onClick={() => setViewMode("schedule")}>일정</button>
          <button>설정</button>
        </nav>
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      <main className="main-layout">
        {viewMode === "main" && (
          <>
            <aside className="left-panel">
              <h3>오늘의 할 일</h3>
              <ul>
                {todaySchedules.map((item, i) => (
                  <li key={i}>{item.title}</li>
                ))}
              </ul>
            </aside>

            <section className="center-panel">
              <CalendarHeader />
              <Calendar
                calendarData={calendarData}
                onDateClick={setSelectedDate}
              />
            </section>

            <aside className="right-panel">
              <Timer onRecord={(r) => setRecords([...records, r])} />
              <WeeklyRecord
                records={records}
                onUpdateMemo={(index, newMemo) => {
                  setRecords((prev) => {
                    const updated = [...prev];
                    if (updated[index]) updated[index].memo = newMemo;
                    return updated;
                  });
                }}
              />
            </aside>
          </>
        )}

        {viewMode === "schedule" && (
          <ScheduleManager
            calendarData={calendarData}
            setCalendarData={setCalendarData}
            onBack={() => setViewMode("main")}
          />
        )}
      </main>
    </div>
  );
}
