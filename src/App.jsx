
import { useEffect, useState } from "react";

import {
  CalendarDays,
  ClipboardList,
  CheckCheck,
  Plus,
  Search,
  Sparkles
} from "lucide-react";

import Header from "./components/Header";
import Statistics from "./components/Sitic";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "./styles/App.css";

const initialTasks = [
  {
    id: 1,
    title: "Learn React Components",
    category: "Study",
    date: new Date().toISOString().slice(0, 10),
    priority: "High",
    completed: false
  },
  {
    id: 2,
    title: "Work on My Website",
    category: "Work",
    date: new Date().toISOString().slice(0, 10),
    priority: "Medium",
    completed: false
  },
  {
    id: 3,
    title: "Organize Daily Schedule",
    category: "Personal",
    date: new Date().toISOString().slice(0, 10),
    priority: "Low",
    completed: true
  }
];

function getSavedTasks() {
  try {
    const savedTasks = localStorage.getItem(
      "dayflow-tasks"
    );

    return savedTasks
      ? JSON.parse(savedTasks)
      : initialTasks;
  } catch {
    return initialTasks;
  }
}

export default function App() {
  const [tasks, setTasks] = useState(getSavedTasks);

  const [filter, setFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [editingTask, setEditingTask] = useState(null);

  const [showForm, setShowForm] = useState(false);

  // Save tasks in LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "dayflow-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // Add and Edit Task
  function handleSaveTask(taskData) {
    if (editingTask) {
      setTasks((oldTasks) =>
        oldTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...taskData }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData,
        completed: false
      };

      setTasks((oldTasks) => [
        newTask,
        ...oldTasks
      ]);
    }

    setShowForm(false);
    setEditingTask(null);
  }

  // Delete Task
  function handleDeleteTask(id) {
    const confirmDelete = window.confirm(
      "Do you want to delete this task?"
    );

    if (!confirmDelete) return;

    setTasks((oldTasks) =>
      oldTasks.filter((task) => task.id !== id)
    );
  }

  // Complete Task
  function handleToggleTask(id) {
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );
  }

  // Open Add Form
  function handleAddTask() {
    setEditingTask(null);
    setShowForm(true);
  }

  // Open Edit Form
  function handleEditTask(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  // Filter and Search
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && !task.completed) ||
      (filter === "Completed" && task.completed);

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Today's Statistics
  const today = new Date().toISOString().slice(0, 10);

  const todayTasks = tasks.filter(
    (task) => task.date === today
  );

  const completedTasks = todayTasks.filter(
    (task) => task.completed
  ).length;

  const progress = todayTasks.length
    ? Math.round(
        (completedTasks / todayTasks.length) * 100
      )
    : 0;

  return (
    <div className="app-shell">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">
            <ClipboardList size={23} />
          </div>

          <div>
            <h2>DayFlow</h2>
            <span>PERSONAL PLANNER</span>
          </div>
        </div>

        {/* Profile */}
        <div className="profile-card">

          <img
            src="/imag/jan1.png"
            alt="Profile"
            className="profile-photo"
          />

          <div>
            <h3>My Planner</h3>
            <span>Make today count</span>
          </div>

          <span className="online-dot"></span>

        </div>

        <p className="side-label">WORKSPACE</p>

        <button
          className={`side-link ${filter === "All" ? "active" : ""}`}
          onClick={() => setFilter("All")}
        >
          <CalendarDays size={18} />
          My Day
        </button>

        <button
          className={`side-link ${filter === "Active" ? "active" : ""}`}
          onClick={() => setFilter("Active")}
        >
          <ClipboardList size={18} />
          Active Tasks
        </button>

        <button
          className={`side-link ${filter === "Completed" ? "active" : ""}`}
          onClick={() => setFilter("Completed")}
        >
          <CheckCheck size={18} />
          Completed
        </button>

        <div className="sidebar-note">
          <Sparkles size={20} />

          <h4>Small steps, big results.</h4>

          <p>
            Every completed task is a new achievement.
            Keep moving forward!
          </p>
        </div>

        <div className="sidebar-footer">
          Your Personal Workspace
        </div>

      </aside>

      {/* Main Content */}
      <main className="main-area">

        <Header onAddTask={handleAddTask} />

        {/* Welcome Banner */}
        <section className="welcome-banner">

          <div className="banner-copy">

            <span className="eyebrow">
              YOUR DAY, YOUR WAY
            </span>

            <h1>
              Make today <em>productive.</em>
            </h1>

            <p>
              A clear mind starts with a clear plan.
              Let's get things done.
            </p>

            <div className="banner-date">
              <CalendarDays size={16} />

              {new Date().toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                }
              )}
            </div>

          </div>

          <div className="banner-photo"></div>

        </section>

        {/* Statistics */}
        <Statistics
          tasks={todayTasks}
          progress={progress}
        />

        {/* Task Section */}
        <section className="tasks-section">

          <div className="section-heading">

            <div>
              <span className="eyebrow">
                STAY ON TRACK
              </span>

              <h2>
                Today's Tasks

                <span className="task-count">
                  {tasks.length}
                </span>
              </h2>
            </div>

            <button
              className="add-task-button"
              onClick={handleAddTask}
            >
              <Plus size={18} />
              Add Task
            </button>

          </div>

          {/* Search and Filter */}
          <div className="task-toolbar">

            <div className="filter-tabs">

              {["All", "Active", "Completed"].map(
                (item) => (
                  <button
                    key={item}
                    className={
                      filter === item
                        ? "filter-tab selected"
                        : "filter-tab"
                    }
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

            <label className="search-box">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </label>

          </div>

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />

          <p className="bottom-tip">
            Your tasks are saved automatically on this device.
          </p>

        </section>

      </main>

      {/* Task Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

    </div>
  );
}
