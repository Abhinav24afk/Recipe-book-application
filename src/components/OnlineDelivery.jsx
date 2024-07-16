import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { BsFilterLeft } from "react-icons/bs";

const OnlineDelivery = () => {
    const [data, setData] = useState([]);
    const [areas, setAreas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedArea, setSelectedArea] = useState('Indian');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('areas');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const navigate = useNavigate();

    // Fetch recipe based on selected filters
    const fetchRecipe = async (area, category, ingredient) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (area) params.append('a', area);
            if (category) params.append('c', category);
            if (ingredient) params.append('i', ingredient);

            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${params.toString()}`);
            setData(response?.data?.meals);
        } catch (error) {
            console.error("Error fetching the recipe", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.state) {
            const { selectedArea, selectedCategory, selectedIngredient, currentPage, data } = location.state;
            setSelectedArea(selectedArea);
            setSelectedCategory(selectedCategory);
            setSelectedIngredient(selectedIngredient);
            setCurrentPage(currentPage);
            setData(data);
        }
    }, [location.state]);

    // Fetch list of areas from API
    const fetchAreas = async () => {
        try {
            const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
            setAreas(response?.data?.meals);
        } catch (error) {
            console.error("Error fetching the areas", error);
        }
    };

    // Fetch list of categories from API
    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
            setCategories(response?.data?.meals);
        } catch (error) {
            console.error("Error fetching the categories", error);
        }
    };

    // Fetch list of ingredients from API
    const fetchIngredients = async () => {
        try {
            const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
            setIngredients(response?.data?.meals);
        } catch (error) {
            console.error("Error fetching the ingredients", error);
        }
    };

    // Initial data fetch on component mount
    useEffect(() => {
        fetchAreas();
        fetchCategories();
        fetchIngredients();
        fetchRecipe(selectedArea, selectedCategory, selectedIngredient);
    }, []);

    // Handle selection of an area filter
    const handleAreaSelect = (area) => {
        setSelectedArea(area);
        setSelectedCategory('');
        setSelectedIngredient('');
        setCurrentPage(1);
    };

    // Handle selection of a category filter
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedArea('');
        setSelectedIngredient('');
        setCurrentPage(1);
    };

    // Handle selection of an ingredient filter
    const handleIngredientSelect = (ingredient) => {
        setSelectedIngredient(ingredient);
        setSelectedArea('');
        setSelectedCategory('');
        setCurrentPage(1);
    };

    // Fetch recipe when filters change
    useEffect(() => {
        fetchRecipe(selectedArea, selectedCategory, selectedIngredient);
    }, [selectedArea, selectedCategory, selectedIngredient]);

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
            {/* Section title */}
            <div className="text-2xl font-bold my-5">Top recipes to choose</div>

            {/* Filter and Modal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Filter button */}
                <div className="p-2 rounded-xl shadow cursor-pointer flex items-center mb-2" onClick={() => setShowModal(true)}>
                    Filter <BsFilterLeft className="ml-1" />
                </div>

                {/* Modal for filters */}
                <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    areas={areas}
                    categories={categories}
                    ingredients={ingredients}
                    handleAreaSelect={handleAreaSelect}
                    handleCategorySelect={handleCategorySelect}
                    handleIngredientSelect={handleIngredientSelect}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>

            {/* Display loading spinner when data is loading */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    {/* Grid of cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {currentItems.map((meal, index) => (
                            <Card key={index} {...meal} onClick={() => navigate(`/recipe/${meal.idMeal}`)} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center my-4">
                        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-[#fc8019] text-white' : 'bg-gray-300'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default OnlineDelivery;

