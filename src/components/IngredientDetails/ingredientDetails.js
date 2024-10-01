import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ingredientService from '../services/ingredientService';

const IngredientDetails = () => {
    const { id } = useParams();
    const [ingredient, setIngredient] = useState(null);

    useEffect(() => {
        ingredientService.getIngredientById(id)
            .then(data => setIngredient(data))
            .catch(error => console.error(error));
    }, [id]);

    if (!ingredient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid mt-5 p-4">
            <h1 className="text-center">{ingredient.name}</h1>
            <div className="d-flex justify-content-center mb-3">
                <img
                    src={ingredient.image_url}
                    alt={ingredient.name}
                    className="img-fluid"
                    style={{ width: '200px', height: '200px' }}
                />
            </div>
            <p className="lead text-center">Type: {ingredient.type}</p>

        </div>
    );

};

export default IngredientDetails;
