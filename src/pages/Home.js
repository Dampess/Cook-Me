import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css"; // Le fichier CSS que nous allons définir
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/searchBar";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [countries, setCountries] = useState([]);

  // États pour la pagination
  const [categoryPage, setCategoryPage] = useState(1);
  const [recipePage, setRecipePage] = useState(1);
  const [ingredientPage, setIngredientPage] = useState(1);
  const [countryPage, setCountryPage] = useState(1);

  const itemsPerPage = 4; // Résultats par page

  // Récupérer les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  // Récupérer des recettes aléatoires
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        setRecipes(response.data.meals.slice(0, 20)); // Limiter à 20 recettes pour la pagination
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
      }
    };

    fetchRecipes();
  }, []);

  // Récupérer la liste des ingrédients
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        setIngredients(response.data.meals.slice(0, 20)); // Limiter à 20 ingrédients pour la pagination
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des ingrédients :",
          error
        );
      }
    };

    fetchIngredients();
  }, []);

  // Récupérer la liste des pays
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        setCountries(response.data.meals);
      } catch (error) {
        console.error("Erreur lors de la récupération des pays :", error);
      }
    };

    fetchCountries();
  }, []);

  // Pagination logic
  const paginate = (array, page) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return array.slice(indexOfFirstItem, indexOfLastItem);
  };

  const categoryItems = paginate(categories, categoryPage);
  const recipeItems = paginate(recipes, recipePage);
  const ingredientItems = paginate(ingredients, ingredientPage);
  const countryItems = paginate(countries, countryPage);

  return (
    <div className="home-container">
      <Header />
      <header className="home-header">
        <h1>Bienvenue sur Cook&Me</h1>
        <p>
          Découvrez des recettes délicieuses, par ingrédient, catégorie ou pays
          d'origine.
        </p>
      </header>

      <SearchBar />
      
      {/* Section des catégories */}
      <section className="category-section">
        <h2>Explorez nos catégories</h2>
        <div className="category-cards">
          {categoryItems.map((category) => (
            <Link
              key={category.idCategory}
              to={`/category/${category.strCategory}`}
              className="category-card"
            >
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              <h3>{category.strCategory}</h3>
            </Link>
          ))}
        </div>
        {/* Pagination des catégories */}
        <div className="pagination">
          <button
            onClick={() => setCategoryPage(categoryPage - 1)}
            disabled={categoryPage === 1}
          >
            Précédent
          </button>
          <span>Page {categoryPage}</span>
          <button
            onClick={() => setCategoryPage(categoryPage + 1)}
            disabled={categoryPage * itemsPerPage >= categories.length}
          >
            Suivant
          </button>
        </div>
      </section>

      {/* Section des recettes */}
      <section className="recipe-section">
        <h2>Recettes populaires</h2>
        <div className="recipe-cards">
          {recipeItems.map((recipe) => (
            <Link
              key={recipe.idMeal}
              to={`/recipe/${recipe.idMeal}`} // Lien vers la page de détails de la recette
              className="recipe-card"
            >
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
            </Link>
          ))}
        </div>
        {/* Pagination des recettes */}
        <div className="pagination">
          <button
            onClick={() => setRecipePage(recipePage - 1)}
            disabled={recipePage === 1}
          >
            Précédent
          </button>
          <span>Page {recipePage}</span>
          <button
            onClick={() => setRecipePage(recipePage + 1)}
            disabled={recipePage * itemsPerPage >= recipes.length}
          >
            Suivant
          </button>
        </div>
      </section>

      {/* Section des ingrédients */}
      <section className="ingredient-section">
        <h2>Ingrédients principaux</h2>
        <div className="ingredient-cards">
          {ingredientItems.map((ingredient) => (
            <Link
              key={ingredient.idIngredient}
              to={`/ingredient/${ingredient.strIngredient}`}
              className="ingredient-card"
            >
              <img
                src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                alt={ingredient.strIngredient}
              />
              <h3>{ingredient.strIngredient}</h3>
            </Link>
          ))}
        </div>
        {/* Pagination des ingrédients */}
        <div className="pagination">
          <button
            onClick={() => setIngredientPage(ingredientPage - 1)}
            disabled={ingredientPage === 1}
          >
            Précédent
          </button>
          <span>Page {ingredientPage}</span>
          <button
            onClick={() => setIngredientPage(ingredientPage + 1)}
            disabled={ingredientPage * itemsPerPage >= ingredients.length}
          >
            Suivant
          </button>
        </div>
      </section>

      {/* Section des pays */}
      <section className="country-section">
        <h2>Origines des plats</h2>
        <div className="country-cards">
          {countryItems.map((country) => (
            <Link
              key={country.strArea}
              to={`/country/${country.strArea}`}
              className="country-card"
            >
              <img
                src={`https://www.themealdb.com/images/icons/flags/big/${country.strArea.toLowerCase()}.png`}
                alt={country.strArea}
              />
              <h3>{country.strArea}</h3>
            </Link>
          ))}
        </div>
        {/* Pagination des pays */}
        <div className="pagination">
          <button
            onClick={() => setCountryPage(countryPage - 1)}
            disabled={countryPage === 1}
          >
            Précédent
          </button>
          <span>Page {countryPage}</span>
          <button
            onClick={() => setCountryPage(countryPage + 1)}
            disabled={countryPage * itemsPerPage >= countries.length}
          >
            Suivant
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
