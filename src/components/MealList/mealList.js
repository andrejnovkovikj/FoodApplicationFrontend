import React, { useEffect, useState } from 'react';
import mealService from '../services/mealService';
import ingredientService from '../services/ingredientService';
import { Link } from 'react-router-dom';

const MealList = () => {
    const [meals, setMeals] = useState([]);
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        mealService.getAllMeals()
            .then(data => setMeals(data))
            .catch(error => console.error(error));

        ingredientService.getAllIngredients()
            .then(data => setAvailableIngredients(data))
            .catch(error => console.error('Error fetching ingredients:', error));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this meal?")) {
            try {
                await mealService.deleteMeal(id);
                setMeals(meals.filter(meal => meal.id !== id));
            } catch (error) {
                console.error("Error deleting meal:", error);
            }
        }
    };

    const handleIngredientSelection = (ingredientId) => {
        setSelectedIngredientIds((prev) => {
            if (prev.includes(ingredientId)) {
                return prev.filter(id => id !== ingredientId);
            } else {
                return [...prev, ingredientId];
            }
        });
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const fetchMealsByIngredients = async () => {
        if (selectedIngredientIds.length === 0) {
            mealService.getAllMeals()
                .then(data => setMeals(data))
                .catch(error => console.error(error));
            return;
        }

        try {
            const filteredMeals = await mealService.filterMealsByIngredients(selectedIngredientIds);
            setMeals(filteredMeals);
        } catch (error) {
            console.error('Error fetching meals by ingredients:', error);
        }
    };

    const filteredIngredients = searchTerm ? availableIngredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const handleReset = () => {
        setSelectedIngredientIds([]);
        setSearchTerm("");
        mealService.getAllMeals()
            .then(data => setMeals(data))
            .catch(error => console.error(error));
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-4 text-center">Meals</h1>
            <div className="mb-3">
                <h4>Add Ingredients:</h4>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search for an ingredient"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                />
                {searchTerm && (
                    <>
                        {filteredIngredients.length === 0 ? (
                            <p className="text-muted">No matching ingredients found.</p>
                        ) : (
                            <ul className="list-group mb-3">
                                {filteredIngredients.map(ingredient => (
                                    <li key={ingredient.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span
                                            onClick={() => {
                                                handleIngredientSelection(ingredient.id);
                                                setSearchTerm("");
                                            }}
                                            style={{ cursor: 'pointer', color: 'black' }}
                                        >
                                            {ingredient.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}

                <h5>Find Meals That Have The Following Ingredients:</h5>
                <ul className="list-group mb-3">
                    {availableIngredients.filter(ingredient => selectedIngredientIds.includes(ingredient.id)).map(ingredient => (
                        <li key={ingredient.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{ingredient.name}</span>
                            <button onClick={() => handleIngredientSelection(ingredient.id)} className="btn btn-danger btn-sm">Remove</button>
                        </li>
                    ))}
                </ul>
                <button onClick={fetchMealsByIngredients} className="btn btn-primary mb-3">Filter Meals</button>
                <button onClick={handleReset} className="btn btn-secondary mb-3 ms-3">Reset</button>

            </div>
            <ul className="list-group">
                {meals.map(meal => (
                    <li key={meal.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img src={meal.mealImage_url} alt={meal.name} className="img-thumbnail me-3" style={{ width: '70px', height: '70px' }} />
                            <Link to={`/meals/${meal.id}`} className="me-3">{meal.name}</Link>
                        </div>
                        <div>
                            <Link to={`/meals/edit/${meal.id}`} className="btn btn-secondary btn-sm me-2">Edit</Link>
                            <button onClick={() => handleDelete(meal.id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MealList;
