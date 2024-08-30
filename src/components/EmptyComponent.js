import React from "react";

const EmptyComponent = ({ height, text }) => {
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height: height }}
    >
      {text}
    </div>
  );
};

export default EmptyComponent;
