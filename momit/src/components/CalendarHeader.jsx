import React, { useState, useEffect } from "react";

export default function CalendarHeader() {
  const [currentYear, setCurrentYear] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [recommend, setRecommend] = useState("");
  const [status, setStatus] = useState("아직 활동을 입력하지 않았어요");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    setCurrentYear(year);
    setCurrentMonth(month);
    setCurrentDate(date);

    // 추천 불러오기
    fetch("/recommendations.json")
      .then((res) => res.json())
      .then((data) => {
        const monthKey = `${month}월`;
        const theme = data[monthKey]?.theme || "";
        setRecommend(theme);
      });

    // 입력 여부 확인
    const key = `${month}-${date}`;
    const saved = localStorage.getItem("calendarEntries");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed[key]) {
        setStatus("오늘의 활동 완료 ✅");
      }
    }
  }, []);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2>
        오늘은 {currentMonth}월 {currentDate}일 ✱
      </h2>
      <p>
        오늘의 활동: <strong>{recommend}</strong>
      </p>
      <p>
        입력 상태: <strong>{status}</strong>
      </p>
    </div>
  );
}
