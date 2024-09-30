import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./IngredientsCategoryCountry.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8; // Résultats par page

  useEffect(() => {
    const fetchCategoryRecipes = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
        );
        setRecipes(response.data.meals);
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
      }
    };

    fetchCategoryRecipes();
  }, [categoryName]);

  // Pagination logic
  const indexOfLastRecipe = currentPage * resultsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - resultsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / resultsPerPage);

  return (
    <div>
      <Header />
      <h2>Recettes de la catégorie : {categoryName}</h2>
      <div className="cards-container page-container">
        {currentRecipes.map((recipe) => (
          <Link
            key={recipe.idMeal}
            to={`/recipe/${recipe.idMeal}`} // Lien vers la page de détails de la recette
            className="card"
          >
            <img
              className="card-img"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <h3 className="card-h3">{recipe.strMeal}</h3>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
