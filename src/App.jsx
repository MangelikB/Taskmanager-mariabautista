import Navbar from './components/ Navbar';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

const days = ["Monday", "Tuesday", "Friday"];

const tasks = [
  { title: "Warm-up (5 min)", emoji: "🔥" },
  { title: "HIIT Cardio (20 min)", emoji: "🏃‍♀️" },
  { title: "Upper Body Strength", emoji: "🏋️‍♂️" },
  { title: "Stretching", emoji: "🧘‍♂️" },
  { title: "Post-workout Meditation", emoji: "🧘‍♀️" }
];

function App() {
  return (
    <div className="container">
      <Navbar days={days} />
      <main className="content">
        <TaskList tasks={tasks} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
