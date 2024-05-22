// src/services/apiService.js

import axios from 'axios';

const API_URL = 'https://openlibrary.org';

export const fetchBooks = async (page = 1, limit = 10, query = '') => {
    try {
        const response = await axios.get(`${API_URL}/search.json`, {
            params: {
                q: query || 'subject:fiction',
                page,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from OpenLibrary API:', error);
        throw error;
    }
};
