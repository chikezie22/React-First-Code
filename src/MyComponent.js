import React, { useEffect, useState } from "react";
function MyComponent(props) {
  return (
    <div className="MyComponent">
      <h2>{props.advice}</h2>
      <button onClick={props.getAdvice}>Get Advice</button>
    </div>
  );
}
export default MyComponent;
