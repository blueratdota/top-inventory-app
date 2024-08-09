import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setUsertype] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <form
        action="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          if (username && password && user_type) {
            try {
              const body = { username, password, user_type };
              const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
              });
              navigate("/admin");
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
        <Select
          placeholder="Usertype"
          isRequired={true}
          icon={false}
          onChange={(e) => {
            setUsertype(e.target.value);
          }}
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </Select>
        <button type="submit" className="border bg-green-300">
          Sign up
        </button>
      </form>
    </div>
  );
};
export default Signup;
