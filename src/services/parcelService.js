import axios from 'axios';

/**
 * Service for making API calls to the backend
 * Base URL points to Spring Boot backend running on the configured port
 */

// Create axios instance with default config


// Log the backend URL for debugging
console.log('Backend URL from env:', process.env.REACT_APP_BACKEND_URL);

/**
 * Fetch all parcels from the backend
 * GET /api/parcels
 */
export const getAllParcels = async () => {
    try {
        const response = await axiosInstance.get('/api/parcels');
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
        const response = await axiosInstance.post('/api/parcels', parcelData);
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
        const response = await axiosInstance.get(`/api/parcels/${id}`);
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
        const response = await axiosInstance.put(`/api/parcels/${id}`, parcelData);
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
        await axiosInstance.delete(`/api/parcels/${id}`);
    } catch (error) {
        console.error('Error deleting parcel:', error);
        throw error;
    }
};
