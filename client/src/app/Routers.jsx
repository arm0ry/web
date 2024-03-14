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
  QuestDetail,
  Manager,
  ProposeMission,
  SetTask,
  SetMission,
  Curves,
  Responses,
  Faq
} from "../components";
import Supporters from "../components/playground/supporters/Supporters";
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
          <Route index element={<Navigate to="faq" replace />} />
          {/* <Route path="traveler-pass" element={<TravelerPass />} /> */}
          <Route path="supporters" element={<Supporters domain={"g0v"} />} />
          <Route path="commons-supporters" element={<Supporters domain={"commons"} />} />
          {/* <Route path="my-quest" element={<Quest />} /> */}
          {/* <Route path="my-quest/:questId" element={<QuestDetail />} /> */}
          {/* <Route path="my-quest/:questId/:taskId" element={<TaskDetail />} /> */}
          <Route path="missions" element={<Missions domain={"g0v"} />} />
          <Route path="missions/:missionId" element={<MissionDetail />} />
          <Route path="missions/:missionId/:taskId" element={<TaskDetail />} />
          <Route path="commons-missions" element={<Missions domain={"commons"} />} />
          <Route path="commons-missions/:missionId" element={<MissionDetail domain={"commons"} />} />
          <Route path="commons-missions/:missionId/:taskId" element={<TaskDetail domain={"commons"} />} />
          {/* <Route path="tasks" element={<Tasks />} /> */}
          {/* <Route path="tasks/:taskId" element={<TaskDetail />} /> */}
          <Route path="faq" element={<Faq />} />
          <Route path="review" element={<Review />} />
          {/* <Route path="curves" element={<Curves />} /> */}
          <Route path="responses" element={<Responses />} />
          <Route path="propose-task" element={<ProposeTask domain={"g0v"} />} />
          <Route path="propose-mission" element={<ProposeMission domain={"g0v"} />} />
          <Route path="propose-commons-task" element={<ProposeTask domain={"commons"} />} />
          <Route path="propose-commons-mission" element={<ProposeMission domain={"commons"} />} />
          {/* <Route path="manager" element={<Manager />} /> */}
          {/* <Route path="manager/set-task" element={<SetTask />} />
          <Route path="manager/set-mission" element={<SetMission />} /> */}
          {/* <Route path="manager/set-task" element={ProtectedRoute(<SetTask />)} /> */}
          {/* <Route path="manager/set-mission" element={ProtectedRoute(<SetMission />)} /> */}
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
