import React, { useEffect } from "react";
import CommonsSupporters from "./communities/CommonsSupporters";
import G0vSupporters from "./communities/G0vSupporters";

const Supporters = ({ domain }) => {

  useEffect(() => {

  }, [domain])

  return (
    <>
      {(domain !== undefined && domain === "commons")
        ? (
          <CommonsSupporters />
        ) : (
          <G0vSupporters />
        )}
    </>
  );
};

export default Supporters;
