import { useState, useEffect } from "react";
import "./pages.css";

export default function ShowExercises() {
  // Endpoints
  const baseUrl = "http://localhost:5000/";
  const exercisesEndpoint = "exercises/";
  const fullUrl = baseUrl + exercisesEndpoint;

  // State to store exercises and loading/error state
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exercises data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(fullUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setExercises(data); // Set the fetched data to state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    }
    fetchData();
  }, [fullUrl]); // Dependency array ensures fetchData runs only when `fullUrl` changes

  // Render loading, error, or exercises
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="showExercises">
      <h2>Exercises</h2>
      {exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise.id}>
              <strong>{exercise.name}</strong>
              <p>Exercise Type: {exercise.type}</p>

              {exercise.type === "cardio" ? (
                <>
                  {exercise.duration && (
                    <p>Duration: {exercise.duration} minutes</p>
                  )}
                  {exercise.max_heart_rate && (
                    <p>Max Heart Rate: {exercise.max_heart_rate} bpm</p>
                  )}
                </>
              ) : (
                <>
                  {exercise.reps && <p>Reps: {exercise.reps}</p>}
                  {exercise.weight && <p>Weight: {exercise.weight} lbs</p>}
                </>
              )}

              <p>Date: {new Date(exercise.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
