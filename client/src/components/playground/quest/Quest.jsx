import React, { useEffect, useState } from "react";

import { useGlobalContext } from "@context/store";
import QuestCard from "./QuestCard";

const Quest = () => {
  const { playground, userInfo } =
    useGlobalContext();

  return (
    <>
      <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Object.keys(userInfo.quests).map((id) => {
          return <QuestCard key={id} missionId={id} />;
        })}
      </div>
    </>
  );
};

export default Quest;
