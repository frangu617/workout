import { Link } from "react-router-dom";

export default function NewWorkout() {
    return (
        <div>
            <h2>New Workout</h2>
            <h4>Add a new excercise: <Link to="/newExcercise"><button>New Excercise</button></Link></h4>
        </div>
    );
}