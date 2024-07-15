import React from 'react';

const Modal = ({
    showModal,
    setShowModal,
    areas,
    categories,
    ingredients,
    handleAreaSelect,
    handleCategorySelect,
    handleIngredientSelect,
    activeTab,
    setActiveTab
}) => {
    // If showModal is false, do not render the modal
    if (!showModal) return null;

    // Function to render the list based on activeTab
    const renderList = () => {
        if (activeTab === 'areas') {
            return areas.map((area) => (
                <div
                    key={area.strArea}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                        handleAreaSelect(area.strArea);
                        setShowModal(false);
                    }}
                >
                    <span className="text-lg font-medium">{area.strArea}</span>
                </div>
            ));
        } else if (activeTab === 'categories') {
            return categories.map((category) => (
                <div
                    key={category.strCategory}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                        handleCategorySelect(category.strCategory);
                        setShowModal(false);
                    }}
                >
                    <span className="text-lg font-medium">{category.strCategory}</span>
                </div>
            ));
        } else if (activeTab === 'ingredients') {
            return ingredients.map((ingredient) => (
                <div
                    key={ingredient.strIngredient}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                        handleIngredientSelect(ingredient.strIngredient);
                        setShowModal(false);
                    }}
                >
                    <span className="text-lg font-medium">{ingredient.strIngredient}</span>
                </div>
            ));
        }
    };

    return (
        // Modal backdrop and container
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full md:w-3/4 h-full overflow-hidden relative">
                <div className="flex h-full">
                    {/* Sidebar for tabs */}
                    <div className="w-1/4 md:w-1/5 bg-gray-100 p-4 overflow-y-auto hide-scrollbar">
                        <button
                            onClick={() => setActiveTab('areas')}
                            className={`block w-full text-left mb-2 ${activeTab === 'areas' ? 'font-bold' : ''}`}
                        >
                            Area
                        </button>
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`block w-full text-left mb-2 ${activeTab === 'categories' ? 'font-bold' : ''}`}
                        >
                            Category
                        </button>
                        <button
                            onClick={() => setActiveTab('ingredients')}
                            className={`block w-full text-left ${activeTab === 'ingredients' ? 'font-bold' : ''}`}
                        >
                            Ingredients
                        </button>
                    </div>
                    {/* Content area for selected tab */}
                    <div className="w-3/4 md:w-4/5 p-4 overflow-y-auto max-h-full hide-scrollbar">
                        <div className="max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
                            {renderList()}
                        </div>
                    </div>
                </div>
                {/* Close button */}
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-2 right-2 text-2xl"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Modal;
