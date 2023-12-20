"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e:any) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInfo.email || !userInfo.password) {
      setError("please fill all the credentials");
      return;
    }

    setError("");
    const res = await axios.post("http://localhost:8000/api/login", {
    ...userInfo,
    },{
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.user.error) {
      setError(res.data.user.error);
      return;
    }

    if (res.data.user) {
      const user = JSON.stringify(res.data.user);
      Cookies.set("user", user, {
        expires: 0.1,
      }); 
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
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="border-2 border-black"
          />
        </label>
        <label htmlFor="password">
          password:
          <input
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
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
