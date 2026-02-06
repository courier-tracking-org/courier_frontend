import React, { useState } from 'react';
import { createParcel } from '../services/parcelService';

/**
 * ParcelForm Component
 * Handles form input for creating new parcels
 * Props:
 * - onParcelCreated: callback function to refresh parcel list after creation
 */
const ParcelForm = ({ onParcelCreated }) => {
    // State to hold form data
    const [formData, setFormData] = useState({
        senderName: '',
        receiverName: '',
        parcelDescription: '',
        receivedDate: '',
        status: 'RECEIVED',
        contactNumber: ''
    });

    // State for loading and error handling
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    /**
     * Handle input changes and update form state
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /**
     * Handle form submission
     * Sends POST request to create a new parcel
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            // Call API to create parcel
            await createParcel(formData);
            
            // Show success message
            setSuccess('Parcel created successfully!');
            
            // Reset form
            setFormData({
                senderName: '',
                receiverName: '',
                parcelDescription: '',
                receivedDate: '',
                status: 'RECEIVED',
                contactNumber: ''
            });

            // Notify parent component to refresh list
            if (onParcelCreated) {
                onParcelCreated();
            }

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to create parcel. Please try again.');
            console.error('Error creating parcel:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="parcel-form-container">
            <h2>Add New Parcel</h2>
            
            {/* Success message */}
            {success && <div className="alert alert-success">{success}</div>}
            
            {/* Error message */}
            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit} className="parcel-form">
                {/* Sender Name */}
                <div className="form-group">
                    <label htmlFor="senderName">Sender Name *</label>
                    <input
                        type="text"
                        id="senderName"
                        name="senderName"
                        value={formData.senderName}
                        onChange={handleChange}
                        required
                        placeholder="Enter sender name"
                    />
                </div>

                {/* Receiver Name */}
                <div className="form-group">
                    <label htmlFor="receiverName">Receiver Name *</label>
                    <input
                        type="text"
                        id="receiverName"
                        name="receiverName"
                        value={formData.receiverName}
                        onChange={handleChange}
                        required
                        placeholder="Enter receiver name"
                    />
                </div>

                {/* Parcel Description */}
                <div className="form-group">
                    <label htmlFor="parcelDescription">Parcel Description *</label>
                    <textarea
                        id="parcelDescription"
                        name="parcelDescription"
                        value={formData.parcelDescription}
                        onChange={handleChange}
                        required
                        placeholder="Enter parcel description"
                        rows="1"
                    />
                </div>

                {/* Arrival Date */}
                <div className="form-group">
                    <label htmlFor="receivedDate">Arrival Date *</label>
                    <input
                        type="date"
                        id="receivedDate"
                        name="receivedDate"
                        value={formData.receivedDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Status */}
                <div className="form-group">
                    <label htmlFor="status">Status *</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="RECEIVED">RECEIVED</option>
                        <option value="PENDING">PENDING</option>
                        <option value="DELIVERED">DELIVERED</option>
                    </select>
                </div>

                {/* Contact Number */}
                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter contact number (optional)"
                    />
                </div>

                {/* Submit Button */}
                <div className="form-actions full-span">
                    <button 
                        type="submit" 
                        className="btn-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Parcel'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ParcelForm;
