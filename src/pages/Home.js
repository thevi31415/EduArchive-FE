import Slider from "../component/Slider";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [users, setUser] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/user`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data.data);
        console.log(data);
      });
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
