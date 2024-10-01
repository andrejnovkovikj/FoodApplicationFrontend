import axios from '../custom-axios/axios';

const mealService = {
    getAllMeals: async () => {
        try {
            const response = await axios.get('/api/meals');
            return response.data;
        } catch (error) {
            console.error('Error fetching meals', error);
            throw error;
        }
    },

    getMealById: async (id) => {
        try {
            const response = await axios.get(`/api/meals/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching meal with id ${id}`, error);
            throw error;
        }
    },

    createMeal: async (meal) => {
        try {
            const response = await axios.post('/api/meals', meal);
            return response.data;
        } catch (error) {
            console.error('Error creating meal', error);
            throw error;
        }
    },

    updateMeal: async (id, meal) => {
        try {
            const response = await axios.put(`/api/meals/${id}`, meal);
            return response.data;
        } catch (error) {
            console.error(`Error updating meal with id ${id}`, error);
            throw error;
        }
    },

    deleteMeal: async (id) => {
        try {
            await axios.delete(`/api/meals/${id}`);
        } catch (error) {
            console.error(`Error deleting meal with id ${id}`, error);
            throw error;
        }
    },
    filterMealsByIngredients: async (ingredientIds) => {
            try {
                const response = await axios.post('/api/meals/filter', ingredientIds, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching meals by ingredients', error);
                throw error;
            }
        }
};

export default mealService;
