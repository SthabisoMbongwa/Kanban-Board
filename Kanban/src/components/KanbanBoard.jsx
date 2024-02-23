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
    
    const handleDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if (source.droppableId == destination.droppableId) return;

        //Remove from source array

        if (source.droppableId == 2) {
            setCompleted(removeItemById(draggableId, completed));
        } else {
            setIncomplete(removeItemById(draggableId, incomplete));
        }

        //Get item

        const task = findItemById(draggableId, [...incomplete, ...completed]);

        //Add item
    };

    function findItemById(id, array){
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array){
        return array.filter((item) => item.id != id);
    }



    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{ textAlign: "center"}}>PROGRESS BOARD</h2>

            <div style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center', flexDirection:'row'}}>

                <Column title={"TO DO"} tasks={incomplete} id={'1'} />
                {/* <Column title={"Inprogress"} tasks={inprogress} id={'3'} /> */}

            </div>


        </DragDropContext>
    )
}