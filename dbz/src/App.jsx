import { Menu, Footer, AppDBZ } from "./components/Menu"

export function App() {

  return (
    <>
      <AppDBZ />
      <Menu />
    </>
  );
      }



// Loading while API fetch => Menu => Play => Win/Lose => Menu or Play Again