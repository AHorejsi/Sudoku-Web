import "../styles/NotesBox.css";
import { ReactNode } from "react";
import { Cell } from "./GenerateInfo";

interface NotesBoxProps {
    cell: Cell;
}

function _toggleNote(value: number, cell: Cell) {
    cell.notes = cell.notes ^ (1 << value);
}

function _showPopup(cell: Cell) {
    const value = prompt("Enter Note: ");

    if (value) {
        const num = Number(value);

        _toggleNote(num, cell);
    }
}

export default function NotesBox(props: NotesBoxProps): ReactNode {
    return (
        <button className="notes" onClick={(_) => _showPopup(props.cell)} />
    );
}
