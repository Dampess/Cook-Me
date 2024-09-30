import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PopularRecipes.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PopularRecipes = () => {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(8); // Nombre de résultats par page

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        setPopularRecipes(response.data.meals || []);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des recettes populaires",
          error
        );
      }
    };

    fetchPopularRecipes();
  }, []);

  // Calculer les index des résultats à afficher
  const indexOfLastRecipe = currentPage * resultsPerPage; // Dernier index de la recette
  const indexOfFirstRecipe = indexOfLastRecipe - resultsPerPage; // Premier index de la recette
  const currentRecipes = popularRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  ); // Résultats actuels

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(popularRecipes.length / resultsPerPage);

  return (
    <div>
      <Header />
      <div className="popular-recipes">
        <h2>Recettes Populaires</h2>
        <div className="results-grid">
          {currentRecipes.map((recipe) => (
            <div key={recipe.idMeal} className="result-card">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
              <a href={`/recipe/${recipe.idMeal}`}>Voir la recette</a>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PopularRecipes;
