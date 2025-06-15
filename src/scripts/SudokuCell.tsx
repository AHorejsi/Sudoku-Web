import "../styles/SudokuCell.scss";
import { ReactNode, useRef } from "react";
import { Cell, Sudoku } from "./GenerateInfo";

interface SudokuCellProps {
    cell: Cell;

    row: number;

    column: number;

    boardLength: number;

    isHyper: boolean;

    maxCharLength: number;

    whole: Cell[][];
}

interface _CellBorderThickness {
    top: string;

    bottom: string;

    left: string;

    right: string;
}

function _decideThickness(props: SudokuCellProps): _CellBorderThickness {
    const boxLength = Math.sqrt(props.boardLength);
    const borderThickness: _CellBorderThickness = {
        top: "thin",
        bottom: "thin",
        left: "thin",
        right: "thin"
    };

    switch (props.row % boxLength) {
    case 0:
        borderThickness.top = "thick";

        break;
    case boxLength - 1:
        borderThickness.bottom = "thick";

        break;
    }

    switch (props.column % boxLength) {
    case 0:
        borderThickness.left = "thick";

        break;
    case boxLength - 1:
        borderThickness.right = " thick";

        break;
    }

    return borderThickness;
}

function _determineBorders(props: SudokuCellProps): string {
    const borders = _decideThickness(props);

    let css = "";

    for (const side in borders) {
        const value: string = borders[side];

        css += `${value}-${side}-bordered `;
    }

    return css;
}

function _limitCharLength(div: HTMLDivElement, maxLength: number): boolean {
    const text = div.textContent!;

    if (text.length > maxLength) {
        div.textContent = text.substring(0, maxLength);
        
        const sel = window.getSelection()!;
        sel.selectAllChildren(div);
        sel.collapseToEnd();

        return true;
    }

    return false;
}

function _checkInput(key: string, div: HTMLDivElement, props: SudokuCellProps) {
    if (key < "1" || key > "9") {
        return;
    }

    if ("Backspace" === key || "Delete" === key) {
        props.whole[props.row][props.column].value = null;
    }
    else {
        if (!_limitCharLength(div, props.maxCharLength)) {
            props.whole[props.row][props.column].value = Number(div.textContent!);
        }
    }
}

export default function SudokuCell(props: SudokuCellProps): ReactNode {
    const cell = props.cell;
    const cellType = cell.editable ? "mutable-cell" : "immutable-cell";
    const hyper = props.isHyper ? "hyper-cell" : "";
    const cellBorders = _determineBorders(props);

    const div = useRef<HTMLDivElement>(null);

    return (
        <td className={`${hyper} ${cellBorders}`}>
            <div
                className={`${cellType}`}
                ref={div}
                contentEditable={cell.editable}
                onKeyUp={(ev) => _checkInput(ev.key, div.current!, props)}
            >
                {cell.value ?? ""}
            </div>
        </td>
    );
}
