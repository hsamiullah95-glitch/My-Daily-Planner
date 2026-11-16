
import {
  CheckCircle2,
  ListTodo,
  Target
} from "lucide-react";

export default function Statistics({ tasks, progress }) {
  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const remaining = tasks.length - completed;

  return (
    <section className="stats-grid">

      {/* Total Tasks */}
      <article className="stat-card">

        <div className="stat-icon purple">
          <ListTodo size={20} />
        </div>

        <div>
          <span>Total for today</span>
          <strong>{tasks.length}</strong>
          <small>Tasks planned</small>
        </div>

      </article>

      {/* Completed Tasks */}
      <article className="stat-card">

        <div className="stat-icon green">
          <CheckCircle2 size={20} />
        </div>

        <div>
          <span>Completed</span>
          <strong>{completed}</strong>
          <small>Great work!</small>
        </div>

      </article>

      {/* Remaining Tasks */}
      <article className="stat-card">

        <div className="stat-icon orange">
          <Target size={20} />
        </div>

        <div>
          <span>Still to do</span>
          <strong>{remaining}</strong>
          <small>One step at a time</small>
        </div>

      </article>

      {/* Daily Progress */}
      <article className="stat-card progress-card">

        <div className="progress-top">
          <span>Daily progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`
            }}
          />
        </div>

        <small>Keep up the momentum</small>

      </article>

    </section>
  );
}
