# FRONTEND - React Application

## 📦 How to Run the Frontend

### Step 1: Navigate to the frontend folder
```bash
cd frontend
```

### Step 2: Install dependencies (first time only)
```bash
npm install
```

### Step 3: Start the development server
```bash
npm start
```

The application will automatically open in your browser at: **http://localhost:3000**

---

## 🚀 Deployed Frontend

The frontend is deployed at: **https://courier-tracking-by-dharshini.vercel.app**

---

## 🔧 Make sure Backend is running first!

Before starting the frontend, ensure the Spring Boot backend is running on port 8006:
```bash
cd d:\courier_tracking\courier_tracking
mvn spring-boot:run
```

---

## 📁 Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ParcelForm.js
│   │   └── ParcelList.js
│   ├── services/
│   │   └── parcelService.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public/
│   └── index.html
└── package.json
```

---

## ✅ Features

- Add new parcels with form
- View all parcels in table
- Delete parcels
- Status tracking (RECEIVED, PENDING, DELIVERED)
- Responsive design
- Real-time updates

---

## Challenges Faced

During development and deployment, several integration and configuration challenges were encountered, including backend API connectivity and environment configuration. These issues were resolved by using environment-based API URLs and proper build configuration.

Detailed explanations of these challenges and solutions are documented in the backend repository.
