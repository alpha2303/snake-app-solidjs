import { createSignal, type Component } from "solid-js";
import GameBoard from "./pages/GameBoard";
import { BOARD_SIZE, MAXMOVEDELAY } from "./types/Globals";

const App: Component = () => {
  return (
    <div>
      <GameBoard size={BOARD_SIZE} maxSpeed={MAXMOVEDELAY} />
    </div>
  );
};

export default App;
