import { Component } from "solid-js";
import styles from "./BoardCell.module.css";

export interface BoardCellProps {
  color: string;
}

const BoardCell: Component<BoardCellProps> = (props) => {
  const color = () => props.color;
  return (
    <div class="justify-content-center align-items-center">
      <div class={`${styles.cell} bg-${color()}`}></div>
    </div>
  );
};

export default BoardCell;
