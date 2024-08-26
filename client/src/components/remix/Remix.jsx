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
      <ProjectRootLayer />
      <ProjectRootLayer />
      <ProjectRootLayer />
    </>
  )
}

export default Remix