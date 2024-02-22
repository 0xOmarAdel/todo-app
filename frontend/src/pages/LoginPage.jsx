import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(username, password);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-96">
        <h1 className="text-4xl font-bold mb-4 flex justify-center">Login</h1>
        <form onSubmit={submitHandler} className="space-y-8 px-8 lg:px-0">
          <Input
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={setUsername}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={setPassword}
          />
          <Button type="submit" text="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
