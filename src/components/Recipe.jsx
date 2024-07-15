import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const Recipe = () => {
    const { idMeal } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                setRecipe(response.data.meals[0]);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [idMeal]);

    // Display loading message while fetching data
    if (loading) return <div>Loading...</div>;

    // If recipe not found, display message
    if (!recipe) return <div>No recipe found</div>;

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="text-black-500 underline mb-4 flex items-center"
            >
                <FaArrowLeft className="h-3 w-3 mr-2" />
                Back
            </button>

            {/* Recipe details */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Left column: Title, Image, Ingredients */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-auto rounded-lg mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
                    <ul className="list-disc list-inside mb-4">
                        {Array.from({ length: 20 }).map((_, i) => {
                            const ingredient = recipe[`strIngredient${i + 1}`];
                            const measure = recipe[`strMeasure${i + 1}`];
                            return ingredient ? <li key={i}>{`${ingredient} - ${measure}`}</li> : null;
                        })}
                    </ul>
                </div>

                {/* Right column: Instructions, Video */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">Instructions</h2>
                    <p className="mb-4">{recipe.strInstructions}</p>
                    {recipe.strYoutube && (
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold mb-2">Video</h2>
                            <a
                                href={recipe.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recipe;

