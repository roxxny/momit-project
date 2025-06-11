import React, { useState } from "react";
import "./WeeklyRecord.css";

export default function WeeklyRecord({ records = [], onUpdateMemo }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const durationToSeconds = (dur) => {
    if (!dur || typeof dur !== "string") return 0;
    const [h, m, s] = dur.split(":").map(Number);
    return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
  };

  const max = records.length
    ? records.reduce(
        (maxRec, r) =>
          durationToSeconds(r.duration) > durationToSeconds(maxRec.duration)
            ? r
            : maxRec,
        { duration: "00:00:00", memo: "" }
      )
    : null;

  const handleMemoClick = (index, memo) => {
    setSelectedIndex(index);
    setEditValue(memo === "메모 없음" || !memo ? "" : memo);
  };

  const handleMemoSave = () => {
    if (onUpdateMemo && typeof editValue === "string") {
      const trimmed = editValue.trim();
      onUpdateMemo(selectedIndex, trimmed || "");
      setSelectedIndex(null);
    }
  };

  return (
    <div className="weekly-record">
      <div className="weekly-header">
        <h3>✨ 이번 주 최장 기록</h3>
      </div>

      {max && (
        <p className="weekly-max">
          {(max.memo && max.memo !== "메모 없음") ? max.memo : "메모를 입력해주세요"} -{" "}
          {Math.floor(durationToSeconds(max.duration) / 60)}분{" "}
          {durationToSeconds(max.duration) % 60}초
        </p>
      )}

      <h4 className="all-list">📋 전체 기록</h4>
      <ul className="weekly-list">
        {records.map((r, i) => {
          const isEditing = selectedIndex === i;
          const displayMemo = r.memo && r.memo !== "메모 없음" ? r.memo : "메모를 입력해주세요";

          return (
            <li key={i} className="weekly-item">
              <div className="weekly-line">
                <span className="weekly-index">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span className="weekly-time">
                  {r.start} - {r.end}
                </span>
                <span
                  className="weekly-memo clickable"
                  onClick={() => handleMemoClick(i, r.memo)}
                >
                  {displayMemo}
                </span>
              </div>

              {isEditing && (
                <div className="weekly-edit-area">
                  <input
                    type="text"
                    className="weekly-input"
                    placeholder="수정할 내용을 입력해주세요"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button className="weekly-save-btn" onClick={handleMemoSave}>
                    수정
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
