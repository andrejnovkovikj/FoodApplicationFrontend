import React, { useEffect, useState } from 'react';
import ingredientService from '../services/ingredientService';
import { Link } from 'react-router-dom';

const IngredientList = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        ingredientService.getAllIngredients()
            .then(data => setIngredients(data))
            .catch(error => console.error("Error fetching ingredients:", error));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this ingredient?")) {
            try {
                await ingredientService.deleteIngredient(id);
                setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
            } catch (error) {
                console.error("Error deleting ingredient:", error);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-4 text-center">Ingredients</h1>
            <ul className="list-group">
                {ingredients.map(ingredient => (
                    <li key={ingredient.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img src={ingredient.image_url} alt={ingredient.name} className="img-thumbnail me-3" style={{ width: '70px', height: '70px' }} />
                            <Link to={`/ingredients/${ingredient.id}`} className="me-3">{ingredient.name}</Link>
                        </div>
                        <div>
                            <Link to={`/ingredients/edit/${ingredient.id}`} className="btn btn-secondary btn-sm me-2">Edit</Link>
                            <button onClick={() => handleDelete(ingredient.id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientList;
