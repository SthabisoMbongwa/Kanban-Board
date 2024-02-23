import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';


export default function KanbanBoard(){
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    // const [inprogress, setInprogress] = useState([]);



    return (
        <DragDropContext>
            <h2 style={{ textAlign: "center"}}>PROGRESS BOARD</h2>

            <div style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center', flexDirection:'row'}}>

                <Column title={"TO DO"} tasks={incomplete} id={'1'} />
                {/* <Column title={"Inprogress"} tasks={inprogress} id={'3'} /> */}

            </div>


        </DragDropContext>
    )
}