import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mealService from '../services/mealService';
import ingredientService from '../services/ingredientService';

const AddMeal = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [recipe, setRecipe] = useState('');
    const [ingredients_recipe,setIngredients_Recipe] = useState('');
    const [calories, setCalories] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [availableIngredients, setAvailableIngredients] = useState([]);

    useEffect(() => {
        ingredientService.getAllIngredients()
            .then(data => setAvailableIngredients(data))
            .catch(error => console.error('Error fetching ingredients:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMeal = { name, image_url, recipe, calories, ingredients };

        mealService.createMeal(newMeal)
            .then(() => navigate('/meals'))
            .catch(error => console.error('Error adding meal:', error));
    };

    const handleAddIngredient = (ingredient) => {
        setIngredients(prev => [...prev, ingredient]);
    };

    const handleRemoveIngredient = (ingredientToRemove) => {
        setIngredients(prev => prev.filter(ingredient => ingredient !== ingredientToRemove));
    };

    return (
        <div className="container justify-content-center">
            <h1 className="mt-4 mb-4 text-center">Add Meal</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL:</label>
                    <input
                        type="text"
                        value={image_url}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Recipe:</label>
                    <textarea
                        value={recipe}
                        onChange={(e) => setRecipe(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                                    <label className="form-label">Ingredients portion:</label>
                                    <textarea
                                        value={ingredients_recipe}
                                        onChange={(e) => setIngredients_Recipe(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>

                <div className="mb-3">
                    <label className="form-label">Calories:</label>
                    <input
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ingredients:</label>
                    <ul className="list-group mb-3">
                        {availableIngredients.map(ingredient => (
                            <li key={ingredient.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {ingredient.name}
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    onClick={() => handleAddIngredient(ingredient)}
                                >
                                    Add
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Selected Ingredients:</h3>
                    <ul className="list-group mb-3">
                        {ingredients.map(ingredient => (
                            <li key={ingredient.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {ingredient.name}
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveIngredient(ingredient)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit" className="btn btn-primary">Add Meal</button>
            </form>
        </div>
    );

};

export default AddMeal;
