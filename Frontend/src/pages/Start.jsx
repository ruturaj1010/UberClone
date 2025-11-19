import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-right bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000)] h-screen w-scree flex justify-between flex-col">
        <img
          className="w-1/4 pt-5 pl-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png"
          alt="img"
        />
        <div className="w-full px-10 py-5 text-center bg-white">
          <h1 className="text-2xl font-bold mb-3 ">Get started with Uber</h1>
          <Link
            to="/login"
            className="flex justify-center items-center rounded-lg bg-black text-zinc-50 w-full py-2 text-[22px] font-semibold border-2"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
