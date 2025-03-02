import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loginpage from "./Loginpage";
import Dashboard from "./Dashboard";
import StudentDetails from "./StudentDash";
import { useauthstore } from "./store/authuser";

function App() {
  const { isAuthenticated, checkAuth } = useauthstore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, [checkAuth]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Loginpage />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/student/:id" element={isAuthenticated ? <StudentDetails /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
