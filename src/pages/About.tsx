import { useState } from "react";
import Profile from "./profile";

export default function About() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h2>About</h2>
            <p> This app aims to help you improve your fitness, by helping you track your workouts, and your progress.</p>
            <Profile />
        </div>
    );
}