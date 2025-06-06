import React, { useState, useEffect } from "react";
import './TodoList.css';

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todayTodos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todayTodos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, done: false }]);
    setInput("");
  };

  const toggleTodo = (index) => {
    const updated = [...todos];
    updated[index].done = !updated[index].done;
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    <div>
      <h3>오늘의 할 일</h3>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul>
        {todos.map((todo, i) => (
          <li key={i} style={{ marginBottom: "0.3rem" }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(i)}
            />
            <span style={{ textDecoration: todo.done ? "line-through" : "none", marginLeft: "0.5rem" }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(i)} style={{ marginLeft: "1rem" }}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
