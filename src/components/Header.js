import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture globale du menu (burger)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // État pour gérer l'ouverture du menu Catégories
  const [isCountriesOpen, setIsCountriesOpen] = useState(false); // État pour gérer l'ouverture du menu Pays
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les catégories depuis l'API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };

    // Récupérer la liste des pays (filtrage par nationalité des recettes)
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        setCountries(response.data.meals);
      } catch (error) {
        console.error("Erreur lors de la récupération des pays", error);
      }
    };

    fetchCategories();
    fetchCountries();
  }, []);

  // Fonction de recherche
  const handleSearch = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm(""); // Réinitialise le champ de recherche
    }
  };

  // Fonction pour gérer l'ouverture/fermeture du menu burger
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour gérer l'ouverture/fermeture du menu Catégories
  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  // Fonction pour gérer l'ouverture/fermeture du menu Pays
  const toggleCountries = () => {
    setIsCountriesOpen(!isCountriesOpen);
  };

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          <img
            src={require("./assets/logo.png")}
            alt="Cook&Me Logo"
            className="logo-img"
          />
        </Link>
      </div>

      <button className="burger" onClick={toggleMenu}>
        {/* Icône hamburger */}
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-item" onClick={toggleMenu}>
          Accueil
        </Link>
        <Link to="/popular" className="nav-item" onClick={toggleMenu}>
          Recettes populaires
        </Link>

        <div className="dropdown">
          <button className="dropbtn" onClick={toggleCategories}>
            Catégories {isCategoriesOpen ? "▲" : "▼"}{" "}
            {/* Affichage dynamique de la flèche */}
          </button>
          {isCategoriesOpen && ( // Si le menu Catégories est ouvert, afficher la liste des catégories
            <div className="dropdown-content">
              {categories.map((category) => (
                <Link
                  key={category.idCategory}
                  to={`/category/${category.strCategory}`}
                  onClick={() => {
                    toggleMenu(); // Fermer le menu burger après la sélection
                    setIsCategoriesOpen(false); // Fermer le menu Catégories
                  }}
                >
                  {category.strCategory}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown">
          <button className="dropbtn" onClick={toggleCountries}>
            Pays {isCountriesOpen ? "▲" : "▼"}{" "}
            {/* Affichage dynamique de la flèche */}
          </button>
          {isCountriesOpen && ( // Si le menu Pays est ouvert, afficher la liste des pays
            <div className="dropdown-content">
              {countries.map((country) => (
                <Link
                  key={country.strArea}
                  to={`/country/${country.strArea}`}
                  onClick={() => {
                    toggleMenu(); // Fermer le menu burger après la sélection
                    setIsCountriesOpen(false); // Fermer le menu Pays
                  }}
                >
                  {country.strArea}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="search-bar-header">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Rechercher une recette..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button-header">
            Rechercher
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
