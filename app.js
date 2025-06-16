const days = ["Monday", "Tuesday", "Friday"];

const Navbar = () => (
  <nav className="navbar">
    <h1>💪 Workout Routine Task Manager 🏋️‍♂️</h1>
    <div className="day-menu">
      {days.map((day, index) => (
        <button key={index} className="day-button">{day}</button>
      ))}
    </div>
  </nav>
);

const TaskItem = ({ task }) => (
  <li className="task-item">
    <div className="task-content">
      <span className="emoji">{task.emoji}</span>
      <strong>{task.title}</strong>
    </div>
    <div className="buttons">
      <button className="done">✅ Done</button>
      <button className="pending">⏳ Pending</button>
    </div>
  </li>
);

const TaskList = () => {
  const tasks = [
  { title: "Warm-up (5 min)", emoji: "🔥" },
  { title: "HIIT Cardio (20 min)", emoji: "🏃‍♀️" },
  { title: "Upper Body Strength", emoji: "🏋️‍♂️" },
  { title: "Stretching", emoji: "🧘‍♂️" },
  { title: "Post-workout Meditation", emoji: "🧘‍♀️" }
];


  return (
    <div className="task-wrapper">
      <ul className="task-list">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
      </ul>
    </div>
  );
};

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2025 FitRoutine · Wellness First 💚</p>
  </footer>
);

const App = () => (
  <div className="container">
    <Navbar />
    <div className="content">
      <main>
        <TaskList />
      </main>
    </div>
    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
