import React from "react";
import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ReactLoading
        type="balls"
        color="var(--primary-color)"
        height={100}
        width={100}
        className="m-auto"
      />
    </div>
  );
};

export default Loader;
