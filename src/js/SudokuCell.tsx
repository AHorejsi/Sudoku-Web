import "../css/SudokuCell.scss";
import React, { ReactNode } from "react";

interface SudokuCellProps {
    value: number | null;

    row: number;

    column: number;
}

function limitCharLength(ev: React.FormEvent<HTMLDivElement>) {
    const div = ev.currentTarget;
    const text = div.textContent!;

    if (text.length > 2) {
        div.textContent = text.substring(0, 2);
        
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
            <div id={cellId} className={cellType} contentEditable={editable} onInput={limitCharLength}>
                {props.value ?? ""}
            </div>
        </td>
    );
}
