import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pets, setPets] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchOwner, setSearchOwner] = useState("");
  const [foundPet, setFoundPet] = useState(null);

  useEffect(() => {
    // Fetch all pets when the component mounts
    fetch("http://localhost:8080/api/v1/pets")
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  const handleSearchByName = () => {
    // Fetch pet by name when the button is clicked
    fetch(`http://localhost:8080/api/v1/pets/${searchName}`)
      .then((response) => response.json())
      .then((data) => setFoundPet(data))
      .catch((error) => {
        console.error("Error fetching pet by name:", error);
        setFoundPet(null);
      });
  };

  const handleSearchByOwner = () => {
    // Fetch pet by owner when the button is clicked
    fetch(`http://localhost:8080/api/v1/pets/owner/${searchOwner}`)
      .then((response) => response.json())
      .then((data) => setFoundPet(data))
      .catch((error) => {
        console.error("Error fetching pet by owner:", error);
        setFoundPet(null);
      });
  };

  return (
    <div>
      <h1>Vet Pet List</h1>
      <ul>
        {pets.map((pet) => (
          <div className="petList" key={pet.id}>
            {pet.name}
          </div>
        ))}
      </ul>

      <div>
        <h2>Search by Name</h2>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="button" onClick={handleSearchByName}>
          Search
        </button>
        {foundPet && (
          <div>
            <h3>Found Pet</h3>
            <p>Name: {foundPet.name}</p>
            <p>Breed: {foundPet.breed}</p>
            <p>Age: {foundPet.age}</p>
            <p>Owner: {foundPet.owner}</p>
            <p>Owner Telephone #: {foundPet.telephone}</p>
          </div>
        )}
      </div>

      <div>
        <h2>Search by Owner</h2>
        <input
          type="text"
          value={searchOwner}
          onChange={(e) => setSearchOwner(e.target.value)}
        />
        <button className="button" onClick={handleSearchByOwner}>
          Search
        </button>
        {foundPet && (
          <div>
            <h3>Found Pet</h3>
            <p>Name: {foundPet.name}</p>
            <p>Breed: {foundPet.breed}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
