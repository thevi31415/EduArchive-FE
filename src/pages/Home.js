import Slider from "../component/Slider";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [users, setUser] = useState([]);
  const token = sessionStorage.getItem("Token");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUser(data.data);
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold underline bg-gray-50">Trang chủ</h1>;
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/user/${user.id}`}>{user.userName}</Link>
        </div>
      ))}
      <div>
        <h2>User Profile</h2>
      </div>
    </div>
  );
}
export default Home;
