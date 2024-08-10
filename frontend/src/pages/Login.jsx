import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ isLoading, setIsLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const context = useOutletContext();
  const navigate = useNavigate();
  return (
    <div>
      <form
        action="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          if (username && password) {
            try {
              const body = { username, password };
              const response = await fetch(
                "http://localhost:3000/api/users/login",
                {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body)
                }
              );

              const loginData = await fetch(
                "http://localhost:3000/api/users/profile",
                {
                  credentials: "include"
                }
              );
              const _data = await loginData.json();
              console.log("_data---", _data);
              context.setUserData(_data);
              setIsLoading(false);
              navigate("/");
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Please complete input fields");
          }
        }}
      >
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          required
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
        <button type="submit" className="border bg-orange-400">
          login
        </button>
      </form>

      <div>
        <Link to={"/sign-up"}>Create account</Link>
      </div>
    </div>
  );
};
export default Login;
