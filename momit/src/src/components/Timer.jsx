import React, { useEffect, useState } from "react";
import "./Timer.css";

export default function Timer({ onRecord }) {
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [now, setNow] = useState(new Date());
  const [memo, setMemo] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
      if (startTime) {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const formatTimeWithSeconds = (date) => {
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    const s = String(date.getSeconds()).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const formatElapsedTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleStart = () => {
    setStartTime(Date.now());
    setElapsed(0);
  };

  const handleStop = () => {
    console.log("저장 시 메모:", memo); // 디버그용 출력
    if (onRecord) {
      const end = new Date();
      const record = {
        start: new Date(startTime).toLocaleTimeString("ko-KR", {
          hour12: false,
        }),
        end: end.toLocaleTimeString("ko-KR", { hour12: false }),
        duration: formatElapsedTime(elapsed),
        memo: memo || "메모 없음",
      };
      console.log("기록에 저장할 데이터:", record); // 디버그용 출력
      onRecord(record);
    }
    setStartTime(null);
    setElapsed(0);
    setMemo("");
  };

  return (
    <div className="timer-container">
      <div className="date-text">
        {now.getFullYear()}년 {now.getMonth() + 1}월 {now.getDate()}일
      </div>

      <div className="clock-text">{formatTimeWithSeconds(now)}</div>
      <div className="elapsed-text">+ {formatElapsedTime(elapsed)}</div>

      <textarea
        placeholder="메모를 입력하세요"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <div className="button-group">
        {!startTime ? (
          <button className="start-button" onClick={handleStart}>
            기록 시작
          </button>
        ) : (
          <button className="stop-button" onClick={handleStop}>
            기록 저장
          </button>
        )}
      </div>
    </div>
  );
}
