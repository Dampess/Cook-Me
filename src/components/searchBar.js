import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import "./SearchBar.css"

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleSearch = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (query.trim()) {
      // Vérifie si la requête n'est pas vide
      navigate(`/search/${query}`); // Redirection vers la page de résultats de recherche
      setQuery(""); // Réinitialiser le champ de recherche
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        {" "}
        {/* Utiliser un formulaire pour gérer la soumission */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cherchez une recette..."
        />
        <button type="submit">Chercher</button>{" "}
        {/* Utiliser type="submit" pour le bouton */}
      </form>
    </div>
  );
};

export default SearchBar;
