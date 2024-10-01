import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ingredientService from '../services/ingredientService';

const AddIngredient = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newIngredient = { name, image_url, type };

        ingredientService.createIngredient(newIngredient)
            .then(() => navigate('/ingredients'))
            .catch(error => console.error('Error adding ingredient:', error));
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Add Ingredient</h1>
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
                    <label className="form-label">Type:</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
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
                <button type="submit" className="btn btn-primary">Add Ingredient</button>
            </form>
        </div>
    );

};

export default AddIngredient;
