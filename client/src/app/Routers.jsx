import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  Home,
  Onboard,
  Playground,
  Funding,
  Admin,
  ProposeTask,
  Donate
} from "../components";
import ScrollToTop from "../utils/ScrollToTop";

const Routers = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/playground/proposeTask" element={<ProposeTask />} />
        <Route path="/funding" element={<Funding />} />
        <Route path="/donate" element={<Donate />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Routers;
