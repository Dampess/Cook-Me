import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import IngredientPage from "./pages/IngredientPage";
import CountryPage from "./pages/CountryPage";
import RecipeDetail from "./pages/RecipeDetail";
import SearchResults from "./pages/SearchResults";
import PopularRecipes from "./pages/PopularRecipes";

const App = () => {
  return (
    <Router basename="/Cook-Me">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route
          path="/ingredient/:ingredientName"
          element={<IngredientPage />}
        />
        <Route path="/country/:countryName" element={<CountryPage />} />
        <Route path="/recipe/:idMeal" element={<RecipeDetail />} />
        <Route path="/search/:searchTerm" element={<SearchResults />} />
        <Route path="/popular" element={<PopularRecipes />} />
      </Routes>
    </Router>
  );
};

export default App;
