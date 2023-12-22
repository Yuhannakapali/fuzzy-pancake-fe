"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const Signup = () => {
  const [newUserInfo, setNewUserInfo] = useState({
    email: "",  
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setNewUserInfo({ ...newUserInfo, [e.target.name] : e.target.value });
  };

  const signUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!newUserInfo.username || !newUserInfo.email || !newUserInfo.password) {
      setError("please fill all the credentials");
      return;
    }
    setError("");
    const res = await axios.post(
      "http://localhost:8000/api/signup",
      { ...newUserInfo },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.newUser.error) {
      setError(res.data.newUser.error);
      return;
    }
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
              name="username"
              value={newUserInfo.username}
              className="border-2 border-black p-1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              name="email"
              value={newUserInfo.email}
              className="border-2 border-black p-1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={newUserInfo.password}
              className="border-2 border-black p-1"
              onChange={handleChange}
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
