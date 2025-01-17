import { useState, useEffect } from "react";
//endpoints
//for web address using wa
const wa = "http://localhost:5000/"

const exer = "exercises/"

const fullAddr = wa + exer

function NewExcercise() {
    const [newExcercise, setNewExcercise] = useState("")

    function handleInputChange(event){
        setNewExcercise(event.target.value)
    }
    async function handleNewExercise(){
        if(!newExcercise.trim()){
            alert("Please enter an exercise name!")
        }

        try {
            const response = await fetch("http://localhost:5000/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newExcercise })
        });

            if (response.ok) {
                const data = await response.json();
                alert("Exercise added successfully!");
                console.log("Response from server:", data)
                setNewExcercise(""); //clear input field
            } else {
                console.error("Error: ", response.statusText);
                alert("Failed to add exercise!");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("An error occurred. Please try again")
        }
    }


    return (
        <div>
            <h2>New Excercise</h2>
            <p>Enter name for new excercise: <input 
            placeholder="New Exercise"
            value={newExcercise}
            onChange={handleInputChange} 
            />
            </p>
            <button onClick={handleNewExercise}>Submit!</button>
        </div>
    );
}

export default NewExcercise