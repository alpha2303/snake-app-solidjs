import { Accessor, Component, Index, JSXElement, createEffect } from "solid-js";
import BoardCell from "./BoardCell";
import { COLORSTRINGS } from "../types/Globals";

export interface CellMatrixProps {
  grid: Accessor<number[][]>;
}

const CellMatrix: Component<CellMatrixProps> = (props) => {

  return (
    <div class="border border-dark border-3 m-2">
      <Index each={props.grid()}>
        {(row: Accessor<number[]>) => (
          <div class="d-flex flex-row">
            <Index each={row()}>
              {(cell: Accessor<number>) => <div><BoardCell color={COLORSTRINGS[cell()]} /></div>}
            </Index>
          </div>
        )}
      </Index>
    </div>
  );
};

export default CellMatrix;
