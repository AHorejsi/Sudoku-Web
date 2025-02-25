import "../css/SudokuCell.scss";
import React, { ReactNode } from "react";

interface SudokuCellProps {
    value: number | null;

    row: number;

    column: number;

    boardLength: number;

    isHyper: boolean;

    maxCharLength: number;
}

function _limitCharLength(div: HTMLDivElement, maxLength: number) {
    const text = div.textContent!;

    if (text.length > maxLength) {
        div.textContent = text.substring(0, maxLength);
        
        const sel = window.getSelection()!;
        sel.selectAllChildren(div);
        sel.collapseToEnd();
    }
}

function _removeNonnumbers(div: HTMLDivElement) {
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

    _limitCharLength(div, maxLength);
    _removeNonnumbers(div);
}

export default function SudokuCell(props: SudokuCellProps): ReactNode {
    const cellId = `cell-${props.row}-${props.column}`;
    const editable = null === props.value
    const cellType = editable ? "mutable-cell" : "immutable-cell";

    const hyper = props.isHyper ? " hyper-cell" : "";

    return (
        <td className={`cell-data${hyper}`}>
            <div
                id={cellId}
                className={cellType}
                contentEditable={editable}
                onInput={(ev) => _checkInput(ev, props.maxCharLength)}
            >
                {props.value ?? ""}
            </div>
        </td>
    );
}
