import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import {
  Home,
  Onboard,
  Playground,
  Remix,
  Gfel,
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
import Bulletin from "../components/bulletin/Bulletin";

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
        <Route path="/bulletin" element={<Bulletin />}></Route>
        <Route path="bulletin/:askId" element={<ListDetail />} />
        
        <Route path="/playground" element={<Playground />}>
          <Route index element={<Navigate to="faq" replace />} />
          <Route path="faq" element={<Faq />} />

          <Route path="propose-item" element={<ProposeItem />} />
          <Route path="propose-list" element={<ProposeList />} />
          <Route path="bulletin" element={<Lists />} />
          <Route path="bulletin/:listId" element={<ListDetail />} />
          <Route path="bulletin/:listId/:itemId" element={<ItemDetail />} />

          <Route path="reports" element={<Reports domain={"g0v"} />} />
          <Route path="commons-reports" element={<Reports domain={"commons"} />} />
          <Route path="review" element={<Review />} />
          <Route path="responses" element={<Responses />} />
          {/* <Route path="curves" element={<Curves />} /> */}
        </Route>

        <Route path="/gfel" element={<Gfel />}>
        </Route>


        <Route path="/remix" element={<Remix />}>
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
