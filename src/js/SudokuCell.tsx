import "../css/SudokuCell.scss";
import React, { ReactNode } from "react";

interface SudokuCellProps {
    value: number | null;

    row: number;

    column: number;

    maxLength: number;
}

function limitCharLength(ev: React.FormEvent<HTMLDivElement>, maxLength: number) {
    const div = ev.currentTarget;
    const text = div.textContent!;

    if (text.length > maxLength) {
        div.textContent = text.substring(0, maxLength);
        
        const sel = window.getSelection()!;
        sel.selectAllChildren(div);
        sel.collapseToEnd();
    }
}

export default function SudokuCell(props: SudokuCellProps): ReactNode {
    const cellId = `cell_${props.row}_${props.column}`;

    const editable = null === props.value
    const cellType = editable ? "mutable-cell" : "immutable-cell";

    return (
        <td className="cell-data">
            <div id={cellId} className={cellType} contentEditable={editable} onInput={(ev) => limitCharLength(ev, props.maxLength)}>
                {props.value ?? ""}
            </div>
        </td>
    );
}
