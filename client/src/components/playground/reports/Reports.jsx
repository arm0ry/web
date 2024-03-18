import React, { useEffect } from "react";
import CommonsReports from "./communities/CommonsReports";
import G0vReports from "./communities/G0vReports";

const Reports = ({ domain }) => {

  useEffect(() => {

  }, [domain])

  return (
    <>
      {(domain !== undefined && domain === "commons")
        ? (
          <CommonsReports />
        ) : (
          <G0vReports />
        )}
    </>
  );
};

export default Reports;
