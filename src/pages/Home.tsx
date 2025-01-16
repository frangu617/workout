import { Link } from "react-router-dom";
import "./pages.css";
const Home = () => {
    return (
        <>
            <h2>Home</h2>
            <h3>Welcome!</h3>
            <p> What do you want to do today?</p>
            <ul className="activities">
                <li>Start a <Link to="/newWorkout"><button>New Workout</button></Link></li>
                <li>Check on <Link to="/oldWorkouts"><button>Old Workouts</button></Link></li>
                <li>Check your <Link to="/profile"><button>Profile</button></Link></li>
            </ul>
        </>
    );
};

export default Home;