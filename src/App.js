// src/App.js
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import MyComponent from "./MyComponent"; // Import your new component

function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setAdvice(data.slip.advice);
      setCount((prevCount) => prevCount + 1);
      console.log(advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello World</h1>
        <MyComponent advice={advice} getAdvice={getAdvice} />
        <p>Advice count: {count}</p>
      </header>
    </div>
  );
}

export default App;
