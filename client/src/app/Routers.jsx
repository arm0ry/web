import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import {
  Home,
  Onboard,
  Playground,
  Funding,
  ProposeItem,
  ItemDetail,
  Donate,
  Lists,
  ListDetail,
  Review,
  ProposeList,
  Curves,
  Responses,
  Faq
} from "../components";
import Reports from "../components/playground/reports/Reports";
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
          <Route path="faq" element={<Faq />} />
          <Route path="reports" element={<Reports domain={"g0v"} />} />
          <Route path="bulletin" element={<Lists domain={"commons"} />} />
          <Route path="bulletin/:listId" element={<ListDetail domain={"commons"} />} />
          <Route path="bulletin/:listId/:itemId" element={<ItemDetail domain={"commons"} />} />
          <Route path="commons-reports" element={<Reports domain={"commons"} />} />
          {/* <Route path="tasks" element={<Tasks />} /> */}
          {/* <Route path="tasks/:taskId" element={<ItemDetail />} /> */}
          <Route path="review" element={<Review />} />
          {/* <Route path="curves" element={<Curves />} /> */}
          <Route path="responses" element={<Responses />} />
          <Route path="propose-item" element={<ProposeItem domain={"commons"} />} />
          <Route path="propose-list" element={<ProposeList domain={"commons"} />} />
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
