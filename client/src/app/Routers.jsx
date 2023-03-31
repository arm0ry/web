import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import {
  Home,
  Onboard,
  Playground,
  Funding,
  // Admin,
  ProposeTask,
  Tasks,
  TaskDetail,
  Donate,
  Missions,
  MissionDetail,
  Review,
  TravelerPass,
  Quest,
  Manager,
  ProposeMission,
  SetTask,
  SetMission
} from "../components";
import { Navbar, Footer } from "../components/layout";
import { useGlobalContext } from "@context/store";
import ScrollToTop from "@utils/ScrollToTop";

const ProtectedRoute = (children) => {
  // const { token } = useAuth();
  const { userInfo } = useGlobalContext();
  const location = useLocation();

  if (!userInfo.isManager) {
    return <Navigate to="/playground" replace state={{ from: location }} />;
  }

  return children;
};

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
          <Route index element={<Navigate to="traveller-pass" replace />} />
          <Route path="traveller-pass" element={<TravelerPass />} />
          <Route path="my-quest" element={<Quest />} />
          <Route path="my-quest/:taskId" element={<TaskDetail />} />
          <Route path="missions" element={<Missions />} />
          <Route path="missions/:missionId" element={<MissionDetail />} />
          <Route path="missions/:missionId/:taskId" element={<TaskDetail />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:taskId" element={<TaskDetail />} />
          <Route path="review" element={<Review />} />
          <Route path="propose-task" element={<ProposeTask />} />
          <Route path="propose-mission" element={<ProposeMission />} />
          <Route path="manager" element={<Manager />} />
          {/* <Route path="manager/set-task" element={<SetTask />} />
          <Route path="manager/set-mission" element={<SetMission />} /> */}
          <Route path="manager/set-task" element={ProtectedRoute(<SetTask />)} />
          <Route path="manager/set-mission" element={ProtectedRoute(<SetMission />)} />
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
