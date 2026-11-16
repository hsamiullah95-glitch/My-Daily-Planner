
import { Bell, Plus } from "lucide-react";

export default function Header({ onAddTask }) {
  return (
    <header className="topbar">

      <div className="breadcrumb">
        Workspace
        <span>/</span>
        <strong>My Day</strong>
      </div>

      <div className="topbar-actions">

        <span className="today-label">
          A fresh start, every day
        </span>

        <button
          className="icon-button"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
        </button>

        <button
          className="top-add-button"
          onClick={onAddTask}
        >
          <Plus size={17} />
          New Task
        </button>

      </div>

    </header>
  );
}
