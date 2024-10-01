import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ingredientService from '../services/ingredientService';

const IngredientEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ingredient, setIngredient] = useState({
        name: '',
        image_url: '',
        type: ''
    });

    useEffect(() => {
        ingredientService.getIngredientById(id)
            .then(data => setIngredient(data))
            .catch(error => console.error('Error fetching ingredient:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngredient(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ingredientService.updateIngredient(id, ingredient)
            .then(() => {
                navigate(`/ingredients/${id}`);
            })
            .catch(error => {
                console.error('Error updating ingredient:', error);
                alert('Failed to update ingredient. Please try again.');
            });
    };

    if (!ingredient.name) {
        return <div>Loading...</div>;
    }

    return (
            <div>
                <h1>Edit Ingredient</h1>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={ingredient.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image URL:</label>
                        <input
                            type="text"
                            name="image_url"
                            value={ingredient.image_url}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        {ingredient.image_url && (
                            <div className="mt-2">
                                <img src={ingredient.image_url} alt="Ingredient Preview" className="img-fluid" style={{ maxHeight: '200px' }} />
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Type:</label>
                        <select
                            name="type"
                            value={ingredient.type}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="" disabled>Select type</option>
                            <option value="FRUIT">Fruit</option>
                            <option value="VEGETABLE">Vegetable</option>
                            <option value="DAIRY">Dairy</option>
                            <option value="MEAT">Meat</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            </div>
        );
};

export default IngredientEdit;
