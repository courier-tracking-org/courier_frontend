import React, { useState, useEffect } from 'react';
import { getAllParcels, deleteParcel } from '../services/parcelService';
import EditParcelModal from './EditParcelModal';

/**
 * ParcelList Component
 * Displays all parcels in a table format
 * Provides delete functionality for each parcel
 * Props:
 * - refreshTrigger: used to refresh the list when a new parcel is added
 */
const ParcelList = ({ refreshTrigger, onParcelUpdated }) => {
    // State to hold parcels data
    const [parcels, setParcels] = useState([]);
    
    // State for loading and error handling
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for edit modal
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    /**
     * Fetch parcels from the backend
     * Called on component mount and when refreshTrigger changes
     */
    const fetchParcels = async () => {
        setIsLoading(true);
        setError('');
        
        try {
            const data = await getAllParcels();
            setParcels(data);
        } catch (err) {
            setError('Failed to fetch parcels. Make sure the backend is running.');
            console.error('Error fetching parcels:', err);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle parcel edit - open modal
     * @param {Object} parcel - Parcel to edit
     */
    const handleEdit = (parcel) => {
        setSelectedParcel(parcel);
        setIsEditModalOpen(true);
    };

    /**
     * Close edit modal
     */
    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedParcel(null);
    };

    /**
     * Handle successful parcel update
     */
    const handleUpdateSuccess = () => {
        fetchParcels();
        if (onParcelUpdated) {
            onParcelUpdated();
        }
    };
    /**
     * Handle parcel deletion
     * @param {number} id - Parcel ID to delete
     */
    const handleDelete = async (id) => {
        // Confirm before deleting
        if (window.confirm('Are you sure you want to delete this parcel?')) {
            try {
                await deleteParcel(id);
                // Refresh the list after deletion
                fetchParcels();
            } catch (err) {
                alert('Failed to delete parcel. Please try again.');
                console.error('Error deleting parcel:', err);
            }
        }
    };

    /**
     * Format date for display
     * @param {string} dateString - Date string from backend
     */
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    /**
     * Get status badge class based on status value
     * @param {string} status - Parcel status
     */
    const getStatusClass = (status) => {
        switch (status) {
            case 'RECEIVED':
                return 'status-received';
            case 'PENDING':
                return 'status-pending';
            case 'DELIVERED':
                return 'status-delivered';
            default:
                return '';
        }
    };

    // Fetch parcels when component mounts or refreshTrigger changes
    useEffect(() => {
        fetchParcels();
    }, [refreshTrigger]);

    return (
        <div className="parcel-list-container">
            <h2>Parcel List</h2>

            {error && <div className="alert alert-error">{error}</div>}

            {isLoading ? (
                <div className="loading">Loading parcels...</div>
            ) : (
                <>
                    <p className="parcel-count">Total Parcels: {parcels.length}</p>

                    {parcels.length === 0 ? (
                        <p className="no-data">No parcels found. Add a new parcel to get started.</p>
                    ) : (
                        <div className="cards-container" aria-label="Parcels">
                            <div className="parcel-cards">
                                {parcels.map((parcel) => (
                                    <article key={parcel.id} className="parcel-card">
                                        <div className="card-header">
                                            <span className="card-title">#{parcel.id} • {parcel.senderName} → {parcel.receiverName}</span>
                                            <span className={`status-badge ${getStatusClass(parcel.status)}`}>{parcel.status}</span>
                                        </div>
                                        <div className="card-body">
                                            <div><strong>Description:</strong> {parcel.parcelDescription}</div>
                                            <div><strong>Arrival:</strong> {formatDate(parcel.receivedDate)}</div>
                                            <div><strong>Contact:</strong> {parcel.contactNumber || '-'}</div>
                                        </div>
                                        <div className="card-actions">
                                            <button
                                                   onClick={() => handleEdit(parcel)}
                                                className="btn-edit"
                                                title="Edit parcel"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(parcel.id)}
                                                className="btn-delete"
                                                title="Delete parcel"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
            
                {isEditModalOpen && selectedParcel && (
                    <EditParcelModal 
                        parcel={selectedParcel}
                        onClose={handleCloseModal}
                        onUpdate={handleUpdateSuccess}
                    />
                )}
        </div>
    );
};

export default ParcelList;
