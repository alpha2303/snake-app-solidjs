import {
  Component,
  createSignal,
} from "solid-js";
import CellMatrix from "../components/CellMatrix";
import { CellColor, Direction, GameState } from "../types/Enums";

export interface GameBoardProps {
  size: number;
  maxSpeed: number;
}

const GameBoard: Component<GameBoardProps> = (props: GameBoardProps) => {
  const generateGrid = (snake: number[][], food: number[], size: number) => {
    let gridMatrix: number[][] = [];
    for (let i = 0; i < size; i++) {
      gridMatrix.push([]);
      for (let j = 0; j < size; j++) {
        let color: number = CellColor.WHITE;
        if (snake.filter((dot) => dot[0] === i && dot[1] === j).length > 0) {
          color = CellColor.GREEN;
        }
        if (food[0] == i && food[1] == j) {
          color = CellColor.RED;
        }
        gridMatrix[i].push(color);
      }
    }
    return gridMatrix;
  };

  const getRandomFood = (size: number) => {
    return [
      Math.floor((Math.random() * (size - 2) + 1) / 2) * 2,
      Math.floor((Math.random() * (size - 2) + 1) / 2) * 2,
    ];
  };

  const [score, setScore] = createSignal(0);
  const [food, setFood] = createSignal(getRandomFood(props.size));
  const [snake, setSnake] = createSignal([
    [0, 0],
    [0, 1],
  ]);
  const [grid, setGrid] = createSignal(
    generateGrid(snake(), food(), props.size)
  );
  const [direction, setDirection] = createSignal(Direction.RIGHT);
  const [gameInterval, setGameInterval] = createSignal(0);
  const [gameState, setGameState] = createSignal(GameState.NEW);

  const setInitialState = () => {
    setScore(0);
    setSnake([
      [0, 0],
      [0, 1],
    ]);
    setDirection(Direction.RIGHT);
    setGameState(GameState.NEW);
  };

  const updateDirection = (event: KeyboardEvent, currDirection: Direction) => {
    let direction: Direction = currDirection;
    console.log(event.key);
    if (gameState() === GameState.RUNNING) {
      switch (event.key) {
        case "w":
          direction =
            currDirection !== Direction.DOWN ? Direction.UP : direction;
          break;
        case "s":
          direction =
            currDirection !== Direction.UP ? Direction.DOWN : direction;
          break;
        case "a":
          direction =
            currDirection !== Direction.RIGHT ? Direction.LEFT : direction;
          break;
        case "d":
          direction =
            currDirection !== Direction.LEFT ? Direction.RIGHT : direction;
          break;
        default:
          break;
      }
    }
    setDirection(direction);
  };

  const getNextHead = (snake: number[][], direction: Direction) => {
    let currHead: number[] = snake[snake.length - 1];
    switch (direction) {
      case Direction.UP:
        if (currHead[0] === 0) {
          return [props.size - 1, currHead[1]];
        }
        return [currHead[0] - 1, currHead[1]];
      case Direction.LEFT:
        if (currHead[1] === 0) {
          return [currHead[0], props.size - 1];
        }
        return [currHead[0], currHead[1] - 1];
      case Direction.DOWN:
        if (currHead[0] === props.size - 1) {
          return [0, currHead[1]];
        }
        return [currHead[0] + 1, currHead[1]];
      case Direction.RIGHT:
        if (currHead[1] === props.size - 1) {
          return [currHead[0], 0];
        }
        return [currHead[0], currHead[1] + 1];
    }
  };

  const getNextSnake = (snake: number[][], direction: Direction) => {
    let nextHead: number[] = getNextHead(snake, direction);
    snake.push(nextHead);
    snake.shift();
    return snake;
  };

  const handleFood = (snake: number[][], food: number[]) => {
    let currHead = snake[snake.length - 1];
    if (currHead[0] === food[0] && currHead[1] === food[1]) {
      setFood(getRandomFood(props.size));
      snake.unshift(snake[0]);
      setSnake(snake);
      setScore(score() + 1);
    }
  };

  const isBodyCollision = (snake: number[][]) => {
    let currHead = snake[snake.length - 1];
    if (
      snake
        .slice(1, -1)
        .filter((dots) => dots[0] == currHead[0] && dots[1] == currHead[1])
        .length > 0
    ) {
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    let nextSnake: number[][] = getNextSnake(snake(), direction());
    if (isBodyCollision(nextSnake)) {
      setGameState(GameState.OVER);
      clearInterval(gameInterval());
    } else {
      setSnake(nextSnake);
    }
    setGrid(generateGrid(snake(), food(), props.size));
    handleFood(snake(), food());
  };

  const startGame = (event: MouseEvent) => {
    event.preventDefault();
    setGameState(GameState.RUNNING);
    setGameInterval(setInterval(gameLoop, 500));
  };

  const pauseGame = (event: MouseEvent) => {
    event.preventDefault();
    clearInterval(gameInterval());
    setGameState(GameState.PAUSED);
  };

  return (
    <div
      onKeyDown={(event) => updateDirection(event, direction())} 
      class="d-flex flex-column justify-content-center align-items-center p-5 m-5"
    >
      <div class="flex flex-row">
        <div class="justify-content-center align-items-center">
          <p>Score: {score()}</p>
        </div>
      </div>
      <div class="flex flex-row">
        <CellMatrix grid={grid} />
      </div>
      <div class="flex flex-row">
        <button onClick={startGame}>Start</button>
      </div>
    </div>
  );
};

export default GameBoard;
