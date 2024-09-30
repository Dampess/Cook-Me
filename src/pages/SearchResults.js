import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Importez useParams
import axios from "axios";
import "./SearchResults.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SearchResults = () => {
  const { searchTerm } = useParams(); // Récupère le terme de recherche depuis l'URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 8; // Résultats par page

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        setResults(response.data.meals || []); // Met à jour les résultats
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche", error);
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  if (loading) return <p>Chargement des résultats...</p>;
  if (!results.length)
    return <p>Aucune recette trouvée pour "{searchTerm}".</p>;

  return (
    <div>
      <Header />
      <div className="search-results">
        <h2>Résultats pour "{searchTerm}"</h2>
        <div className="results-grid">
          {currentResults.map((meal) => (
            <div key={meal.idMeal} className="result-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <Link to={`/recipe/${meal.idMeal}`}>Voir la recette</Link>
            </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
