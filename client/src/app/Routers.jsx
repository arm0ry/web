import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  Home,
  Onboard,
  Playground,
  Funding,
  Admin,
  ProposeTask,
  Tasks,
  TaskDetail,
  Donate,
} from "../components";
import { Navbar, Footer } from "../components/layout";
import ScrollToTop from "@utils/ScrollToTop";

const HomeLayout = (component) => (
  <>
    <Navbar />
    <div className="mt-16 min-h-[90vh]">{component}</div>
    <Footer />
  </>
);

const Routers = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={HomeLayout(<Home />)} />
        <Route path="/onboard" element={HomeLayout(<Onboard />)} />
        <Route path="/playground" element={<Playground />}>
          <Route path="propose-task" element={<ProposeTask />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<TaskDetail />} />
        </Route>

        <Route path="/funding" element={HomeLayout(<Funding />)} />
        <Route path="/donate" element={HomeLayout(<Donate />)} />
        {/* <Route path="/admin" element={HomeLayout(<Admin />)} /> */}
        <Route path="*" element={HomeLayout(<Navigate to="/" replace />)} />
      </Routes>
    </>
  );
};

export default Routers;
