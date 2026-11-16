
import { useState } from "react";
import { X, CalendarDays } from "lucide-react";

export default function TaskForm({
  task,
  onSave,
  onClose
}) {
  const [title, setTitle] = useState(
    task?.title || ""
  );

  const [category, setCategory] = useState(
    task?.category || "Personal"
  );

  const [date, setDate] = useState(
    task?.date ||
    new Date().toISOString().slice(0, 10)
  );

  const [priority, setPriority] = useState(
    task?.priority || "Medium"
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSave({
      title: title.trim(),
      category,
      date,
      priority
    });
  }

  return (
    <div className="modal-backdrop">

      <form
        className="task-modal"
        onSubmit={handleSubmit}
      >

        <div className="modal-heading">

          <div>
            <span className="eyebrow">
              MAKE A PLAN
            </span>

            <h2>
              {task ? "Edit Task" : "Add New Task"}
            </h2>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        {/* Task Name */}
        <label className="form-field">

          <span>Task Name</span>

          <input
            type="text"
            placeholder="What would you like to do?"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            maxLength={90}
            required
          />

        </label>

        {/* Category and Priority */}
        <div className="form-row">

          <label className="form-field">

            <span>Category</span>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>

          </label>

          <label className="form-field">

            <span>Priority</span>

            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value)
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

          </label>

        </div>

        {/* Date */}
        <label className="form-field">

          <span>
            <CalendarDays size={14} />
            Due Date
          </span>

          <input
            type="date"
            value={date}
            onChange={(event) =>
              setDate(event.target.value)
            }
            required
          />

        </label>

        {/* Buttons */}
        <div className="modal-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-button"
          >
            {task ? "Save Changes" : "Add Task"}
          </button>

        </div>

      </form>

    </div>
  );
}
