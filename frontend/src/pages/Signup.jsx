import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setUsertype] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
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
        <Select
          className="bg-white p-2"
          placeholder="usertype"
          isRequired={true}
          icon={false}
          onChange={(e) => {
            setUsertype(e.target.value);
          }}
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </Select>
        <button
          type="submit"
          className="py-2 mt-5 mx-auto w-80 rounded-lg bg-orange-500 text-white"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};
export default Signup;
