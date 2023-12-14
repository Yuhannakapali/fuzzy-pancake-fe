"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("please fill all the credentials");
      return;
    }
    setError("");
    const res = await axios.post("http://localhost:8000/api/login", {
      email,
      password,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(res.data.user.error) {
      setError(res.data.user.error);
      return;
    }
    console.log(res.data);
    if (res.data.user) {
      const user = JSON.stringify(res.data.user);
      localStorage.setItem("user",user);
      window.location.href = "/protected";
    } else {
      setError(res.data.message);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4 m-auto w-40" onSubmit={handleSubmit}>
        <label htmlFor="email">
          email:
          <input
            type="text"
            id="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-black"
          />
        </label>
        <label htmlFor="password">
          password:
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className=" border-2 border-black"
          />
        </label>
        <p className="text-red-700 text-sm">{error}</p>
        <button
          type="submit"
          className="border-none bg-gray-600 rounded text-orange-400 p-3 w-full"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
