import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';


export default function KanbanBoard(){
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);

    return (
        <DragDropContext>
            <h2 style={{ textAlign: "center"}}>PROGRESS BOARD</h2>

        </DragDropContext>
    )
}