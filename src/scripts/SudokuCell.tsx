import "../styles/SudokuCell.scss";
import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { Cell, Sudoku } from "./GenerateInfo";

interface SudokuCellProps {
    cell: Cell;

    row: number;

    column: number;

    boardLength: number;

    isHyper: boolean;

    maxCharLength: number;

    whole: Sudoku;

    setWhole: Dispatch<SetStateAction<Sudoku>>;
}

interface _CellBorderThickness {
    top: string;

    bottom: string;

    left: string;

    right: string;
}

function _decideThickness(props: SudokuCellProps): _CellBorderThickness {
    const boxLength = Math.sqrt(props.boardLength);
    const borderThickness = {
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

function _removeNonNumbers(div: HTMLDivElement) {
    const text = div.textContent!;
    const endIndex = text.length - 1;

    const last = text.charAt(endIndex);
    const containsDigits = /^\d+$/;

    if (!containsDigits.test(last)) {
        div.textContent = text.substring(0, endIndex);
    }
}

function _checkInput(ev: React.FormEvent<HTMLDivElement>, props: SudokuCellProps) {
    const div = ev.currentTarget;

    const finalCharRemoved = _limitCharLength(div, props.maxCharLength);

    if (!finalCharRemoved) {
        _removeNonNumbers(div);

        props.whole.board[props.row][props.column].value = Number(div.textContent!);
        props.setWhole(props.whole);
    }
}

export default function SudokuCell(props: SudokuCellProps): ReactNode {
    const cell = props.cell;
    const cellType = cell.editable ? "mutable-cell" : "immutable-cell";
    const hyper = props.isHyper ? "hyper-cell" : "";
    const cellBorders = _determineBorders(props);

    return (
        <td className={`${hyper} ${cellBorders}`}>
            <div
                id={`cell-${props.row}-${props.column}`}
                className={`${cellType}`}
                contentEditable={cell.editable}
                onInput={(ev) => _checkInput(ev, props)}
            >
                {cell.value ?? ""}
            </div>
        </td>
    );
}
