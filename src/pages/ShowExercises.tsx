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
  }, [fullUrl]);

  // Handle delete request
  async function handleDelete(id) {
    try {
      const res = await fetch(`${fullUrl}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to delete exercise with ID ${id}`);
      }
      // Remove the deleted exercise from the state
      setExercises((prevExercises) =>
        prevExercises.filter((exercise) => exercise.id !== id)
      );
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }

  // Group exercises by date
  const groupedExercises = exercises.reduce((acc, exercise) => {
    const dateKey = new Date(exercise.date).toLocaleDateString(); // Format date as string
    if (!acc[dateKey]) {
      acc[dateKey] = []; // Initialize array for this date
    }
    acc[dateKey].push(exercise); // Add exercise to the corresponding date group
    return acc;
  }, {});

  // Render loading, error, or grouped exercises
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="showExercises">
      <h2>Exercises</h2>
      {Object.keys(groupedExercises).length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        Object.entries(groupedExercises).map(([date, exercises]) => (
          <div key={date}>
            <h3>{date}</h3> {/* Display the group date */}
            <ul className="box">
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
                  {/* Delete Button */}
                  <button onClick={() => handleDelete(exercise.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
