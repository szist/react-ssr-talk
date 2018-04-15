import * as React from "react";
import RedBox from "redbox-react";

function RedBoxError({ error, info }) {
  const redBoxStyle = {
    redbox: {
      position: "fixed",
      padding: 10,
      top: "0px",
      left: "0px",
      bottom: "0px",
      width: "50%",
      background: "rgb(204, 0, 0)",
      color: "white",
      overflow: "auto"
    }
  };
  const componentInfoStyle = {
    position: "fixed",
    top: 0,
    right: 0,
    left: "50%",
    bottom: 0,
    overflow: "auto"
  };

  return (
    <div>
      <RedBox error={error} style={redBoxStyle} />
      <div style={componentInfoStyle}>
        <pre>{info.componentStack}</pre>
      </div>
    </div>
  );
}

export default RedBoxError;
