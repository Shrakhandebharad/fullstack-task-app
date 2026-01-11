import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }
    fetchProfile();
    fetchTasks();
  }, []);

  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProfile(res.data);
  };

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2>Welcome {profile?.name}</h2>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        <div className="task-input">
          <input
            placeholder="Enter new task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t._id}>
              <span>{t.title}</span>
              <button onClick={() => deleteTask(t._id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
