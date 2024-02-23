import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';


export default function KanbanBoard(){
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    // const [inprogress, setInprogress] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => console.log(json))
            setCompleted(json.filter((task) => task.completed));
            setIncomplete(json.filter((task) => !task.completed));
    }, []);
    



    return (
        <DragDropContext onDragEnd={handleDradEnd}>
            <h2 style={{ textAlign: "center"}}>PROGRESS BOARD</h2>

            <div style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center', flexDirection:'row'}}>

                <Column title={"TO DO"} tasks={incomplete} id={'1'} />
                {/* <Column title={"Inprogress"} tasks={inprogress} id={'3'} /> */}

            </div>


        </DragDropContext>
    )
}