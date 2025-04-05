import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login"); // Redirect if not logged in
    }
  }, []);

  return (
    <div>
      <h2>Productos</h2>
      <button onClick={() => {
        localStorage.removeItem("auth");
        navigate("/login");
      }}>Logout</button>
    </div>
  );
}

export default Dashboard;
