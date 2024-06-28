"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginUser } from "../../../../api/auth";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await LoginUser({ email, password });
      localStorage.setItem("token", res.token);
      alert("Login successfully");
      router.push("/dashboard");
    } catch (err) {
      alert("Login failed:" + err.message);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entery you password"
            required
          />
          <button type="submit">登录</button>
        </form>
      </div>
    </>
  );
};

export default Login;
