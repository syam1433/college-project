import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useauthstore } from "./store/authuser";
import "./dashboard.css";

const Dashboard = () => {
  const { students, fetchStudents, logout } = useauthstore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="star">
      {/* Header Section */}
      <div className="headerformate">
        <div className="herderset">
          <h1>Student List</h1>
          <button onClick={handleLogout}>LOG OUT</button>
        </div>
      </div>

      {/* Student List Section */}
      <div className="student-list">
        <div className="list-items">
          {students.map((student) => (
            <a key={student.no} href={`/student/${student.id}`} className="listbutton">
              <p>{student.id}</p>
              <p>{student.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
