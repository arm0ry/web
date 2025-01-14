import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@context/store";
import ResourceCard from "./ResourceCard";

const Resources = () => {
  const { bulletin } = useGlobalContext();
  return (
    <div className="flex flex-col h-screen bg-amber-50">
      <label className="p-4 mb-2 text-2xl font-bold text-gray-900">
          大松資源列表
      </label>
      <div className="m-4 grid grid-cols-2 gap-5">
        {Object.keys(bulletin.resources).map((id) => {
          return <ResourceCard key={id} resourceId={id} />;
        })}
      </div>
    </div>
  );
};

export default Resources;
