import React, { useEffect } from 'react';
import { loadRemix } from '@context/actions/remixAction';
import ProjectRootLayer from './Project_RootLayer';


// TODO: "remix" is a placeholder. Need to replace with name of project.
const Remix = () => {
  useEffect(() => {
    const load = async () => {
      await loadRemix();
    }
    load();
  }, []);

  return (  
    <>
       <div className="flex justify-center items-center h-screen">
        <p className="text-slate-200 text-4xl md:text-9xl	font-bold">Remix</p>
      </div>
      {/* <ProjectRootLayer /> */}

    </>
  )
}

export default Remix