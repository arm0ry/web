import React from 'react';
import { useGlobalContext } from "@context/store";

// TODO: "Project" is a placeholder. Need to replace with name of project.
const Project_RootLayer = () => {
  const { remix } = useGlobalContext();

  console.log(remix);

  return (  
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="text-slate-400 text-5xl	font-bold">abysms</div>

        <div className="text-slate-400 text-2xl	font-bold">{remix.count + 1} Layer</div>
        <div className="text-slate-400 text-2xl	font-bold mb-10">Royalties: {remix.royalties}%</div>
        {/* <div className="text-slate-400 text-2xl	font-bold">Name: {remix ?? remix.rootLayer[1]}</div>
        <div className="text-slate-400 text-2xl	font-bold">Symbol: {remix ?? remix.rootLayer[2]}</div> */}
              
        <img
              className="ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(remix.rootLayerUri)}`}
              alt="Supporter Token"
        ></img>
      </div>
    </>
  )
}

export default Project_RootLayer