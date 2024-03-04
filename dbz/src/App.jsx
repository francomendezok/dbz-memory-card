import { Menu } from "./components/Menu"

export function App() {

  return (
    <>
      <Menu />
    </>
  );
      }

// Button => Loading => When promise.resolve, hide loading and show game. Simple!

// Loading while API fetch => Menu => Play => Win/Lose => Menu or Play Again