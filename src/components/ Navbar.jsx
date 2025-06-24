const Navbar = ({ days, children }) => (
  <nav className="navbar">
    <h1>💪 Workout Routine Task Manager 🏋️‍♂️</h1>
    <div className="day-menu">
      {days.map((day, index) => (
        <button key={index} className="day-button">{day}</button>
      ))}
    </div>
    {children}
  </nav>
);

export default Navbar;
