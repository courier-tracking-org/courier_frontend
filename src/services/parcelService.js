import axios from 'axios';

/**
 * Service for making API calls to the backend
 * Base URL points to Spring Boot backend running on the configured port
 */
const API_BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/parcels`;

/**
 * Fetch all parcels from the backend
 * GET /api/parcels
 */
export const getAllParcels = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching parcels:', error);
        throw error;
    }
};

/**
 * Create a new parcel
 * POST /api/parcels
 * @param {Object} parcelData - Parcel data to create
 */
export const createParcel = async (parcelData) => {
    try {
        const response = await axios.post(API_BASE_URL, parcelData);
        return response.data;
    } catch (error) {
        console.error('Error creating parcel:', error);
        throw error;
    }
};

/**
 * Get a parcel by ID
 * GET /api/parcels/{id}
 * @param {number} id - Parcel ID to fetch
 */
export const getParcelById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching parcel:', error);
        throw error;
    }
};

/**
 * Update a parcel by ID
 * PUT /api/parcels/{id}
 * @param {number} id - Parcel ID to update
 * @param {Object} parcelData - Updated parcel data
 */
export const updateParcel = async (id, parcelData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, parcelData);
        return response.data;
    } catch (error) {
        console.error('Error updating parcel:', error);
        throw error;
    }
};

/**
 * Delete a parcel by ID
 * DELETE /api/parcels/{id}
 * @param {number} id - Parcel ID to delete
 */
export const deleteParcel = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting parcel:', error);
        throw error;
    }
};
