// components/CalendarHeader.jsx
import React, { useState, useEffect } from "react";

// 아래에 넣어놓으면 랜덤으로 나옴~
const recommendations = [
  "나만의 플레이리스트 만들기",
  "운동 루틴 점검하기",
  "독서 목표 세우기",
  "새로운 요리 도전하기",
  "사진 정리하기",
];

export default function CalendarHeader() {
  const [currentYear, setCurrentYear] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [recommend, setRecommend] = useState("");

  useEffect(() => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth() + 1);
    const randIndex = Math.floor(Math.random() * recommendations.length);
    setRecommend(recommendations[randIndex]);
  }, []);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2>{currentMonth}월 ✱</h2>
      <p>
        오늘의 추천: <strong>{recommend}</strong>
      </p>
    </div>
  );
}
