import "../styles/SudokuCell.css";
import { useRef } from "react";
import { Cell } from "./GenerateInfo";
import { RgbColor } from "./ColorGeneration";

interface SudokuCellProps {
    cell: Cell;

    killerSum: number | undefined;

    row: number;

    column: number;

    color: RgbColor;

    dashes: string;

    dimensions: number;

    maxLength: number;
}

interface _BorderThickness {
    top: string;

    bottom: string;

    left: string;

    right: string;
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
    const THIN_SIDE = "thin";
    const THICK_SIDE = "thick";

    const boxLength = Math.sqrt(props.dimensions);
    const borderThickness = {
        top: THIN_SIDE,
        bottom: THIN_SIDE,
        left: THIN_SIDE,
        right: THIN_SIDE
    };

    switch (props.row % boxLength) {
    case 0:
        borderThickness.top = THICK_SIDE;

        break;
    case boxLength - 1:
        borderThickness.bottom = THICK_SIDE;

        break;
    }

    switch (props.column % boxLength) {
    case 0:
        borderThickness.left = THICK_SIDE;

        break;
    case boxLength - 1:
        borderThickness.right = THICK_SIDE;

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

export default function SudokuCell(props: SudokuCellProps): React.JSX.Element {
    const cell = props.cell;

    const cellType = cell.editable ? "mutable-cell" : "immutable-cell";
    const cellMargin = props.killerSum ? "top-negative" : null;
    const dashes = `inner ${props.dashes}`.trimEnd();
    const borders = _determineBorders(props);

    const div = useRef<HTMLDivElement>(null);
    const bgColor = props.color.toString();

    return (
        <div className={borders} style={{ backgroundColor: bgColor }}>
            { props.killerSum ? <div className="killer-sum-box">{ props.killerSum }</div> : null }

            <div 
                className={`${cellType} ${cellMargin} ${dashes} all-cell`} 
                ref={div}
                contentEditable={cell.editable}
                suppressContentEditableWarning={true}
                onInput={(_) => _checkInput(div.current!, cell, props.maxLength)}
            >
                {cell.value ?? ""}
            </div>
        </div>
    );
}
