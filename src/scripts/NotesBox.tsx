import "../styles/NotesBox.css";
import { ReactNode } from "react";
import { Cell } from "./GenerateInfo";

interface NotesBoxProps {
    cell: Cell;

    dimensions: number;
}

function _makeNoteMarkers(dimensions: number): ReactNode {
    const markers = Array<ReactNode>();
    const rowAmount = Math.sqrt(dimensions);

    let num = 1;

    while (num < dimensions) {
        const section = Array<ReactNode>();

        for (let count = 0; count < rowAmount; ++count) {
            section.push(
                <td>{num}</td>
            );
        }

        markers.push(<tr>section</tr>);
    }

    return (
        <table>
            <tbody>{markers}</tbody>
        </table>
    );
}

export default function NotesBox(props: NotesBoxProps): ReactNode {
    const noteMarkers = _makeNoteMarkers(props.dimensions);

    return noteMarkers;
}
