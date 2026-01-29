import React, { useState } from 'react';
import ParcelForm from './components/ParcelForm';
import ParcelList from './components/ParcelList';

/**
 * Main App Component
 * Combines ParcelForm and ParcelList components
 * Manages state for refreshing the parcel list
 */
function App() {
    // State to trigger refresh in ParcelList when a new parcel is created
          const [refreshTrigger, setRefreshTrigger] = useState(0);

    /**
     * Callback function passed to ParcelForm
     * Increments refreshTrigger to force ParcelList to re-fetch data
     */
    const handleParcelCreated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="App">
            {/* Header */}
            <header className="app-header">
                <h1>Courier / Parcel Receipt Management System</h1>
                <p>Track and manage courier parcels efficiently</p>
            </header>

            {/* Main content */}
            <main className="app-main">
                {/* Form section */}
                <section className="form-section">
                    <ParcelForm onParcelCreated={handleParcelCreated} />
                </section>

                {/* List section */}
                <section className="list-section">
                    <ParcelList refreshTrigger={refreshTrigger} />
                </section>
            </main>
        </div>
    );
}

export default App;

