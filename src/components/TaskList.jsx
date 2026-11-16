
import {
  CalendarDays,
  Check,
  Pencil,
  Trash2
} from "lucide-react";

function formatDate(dateValue) {
  if (!dateValue) {
    return "No date";
  }

  return new Date(
    `${dateValue}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggle
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">

        <div className="empty-icon">
          <CalendarDays size={27} />
        </div>

        <h3>No Tasks Found</h3>

        <p>
          Add a new task to get started.
        </p>

      </div>
    );
  }

  return (
    <div className="task-list">

      {tasks.map((task) => (

        <article
          className={
            task.completed
              ? "task-card is-complete"
              : "task-card"
          }
          key={task.id}
        >

          {/* Complete Button */}
          <button
            className={
              task.completed
                ? "complete-button checked"
                : "complete-button"
            }
            onClick={() => onToggle(task.id)}
            aria-label="Complete task"
          >
            {task.completed && (
              <Check size={15} />
            )}
          </button>

          {/* Task Information */}
          <div className="task-details">

            <h3>{task.title}</h3>

            <div className="task-meta">

              <span
                className={
                  `category-tag ${task.category.toLowerCase()}`
                }
              >
                {task.category}
              </span>

              <span>
                <CalendarDays size={13} />
                {formatDate(task.date)}
              </span>

            </div>

          </div>

          {/* Priority */}
          <span
            className={
              `priority-tag ${task.priority.toLowerCase()}`
            }
          >
            {task.priority}
          </span>

          {/* Edit and Delete */}
          <div className="task-actions">

            <button
              onClick={() => onEdit(task)}
              title="Edit Task"
              aria-label="Edit task"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() => onDelete(task.id)}
              title="Delete Task"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>

          </div>

        </article>

      ))}

    </div>
  );
}
