import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import './Connexion.css';

function Connexion() {
  const [formData, setFormData] = useState({
    Email: "",
    MotDePasse: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(""); // State pour gérer les erreurs
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login successful");
        setLoggedIn(true);
        navigate("/Accueil"); // Redirige vers la page Accueil
      } else {
        setError("Identifiants incorrects"); // Définit le message d'erreur
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      {loggedIn ? (
        <Link to="/Accueil" />
      ) : (
        <>
          <h1>Connexion</h1>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInput}
            />

            <label>Mot de passe:</label>
            <input
              type="password"
              name="MotDePasse"
              value={formData.MotDePasse}
              onChange={handleInput}
            />

            <button type="submit">Se connecter</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          pas de comptes ? <Link to="/">S'inscrire</Link>
        </>
      )}
    </div>
  );
}
export default Connexion;
