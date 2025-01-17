import { useState } from "react";

// Endpoints
const baseUrl = "http://localhost:5000/";
const exercisesEndpoint = "exercises/";
const fullUrl = baseUrl + exercisesEndpoint;
function NewExercise() {
  const [exercise, setExercise] = useState({
    name: "",
    type: "",
    duration: "",
    max_heart_rate: "",
    reps: "",
    weight: "",
  });

  // Handle input change for any field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setExercise((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the corresponding field
    }));
  }

  // Handle new exercise submission
  async function handleNewExercise() {
    const { name, type, duration, max_heart_rate, reps, weight } = exercise;

    // Validate required fields
    if (!name.trim() || !type.trim()) {
      alert("Please enter an exercise name and type!");
      return;
    }

    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          duration: duration ? parseFloat(duration) : null,
          max_heart_rate: max_heart_rate ? parseFloat(max_heart_rate) : null,
          reps: reps ? parseInt(reps, 10) : null,
          weight: weight ? parseFloat(weight) : null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Exercise added successfully!");
        console.log("Response from server:", data);

        // Clear the form
        setExercise({
          name: "",
          type: "",
          duration: "",
          max_heart_rate: "",
          reps: "",
          weight: "",
        });
      } else {
        console.error("Error:", response.statusText);
        alert("Failed to add exercise!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      <h2>New Exercise</h2>
      <p>
        <label>
          Name:{" "}
          <input
            name="name"
            placeholder="Exercise Name"
            value={exercise.name}
            onChange={handleInputChange}
          />
        </label>
      </p>
      <p>
        <label>
          Type:{" "}
          <select
            name="type"
            value={exercise.type}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a type
            </option>
            <option value="cardio">Cardio</option>
            <option value="weights">Weights</option>
          </select>
        </label>
      </p>
      <p>
        <label>
          Duration:{" "}
          <input
            name="duration"
            type="number"
            placeholder="Duration (in minutes)"
            value={exercise.duration}
            onChange={handleInputChange}
          />
        </label>
      </p>
      <p>
        <label>
          Max Heart Rate:{" "}
          <input
            name="max_heart_rate"
            type="number"
            placeholder="Max Heart Rate (bpm)"
            value={exercise.max_heart_rate}
            onChange={handleInputChange}
          />
        </label>
      </p>
      <p>
        <label>
          Reps:{" "}
          <input
            name="reps"
            type="number"
            placeholder="Number of Reps"
            value={exercise.reps}
            onChange={handleInputChange}
          />
        </label>
      </p>
      <p>
        <label>
          Weight:{" "}
          <input
            name="weight"
            type="number"
            placeholder="Weight (lbs)"
            value={exercise.weight}
            onChange={handleInputChange}
          />
        </label>
      </p>
      <button onClick={handleNewExercise}>Submit!</button>
    </div>
  );
}

export default NewExercise;
