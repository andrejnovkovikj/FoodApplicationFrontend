import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/meals">FoodApp</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/ingredients">Ingredients</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/meals">Meals</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ingredients/add-ingredient">Add Ingredient</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/meals/add-meal">Add Meal</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
