import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/navbar';
import MealList from '../MealList/mealList';
import MealDetail from '../MealDetails/mealDetails';
import AddMeal from '../AddMeal/addMeal';
import EditMeal from '../MealEdit/mealEdit';
import IngredientList from '../IngredientList/ingredientList';
import AddIngredient from '../AddIngredient/addIngredient';
import IngredientDetail from '../IngredientDetails/ingredientDetails';
import EditIngredient from '../IngredientEdit/ingredientEdit';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mt-3">
                <div className="row justify-content-center align-items-center" >
                    <div className="col-md-8">
                        <Routes>
                            <Route path="/meals" element={<MealList />} />
                            <Route path="/meals/:id" element={<MealDetail />} />
                            <Route path="/meals/add-meal" element={<AddMeal />} />
                            <Route path="/meals/edit/:id" element={<EditMeal />} />
                            <Route path="/ingredients" element={<IngredientList />} />
                            <Route path="/ingredients/:id" element={<IngredientDetail />} />
                            <Route path="/ingredients/add-ingredient" element={<AddIngredient />} />
                            <Route path="/ingredients/edit/:id" element={<EditIngredient />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
