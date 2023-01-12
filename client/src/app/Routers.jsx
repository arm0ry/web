import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Onboard, Playground, Funding  } from "../components";

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/onboard" element={<Onboard />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/funding" element={<Funding />} />
            </Routes>
        </>
    )
}

export default Routers