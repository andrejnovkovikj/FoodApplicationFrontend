import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mealService from '../services/mealService';
import ingredientService from '../services/ingredientService';

const EditMeal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        mealService.getMealById(id)
            .then(data => {
                setMeal(data);
                setSelectedIngredients(data.ingredients || []);
            })
            .catch(error => console.error('Error fetching meal:', error));

        ingredientService.getAllIngredients()
            .then(data => setIngredients(data))
            .catch(error => console.error('Error fetching ingredients:', error));
    }, [id]);

    const addIngredient = (ingredient) => {
        setSelectedIngredients((prevSelected) => {
            if (!prevSelected.some(selected => selected.id === ingredient.id)) {
                return [...prevSelected, ingredient];
            }
            return prevSelected;
        });
    };

    const removeIngredient = (ingredientId) => {
        setSelectedIngredients((prevSelected) => {
            return prevSelected.filter(ingredient => ingredient.id !== ingredientId);
        });
    };

    const handleChange = (e) => {
        setMeal({
            ...meal,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMeal = {
            ...meal,
            ingredients: selectedIngredients
        };
        mealService.updateMeal(id, updatedMeal)
            .then(data => {
                console.log('Meal updated:', data);
                navigate(`/meals/${id}`);
            })
            .catch(error => {
                console.error('Error updating meal:', error);
                alert('Failed to update meal. Please try again.');
            });
    };

    if (!meal) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Meal</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={meal.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL:</label>
                    <input
                        type="text"
                        name="mealImage_url"
                        value={meal.mealImage_url}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                    {meal.mealImage_url && (
                        <div className="mt-2">
                            <img src={meal.mealImage_url} alt="Meal Preview" className="img-fluid" style={{ maxHeight: '200px' }} />
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Recipe:</label>
                    <textarea
                        name="recipe"
                        value={meal.recipe}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                   <label className="form-label">Ingredients portions:</label>
                   <textarea
                   name="ingredients_recipe"
                   value={meal.ingredients_recipe}
                   onChange={handleChange}
                   className="form-control"
                   required
                   />
                </div>
                <div className="mb-3">
                    <label className="form-label">Calories:</label>
                    <input
                        type="number"
                        name="calories"
                        value={meal.calories}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <h3>Ingredients:</h3>
                <div className="ingredient-list mb-3">
                    {ingredients.map(ingredient => (
                        <div key={ingredient.id} className="d-flex justify-content-between align-items-center mb-2">
                            <span>{ingredient.name}</span>
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => addIngredient(ingredient)}
                                    disabled={selectedIngredients.some(selected => selected.id === ingredient.id)}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <h4>Selected Ingredients:</h4>
                <ul className="list-group mb-3">
                    {selectedIngredients.map(selected => (
                        <li key={selected.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {selected.name}
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => removeIngredient(selected.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>

                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditMeal;
