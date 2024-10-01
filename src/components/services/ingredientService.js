import axios from '../custom-axios/axios';

const ingredientService = {
    getAllIngredients: async () => {
        try {
            const response = await axios.get('/api/ingredients');
            return response.data;
        } catch (error) {
            console.error('Error fetching ingredients', error);
            throw error;
        }
    },

    getIngredientById: async (id) => {
        try {
            const response = await axios.get(`/api/ingredients/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ingredient with id ${id}`, error);
            throw error;
        }
    },

    createIngredient: async (ingredient) => {
        try {
            const response = await axios.post('/api/ingredients', ingredient);
            return response.data;
        } catch (error) {
            console.error('Error creating ingredient', error);
            throw error;
        }
    },

    updateIngredient: async (id, ingredient) => {
        try {
            const response = await axios.put(`/api/ingredients/${id}`, ingredient);
            return response.data;
        } catch (error) {
            console.error(`Error updating ingredient with id ${id}`, error);
            throw error;
        }
    },

    deleteIngredient: async (id) => {
        try {
            await axios.delete(`/api/ingredients/${id}`);
        } catch (error) {
            console.error(`Error deleting ingredient with id ${id}`, error);
            throw error;
        }
    }
};

export default ingredientService;
