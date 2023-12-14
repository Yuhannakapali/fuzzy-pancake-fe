"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("please fill all the credentials");
      return;
    }
    setError("");
    const res = await axios.post("http://localhost:8000/api/signup", {
      username: name,
      email,
      password,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.newUser.error) {
      setError(res.data.newUser.error);
      return;
    }
    console.log(res.data);
    if (res.data.newUser) {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <div className="mx-auto w-40 text-lg">
        <h1 className="text-4xl mb-3"> Signup</h1>
        <form className="flex flex-col gap-2" onSubmit={signUp}>
          <label htmlFor="name">
            Username:
            <input
              type="text"
              id="name"
              name="name"
              className="border-2 border-black p-1"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              name="email"
              className="border-2 border-black p-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              className="border-2 border-black p-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="border-2 border-blue-700 rounded w-full p-1 mt-4 bg-blue-100"
          >
            Signup
          </button>
          <p className="text-red-600 ">{error}</p>
        </form>
      </div>
    </>
  );
};

export default Signup;
