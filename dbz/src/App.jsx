import Loading from "./components/loading"
import { Menu, Footer, AppDBZ } from "./components/Menu"
import { useState } from "react"

export function App() {

  return (
    <>
      <AppDBZ />
      <Menu />
    </>
  );
      }



// Loading while API fetch => Menu => Play => Win/Lose => Menu or Play Again