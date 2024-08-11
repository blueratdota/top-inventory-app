import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Admin = ({}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const context = useOutletContext();
  const loginData = context.userData;

  // useEffect(() => {
  //   let ignore = false;
  //   setIsLoading(true);
  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:3000/");
  //     const dbData = await response.json();
  //     if (!ignore) {
  //       setIsLoggedIn(true);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();

  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {loginData.username ? (
          <div>
            <p>display admin stuff here</p>
            <div>
              <button
                onClick={async () => {
                  const logout = await fetch(
                    "http://localhost:3000/api/users/logout",
                    {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" }
                    }
                  );
                  context.setUserData([]);
                  navigate("/admin");
                }}
              >
                log out
              </button>
            </div>
          </div>
        ) : (
          <Login isLoading={isLoading} setIsLoading={setIsLoading}></Login>
        )}
      </div>
    );
  }
};
export default Admin;
