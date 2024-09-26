import React, { useState, useEffect } from "react";
import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from "@mantine/form";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useAuth } from "../AuthContext";
import { loginUser } from "./authServices";
import classes from "./LoginForm.module.css";
import { Navigate } from "react-router-dom";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [branchId, setBranchId] = useState(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    console.log("P&USer", username);
    console.log("pass:", password);
    if (username === "" || password === "") {
      alert("Please fill your username and password");
      return;
    }

    try {
      const data = await loginUser(username, password);
      const { access, refresh_token } = data.token;
      console.log("inlogin data", data);
      const role = data.role;
      const branch_id = data.branch_id;
      const gym_id = data.gym_id;
      setBranchId(data.branch_id);

      login(access, refresh_token, role, data.username, branch_id, gym_id);
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message);
    }
  };

  console.log("branch", branchId);

  return (
    <form>
      <TextInput
        label="Email"
        type="email"
        placeholder="your_mail@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        label="Username"
        placeholder="loulia12"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <PasswordInput
        type="password"
        label="Passowrd"
        placeholder="****"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button onClick={handleLogin} className={classes.btn}>
        Login
      </Button>
    </form>
  );
};
export default LoginForm;
