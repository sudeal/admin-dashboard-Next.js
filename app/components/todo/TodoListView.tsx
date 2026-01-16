"use client";

import { useEffect, useMemo, useState } from "react";

type TodoItem = {
  id: string;
  text: string;
  done: boolean;
  starred: boolean;
  createdAt: number;
};

const LS_KEY = "ds_todos_v1";

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function loadTodos(): TodoItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as TodoItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTodos(items: TodoItem[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  } catch {
   
  }
}

const seed: TodoItem[] = [
  { id: "t1", text: "Meeting with CEO", done: false, starred: false, createdAt: Date.now() },
  { id: "t2", text: "Pick up kids from school", done: false, starred: true, createdAt: Date.now() },
  { id: "t3", text: "Shopping with Brother", done: false, starred: false, createdAt: Date.now() },
  { id: "t4", text: "Review with HR", done: false, starred: false, createdAt: Date.now() },
  { id: "t5", text: "Going to Dia's School", done: false, starred: false, createdAt: Date.now() },
  { id: "t6", text: "Check design files", done: false, starred: true, createdAt: Date.now() },
  { id: "t7", text: "Update File", done: false, starred: false, createdAt: Date.now() },
];

export default function TodoListView() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  
  const [modalOpen, setModalOpen] = useState(false);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const fromLs = loadTodos();
    if (fromLs.length > 0) {
      setTodos(fromLs);
    } else {
      setTodos(seed);
      saveTodos(seed);
    }
  }, []);

  useEffect(() => {
    if (todos.length === 0) return;
    saveTodos(todos);
  }, [todos]);

  const sorted = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (a.starred !== b.starred) return a.starred ? -1 : 1;
      if (a.done !== b.done) return a.done ? 1 : -1;
      return b.createdAt - a.createdAt;
    });
  }, [todos]);

  const openModal = () => {
    setNewText("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNewText("");
  };

  const addTask = () => {
    const v = newText.trim();
    if (!v) return;

    const next: TodoItem = {
      id: uid(),
      text: v,
      done: false,
      starred: false,
      createdAt: Date.now(),
    };

    const updated = [next, ...todos];
    setTodos(updated);
    saveTodos(updated);
    closeModal();
  };

  const toggleDone = (id: string) => {
    const updated = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    setTodos(updated);
    saveTodos(updated);
  };

  const toggleStar = (id: string) => {
    const updated = todos.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t));
    setTodos(updated);
    saveTodos(updated);
  };

  const removeTask = (id: string) => {
    const updated = todos.filter((t) => t.id !== id);
    setTodos(updated);
    saveTodos(updated);
  };

  return (
    <div className="td-page">
      <div className="td-topbar">
        <h1 className="td-title">To-Do List</h1>

        <button className="td-add-btn" type="button" onClick={openModal}>
          Add New Task
        </button>
      </div>

      <div className="td-list">
        {sorted.map((t) => (
          <div key={t.id} className={`td-item ${t.done ? "is-done" : ""}`}>
            <button
              className={`td-check ${t.done ? "is-checked" : ""}`}
              type="button"
              onClick={() => toggleDone(t.id)}
              aria-label="Toggle done"
            >
              {t.done ? <i className="bi bi-check" /> : null}
            </button>

            <div className="td-text">{t.text}</div>

            <div className="td-actions">
              <button
                className={`td-icon ${t.starred ? "is-starred" : ""}`}
                type="button"
                onClick={() => toggleStar(t.id)}
                aria-label="Star"
              >
                <i className={`bi ${t.starred ? "bi-star-fill" : "bi-star"}`} />
              </button>

              <button
                className="td-icon td-icon--danger"
                type="button"
                onClick={() => removeTask(t.id)}
                aria-label="Delete"
              >
                <i className="bi bi-trash" />
              </button>
            </div>
          </div>
        ))}

        {sorted.length === 0 && <div className="td-empty">No tasks yet.</div>}
      </div>

    
      {modalOpen && (
        <div className="td-modal-overlay" role="dialog" aria-modal="true" onMouseDown={closeModal}>
          <div className="td-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="td-modal__header">
              <div className="td-modal__title">Add New Task</div>
              <button className="td-modal__close" type="button" onClick={closeModal} aria-label="Close">
                <i className="bi bi-x" />
              </button>
            </div>

            <div className="td-modal__body">
              <div className="td-modal__label">New task:</div>
              <input
                className="td-modal__input"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter task description"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTask();
                  if (e.key === "Escape") closeModal();
                }}
              />
            </div>

            <div className="td-modal__footer">
              <button className="td-modal__btn td-modal__btn--ghost" type="button" onClick={closeModal}>
                Cancel
              </button>
              <button className="td-modal__btn td-modal__btn--primary" type="button" onClick={addTask}>
                Okey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
