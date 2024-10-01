import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mealService from '../services/mealService';
import { Link } from 'react-router-dom';

const MealDetail = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        mealService.getMealById(id)
            .then(data => setMeal(data))
            .catch(error => console.error(error));
    }, [id]);

    if (!meal) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid mt-5 p-4 ">
            <h1>{meal.name}</h1>
            <div className="d-flex mb-3">
                <img
                    src={meal.mealImage_url}
                    alt={meal.name}
                    className="img-fluid"
                    style={{ width: '200px', height: '200px' }}
                />
            </div>
            <h3> Recipe:</h3>
                <p className="lead" style={{ textAlign: 'justify' }}>{meal.recipe}</p>
            <h5>Ingredients recipe:</h5>
                <ul className="lead" style={{ textAlign: 'justify' }}>
                    {meal.ingredients_recipe.split(',').map((ingredient, index) => (
                        <li key={index} className="list-group-item">{ingredient.trim()}</li>
                    ))}
                </ul>
                <p className="h5">Calories: {meal.calories}</p>

            <h3 className="mt-4">Ingredients</h3>
            <ul className="list-group list-group-flush">
                {meal.ingredients && meal.ingredients.length > 0 ? (
                    meal.ingredients.map(ingredient => (
                        <li key={ingredient.id} className="list-group-item">
                            <Link to={`/ingredients/${ingredient.id}`} className="nav-link">
                                {ingredient.name}
                            </Link>
                        </li>

                    ))
                ) : (
                    <li className="list-group-item">No ingredients listed</li>
                )}
            </ul>
        </div>
    );



};

export default MealDetail;
