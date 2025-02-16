import "../css/SudokuCell.scss";
import React from "react";

export default function SudokuCell(props) {
    const value: String = props.value;

    return (
        <td>
            <textarea
                id={`cell${props.row}${props.column}`}
                className={null === value ? "mutableCell" : "immutableCell"}
                disabled={null !== value}
                maxLength={1}
            >
                {value ?? ""}
            </textarea>
        </td>
    );
}
