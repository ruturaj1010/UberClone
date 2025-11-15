import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Home from "./pages/Home";
import UserProtectRoute from "./pages/UserProtectRoute";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectRoute from "./pages/CaptainProtectRoute";
import Riding from "./pages/Riding";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route
          path="/home"
          element={
            <UserProtectRoute>
              <Home />
            </UserProtectRoute>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectRoute>
              <UserLogout />
            </UserProtectRoute>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectRoute>
              <CaptainHome />
            </CaptainProtectRoute>
          }
        />
        <Route path="*" element={<Start />} />
      </Routes>
    </>
  );
}

export default App;
