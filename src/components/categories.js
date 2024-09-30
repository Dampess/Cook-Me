import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Catégories de recettes</h2>
      <div>
        {categories.map((category) => (
          <div key={category.idCategory}>
            <h3>{category.strCategory}</h3>
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <p>{category.strCategoryDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
