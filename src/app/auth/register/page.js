"use client";

import React, { useState } from "react";
import { RegisterUser } from "../../../../api/auth";
import { useRouter } from "next/navigation";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("两次密码不匹配");
      return;
    }
    try {
      const res = await RegisterUser({email, password});
      alert(res.message)
      router.push("/dashboard");
    } catch (error) {
      console.error("注册失败", error);
      setError("注册失败，请重试");
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
            placeholder="Entry Email Address"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            vapue={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          {error && <p>{error}</p>}
          <button type="submit">注册</button>
        </form>
      </div>
    </>
  );
}
export default Register;
