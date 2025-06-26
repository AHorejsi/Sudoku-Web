import "../styles/SudokuCell.scss";
import { ReactNode, useRef } from "react";
import { Cell } from "./GenerateInfo";

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

    for (const [side, value] of Object.entries(borders)) {
        css += `${value}-${side}-bordered `;
    }

    return css;
}

function _deleteLastChars(div: HTMLDivElement, text: string) {
    div.textContent = text.substring(0, text.length - 1);
    
    const sel = window.getSelection()!;
    sel.selectAllChildren(div);
    sel.collapseToEnd();
}

function _validChar(key: string | undefined): boolean {
    if (!key) {
        return true;
    }

    return key.localeCompare("1") >= 0 && key.localeCompare("9") <= 0;
}

function _checkInput(div: HTMLDivElement, props: SudokuCellProps) {
    const text = div.textContent!;
    const last = text[text.length - 1]; // undefined means that the text is empty

    if (text.length > props.maxCharLength || !_validChar(last)) {
        _deleteLastChars(div, text);

        return;
    }

    if (0 === text.length) {
        props.whole[props.row]![props.column]!.value = null;
    }
    else if ("1" <= text && text <= "9") {
        props.whole[props.row]![props.column]!.value = Number(text);
    }
}

export default function SudokuCell(props: SudokuCellProps): ReactNode {
    const cell = props.cell;
    const cellType = cell.editable ? null : "immutable-cell";
    const hyper = props.isHyper ? "hyper-cell" : "";
    const cellBorders = _determineBorders(props);

    const div = useRef<HTMLDivElement>(null);

    return (
        <td className={`${hyper} ${cellBorders}`}>
            <div
                className={`${cellType} all-cell`}
                ref={div}
                contentEditable={cell.editable}
                onInput={(_) => _checkInput(div.current!, props)}
            >
                {cell.value ?? ""}
            </div>
        </td>
    );
}
