import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/users/profile", {
        credentials: "include"
      });
      const dbData = await response.json();
      if (!ignore) {
        setUserData(dbData);
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <header className="bg-orange-500 text-extWhite  md:flex justify-between items-center px-5 py-3">
        <h1 className="text-3xl font-semibold mb-5 text-center">
          <Link to={"/"}>Odin Inventory App</Link>
        </h1>
        <nav className="flex justify-center gap-5 mx-auto">
          <Link to={"/items"}>
            <div>All Items</div>
          </Link>
          <Link to={"/categories"}>
            <div>All Catetgories</div>
          </Link>
          <Link to={"/admin"}>
            <div>Admin</div>
          </Link>
        </nav>
      </header>
      <div>
        <Outlet
          context={{ userData: userData, setUserData: setUserData }}
        ></Outlet>
      </div>
      <div>hello {userData.username}</div>
    </>
  );
}

export default App;
