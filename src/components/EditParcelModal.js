import React, { useState, useEffect } from 'react';
import { updateParcel } from '../services/parcelService';

/**
 * EditParcelModal Component
 * Modal for editing parcel details
 */
const EditParcelModal = ({ parcel, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        senderName: '',
        receiverName: '',
        parcelDescription: '',
        receivedDate: '',
        status: 'RECEIVED',
        contactNumber: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (parcel) {
            setFormData({
                senderName: parcel.senderName || '',
                receiverName: parcel.receiverName || '',
                parcelDescription: parcel.parcelDescription || '',
                receivedDate: parcel.receivedDate || '',
                status: parcel.status || 'RECEIVED',
                contactNumber: parcel.contactNumber || ''
            });
        }
    }, [parcel]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await updateParcel(parcel.id, formData);
            onUpdate();
            onClose();
        } catch (err) {
            setError('Failed to update parcel. Please try again.');
            console.error('Error updating parcel:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Parcel #{parcel?.id}</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="parcel-form">
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

                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label htmlFor="parcelDescription">Parcel Description *</label>
                        <textarea
                            id="parcelDescription"
                            name="parcelDescription"
                            value={formData.parcelDescription}
                            onChange={handleChange}
                            required
                            placeholder="Enter parcel description"
                            rows="3"
                        />
                    </div>

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

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Parcel'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditParcelModal;
