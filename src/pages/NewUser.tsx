import { useState, useEffect } from "react";

export default function NewUser() {
  const [user, setUser] = useState(
    {
      name: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
    },
  );
  let baseUrl = "http://localhost:5000/";
  let usersEndpoint = "users/";
  let fullUrl = baseUrl + usersEndpoint;

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted:", user);
  }

  function handleInputChange(event) {
    setUser(event.target.value);
  }

  // Handle new exercise submission
  async function handleNewUser() {
    const { name, age, gender, weight, height } = user;

    // Validate required fields
    if (!name.trim()) {
      alert("Please enter an user name!");
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
          age,
          gender,
          height,
          weight: weight ? parseFloat(weight) : null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("User added successfully!");
        console.log("Response from server:", data);

        // Clear the form
        setUser({
          name: "",
          age: "",
          gender: "",
          height: "",
          weight: "",
        });
      } else {
        console.error("Error:", response.statusText);
        alert("Failed to add user!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }
  return (
    <div>
      <h2>New User</h2>
    </div>
  );
}