import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';


export default function KanbanBoard(){
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);

    // const [inprogress, setInprogress] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            setCompleted(json.filter((task) => task.completed));
            setIncomplete(json.filter((task) => !task.completed));
        });
    }, []);
    
    const handleDragEnd = (result) => {
        const {destination, source, draggableId} = result;
        
        // Return early if the item is dropped outside the columns
        if (!destination) return;
     
        if (source.droppableId == destination.droppableId) return;

        // Remove from source array
        if (source.droppableId === '1') {
            setIncomplete(removeItemById(draggableId, incomplete));
        } else if (source.droppableId === '2') {
            setCompleted(removeItemById(draggableId, completed));
        } else if (source.droppableId === '3') {
            setBacklog(removeItemById(draggableId, backlog));
        }

        //Get item

        const task = findItemById(draggableId, [...incomplete, ...completed, ...backlog]);

        // Add item to destination
        if (destination.droppableId === '1') {
            setIncomplete([...incomplete, task]);
        } else if (destination.droppableId === '2') {
            setCompleted([...completed, task]);
        } else if (destination.droppableId === '3') {
            setBacklog([...backlog, task]);
        }
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
                <Column title={"DONE"} tasks={completed} id={'2'} />
                <Column title={"BACKLOG"} tasks={backlog} id={'3'} />


                
                {/* <Column title={"Inprogress"} tasks={inprogress} id={'3'} /> */}

            </div>


        </DragDropContext>
    )
}