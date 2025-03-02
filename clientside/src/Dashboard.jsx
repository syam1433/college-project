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
    <div className="maindiv">
      <h2>Student List</h2>
      <ul className="list">
        {students.map((student) => (
          <button onClick={()=>navigate(`/student/${student.id}`)} className="listbutton">
            <li key={student.no}>
            {student.id} - Name: {student.name}
            </li>
          </button>
        ))}
      </ul>
      <div>
        <button onClick={handleLogout} className="button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
