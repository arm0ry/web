import React from 'react';
import { useGlobalContext } from "@context/store";

// TODO: "Project" is a placeholder. Need to replace with name of project.
const Project_RootLayer = () => {
  const { remix } = useGlobalContext();

  console.log(remix)

  return (  
    <>
      <div className='flex flex-col justify-center items-center space-y-5'>
        <div className="text-slate-400 text-5xl	font-bold">abysms</div>
        <div className='flex  space-x-20'>
          <div className='flex flex-col justify-center'>
            <div className="text-slate-400 text-2xl	font-bold">{remix.count + 1} Layer</div>
            <div className="text-slate-400 text-2xl	font-bold mb-10">Royalties: {remix.royalties}%</div>
          
            
            <div className='flex flex-col space-y-4'>
              <button
                  // disabled={!clickMint}
                  // onClick={() => clickMint()}
                  className=" w-full rounded-md p-2 text-slate-600 hover:bg-slate-100 bg-slate-200"
                >
                  <div className="flex flex-row space-x-4 items-center justify-center">
                    {/* <div className="text-md font-normal">{curve.mintPrice} Ξ </div> */}
                    <div className="text-xl font-semibold">Supoort </div>
              </div>
            </button>

            <button
                  // disabled={!clickMint}
                  // onClick={() => clickMint()}
                  className=" w-full rounded-md p-2 text-slate-600 hover:bg-slate-100 bg-slate-200"
                >
                  <div className="flex flex-row space-x-4 items-center justify-center">
                    {/* <div className="text-md font-normal">{curve.mintPrice} Ξ </div> */}
                    <div className="text-xl font-semibold">Mix </div>
              </div>
            </button>

            <button
                  // disabled={!clickMint}
                  // onClick={() => clickMint()}
                  className=" w-full rounded-md p-2 text-slate-600 hover:bg-slate-100 bg-slate-200"
                >
                  <div className="flex flex-row space-x-4 items-center justify-center">
                    {/* <div className="text-md font-normal">{curve.mintPrice} Ξ </div> */}
                    <div className="text-xl font-semibold">Mix with Token </div>
              </div>
            </button>

            </div>
          </div>
          
          <img
              className="ring-1 ring-slate-400 opacity-100 blur-0 z-[10] m-1 rounded-lg"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(remix.rootLayerUri)}`}
              alt="Supporter Token"
          ></img>


          
        </div>
        {/* <div className="text-slate-400 text-2xl	font-bold">Name: {remix ?? remix.rootLayer[1]}</div>
        <div className="text-slate-400 text-2xl	font-bold">Symbol: {remix ?? remix.rootLayer[2]}</div> */}
              
      </div>
    </>
  )
}

export default Project_RootLayer