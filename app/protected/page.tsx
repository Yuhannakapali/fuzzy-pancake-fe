"use client";

import React from "react";

const Protected = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
    }
  }

  return (
    <>
      <main>
        <div>
          This is the protected route but you can access it as you are logged in
        </div>
        <div>
          <input type="text" />
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
