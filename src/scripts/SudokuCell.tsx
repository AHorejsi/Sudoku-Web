import "../styles/SudokuCell.css";
import { ReactNode, useRef } from "react";
import { Cell } from "./GenerateInfo";

interface SudokuCellProps {
    cell: Cell;

    killerSum: number | undefined;

    row: number;

    column: number;

    color: string;

    dashes: string;

    dimensions: number;

    maxLength: number;
}

interface _BorderThickness {
    top: "thin" | "thick";

    bottom: "thin" | "thick";

    left: "thin" | "thick";

    right: "thin" | "thick";
}

function _determineBorders(props: SudokuCellProps): string {
    const borders = _decideThickness(props);

    let css = "";

    for (const [side, value] of Object.entries(borders)) {
        css += `${value}-${side} `;
    }

    return css.trimEnd();
}

function _decideThickness(props: SudokuCellProps): _BorderThickness {
    const boxLength = Math.sqrt(props.dimensions);
    const borderThickness: _BorderThickness = {
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
        borderThickness.right = "thick";

        break;
    }

    return borderThickness;
}

function _checkInput(div: HTMLDivElement, cell: Cell, maxLength: number) {
    const text = div.textContent;
    const last = text[text.length - 1]; // undefined means that the text is empty

    if (text.length > maxLength || !_validChar(last)) {
        _deleteLastChars(div, text);
    }
    else {
        if (0 === text.length) {
            cell.value = null;
        }
        else if ("1" <= text && text <= "9") {
            cell.value = Number(text);
        }
    }
}

function _validChar(key: string | undefined): boolean {
    if (!key) {
        return true;
    }

    return key.localeCompare("1") >= 0 && key.localeCompare("9") <= 0;
}

function _deleteLastChars(div: HTMLDivElement, text: string) {
    div.textContent = text.substring(0, text.length - 1);
    
    const sel = window.getSelection()!;
    sel.selectAllChildren(div);
    sel.collapseToEnd();
}

export default function SudokuCell(props: SudokuCellProps): ReactNode {
    const cell = props.cell;
    const maxLength = props.maxLength;

    const cellType = cell.editable ? "mutable-cell" : "immutable-cell";
    const cellMargin = props.killerSum ? "top-negative" : null;
    const borders = _determineBorders(props);
    const dashes = `inner ${props.dashes}`.trimEnd();

    const div = useRef<HTMLDivElement>(null);

    return (
        <div className={borders} style={{ backgroundColor: props.color }}>
            { props.killerSum ? <div className="killer-sum-box">{props.killerSum}</div> : null }

                <div className={`${cellType} ${cellMargin} ${dashes} all-cell`} ref={div} contentEditable={cell.editable}
                    onInput={(_) => _checkInput(div.current!, cell, maxLength)}
                >
                    {cell.value ?? ""}
                </div>
        </div>
    );
}
