import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Login from "./Login";

const Admin = ({}) => {
  const context = useOutletContext();
  const [isLoggedIn, setIsLoggedIn] = useState();
  setTimeout(() => {
    if (context.userData.username) {
      console.log("user exists");
    } else {
      console.log("no logged in user");
    }
  }, 2000);

  return (
    <div>
      {isLoggedIn ? <div>display admin stuff here</div> : <Login></Login>}
    </div>
  );
};
export default Admin;
