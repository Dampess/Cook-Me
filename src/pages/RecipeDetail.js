import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf"; // Import jsPDF
import html2canvas from "html2canvas"; // Import html2canvas
import "./RecipeDetail.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RecipeDetail = () => {
  const { idMeal } = useParams(); // Récupère l'ID de la recette depuis l'URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const recipeRef = useRef(); // Utiliser une référence pour capturer l'élément HTML
  const videoRef = useRef(); // Référence pour l'élément vidéo

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        setRecipe(response.data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de la recette", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [idMeal]);

  const getIngredientImage = (ingredient) => {
    if (ingredient) {
      return `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
    }
    return "/default-ingredient-icon.png"; // Image par défaut si pas disponible
  };

  // Fonction pour capturer la recette et télécharger en PDF
  const downloadRecipePDF = () => {
    const input = recipeRef.current; // Récupère l'élément de la recette

    // Masquer temporairement la vidéo
    if (videoRef.current) {
      videoRef.current.style.display = "none";
    }

    html2canvas(input, {
      scale: 2,
      useCORS: true,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4"); // Format A4 portrait

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Ajuster la hauteur en fonction du ratio

        // Ajouter l'image de la capture d'écran dans le PDF
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${recipe.strMeal}.pdf`); // Télécharger le fichier PDF

        // Rendre à nouveau visible la vidéo après la capture
        if (videoRef.current) {
          videoRef.current.style.display = "block";
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la génération du PDF", error);
      });
  };

  if (loading) return <p>Chargement de la recette...</p>;
  if (!recipe) return <p>Aucune recette trouvée.</p>;

  return (
    <div>
      <Header />
      <div className="recipe-detail-container" ref={recipeRef}>
        {" "}
        {/* Référence pour la capture */}
        <h1>La Recette {recipe.strMeal}</h1>
        <div className="recipe-header">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="recipe-image"
          />

          <div className="recipe-ingredients">
            <h2>Ingrédients</h2>
            <ul className="ingredient-list">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];
                return (
                  ingredient && (
                    <li key={i} className="ingredient-item">
                      <img
                        src={getIngredientImage(ingredient)}
                        alt={ingredient}
                        className="ingredient-image"
                      />
                      <span>
                        {measure} {ingredient}
                      </span>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
        <div className="extra-info">
          <p>
            <strong>Catégorie:</strong> {recipe.strCategory}
          </p>
          <p>
            <strong>Cuisine:</strong> {recipe.strArea}
          </p>
        </div>
        {/* Masquer la vidéo dans le PDF */}
        {recipe.strYoutube && (
          <div className="recipe-video" ref={videoRef}>
            <h2>Vidéo de préparation</h2>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                recipe.strYoutube.split("=")[1]
              }`}
              title="Vidéo de recette"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <hr />
        <h2>Instructions</h2>
        <p>{recipe.strInstructions}</p>
        {/* Menu Suggestions Section */}
        <div className="menu-suggestions">
          <h2>Menu suggéré</h2>
          <div className="menu-cards">
            <div className="menu-card">
              <h3>Entrée</h3>
              <p>Salade César légère</p>
              <img src="/salad.jpg" alt="Entrée" />
            </div>
            <div className="menu-card">
              <h3>Accompagnement</h3>
              <p>Pommes de terre sautées</p>
              <img src="/potatoes.jpg" alt="Accompagnement" />
            </div>
            <div className="menu-card">
              <h3>Plat Principal</h3>
              <p>Poulet Rôti aux herbes</p>
              <img src="/roast-chicken.jpg" alt="Plat Principal" />
            </div>
            <div className="menu-card">
              <h3>Dessert</h3>
              <p>Tarte aux pommes</p>
              <img src="/apple-pie.jpg" alt="Dessert" />
            </div>
          </div>
        </div>
        {/* Bouton pour télécharger la recette */}
        <button onClick={downloadRecipePDF} className="download-button">
          Télécharger la recette en PDF
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
