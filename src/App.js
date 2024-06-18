// src/App.js
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import MyComponent from "./MyComponent"; // Import your new component

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

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
    <div className="container">
      <div className="App">
        <header className="App-header">
          <Header />
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Hello World</h1>
          <MyComponent advice={advice} getAdvice={getAdvice} />
          <p>Advice count: {count}</p>
        </header>
        <Menu />

        <Footer />
      </div>
    </div>
  );
}
function Menu() {
  return (
    <main className="menu">
      <h2 style={{ marginTop: "5px" }}>Our menu</h2>

      <div>
        {pizzaData.map((pizza) => {
          return <Pizza pizzaObj={pizza} />;
        })}
      </div>

      {/* <Pizza
        // all this are props
        name="Pizza Prosciutto"
        ingredients="Tomato, mozarella, ham, aragula, and burrata cheese"
        photoName="../pizzas/prosciutto.jpg"
        price="10"
      />

      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mushrooms"
        price="12"
        photoName="pizzas/funghi.jpg"
      /> */}
    </main>
  );
}

function Pizza(props) {
  console.log(props);
  return (
    <div className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price}</span>
      </div>
    </div>
  );
}

function Header() {
  // const style = { color: "red", textTransform: "uppercase" }
  const style = {};
  return (
    <header className="header">
      <h1 style={style}> Fast React Pizza Co.</h1>
    </header>
  );
}

function Footer() {
  const hour = new Date().getHours();
  console.log(hour);
  const openHour = 12;
  const closeHour = 22;
  if (hour >= openHour && hour <= closeHour) alert("We are currently open!");
  else alert("We are closed ");
  return (
    <footer className="footer">
      {new Date().toLocaleTimeString()}. We're are currently open
    </footer>
  );

  // return React.createElement("footer", null, "We are currently open!");
}

export default App;
