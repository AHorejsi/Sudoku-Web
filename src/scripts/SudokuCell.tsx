import "../styles/SudokuCell.scss";
import React, { ReactNode } from "react";

interface SudokuCellProps {
    value: number | null;

    row: number;

    column: number;

    boardLength: number;

    isHyper: boolean;

    maxCharLength: number;
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

function _checkInput(ev: React.FormEvent<HTMLDivElement>, maxLength: number) {
    const div = ev.currentTarget;

    const finalCharRemoved = _limitCharLength(div, maxLength);

    if (!finalCharRemoved) {
        _removeNonNumbers(div);
    }
}

export default function SudokuCell(props: SudokuCellProps): ReactNode {
    const editable = null === props.value;
    const cellType = editable ? "mutable-cell" : "immutable-cell";
    const hyper = props.isHyper ? "hyper-cell" : "";
    const cellBorders = _determineBorders(props);

    return (
        <td className={`${hyper} ${cellBorders}`}>
            <div
                id={`cell-${props.row}-${props.column}`}
                className={`${cellType}`}
                contentEditable={editable}
                onInput={(ev) => _checkInput(ev, props.maxCharLength)}
            >
                {props.value ?? ""}
            </div>
        </td>
    );
}
