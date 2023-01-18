import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Onboard, Playground, Funding, Admin  } from "../components";
import  ScrollToTop  from "../utils/ScrollToTop";

const Routers = () => {
    return (
        <>
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/onboard" element={<Onboard />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/funding" element={<Funding />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </>
    )
}

export default Routers