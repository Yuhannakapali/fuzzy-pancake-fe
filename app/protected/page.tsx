"use client";

import React, { useState } from "react";
import axios from "axios";

const Protected = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
    }
  }

  const [file, setFile] = useState<File>();

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await axios.post("http://localhost:8000/api/upload", data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
    } catch (e: any) {
      console.error(e);
    }
  };
  return (
    <>
      <main>
        <div>
          This is the protected route but you can access it as you are logged in
        </div>
        <div>
          <form onSubmit={uploadFile} id="form" name="form">
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
            <input
              type="submit"
              value="upload"
              className="border-2 rounded border-blue-700 bg-blue-200"
            />
          </form>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="border-2 border-blue-700 rounded bg-blue-200"
        >
          Logout
        </button>
      </main>
    </>
  );
};

export default Protected;
