import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ isLoading, setIsLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const context = useOutletContext();
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (username && password) {
      try {
        const body = { username, password };
        const response = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

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
  };

  return (
    <div>
      <form
        action="POST"
        onSubmit={onSubmitForm}
        className="flex flex-col gap-2 py-5 mx-2 md:w-[480px] md:mx-auto"
      >
        <input
          className="p-2"
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          required
        />
        <input
          className="p-2"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
        <button
          type="submit"
          className="py-2 mt-5 mx-auto w-80 rounded-lg bg-orange-500 text-white"
        >
          login
        </button>
      </form>

      <div className="text-center mt-5 text-blue-600">
        <Link to={"/sign-up"}>Create account</Link>
      </div>
    </div>
  );
};
export default Login;
