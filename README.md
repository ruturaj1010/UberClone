# Uber Clone

A full-stack Uber-like ride booking web application built with a modern MERN architecture. The project simulates core ride-hailing workflows including authentication, live location tracking, ride requests, and real-time driver–rider communication.

---

## Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS 4
- React Router 7
- React Leaflet (maps & geolocation)
- Socket.IO Client (real-time updates)
- Axios (API communication)
- GSAP (animations)

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)
- Socket.IO (real-time events)
- Express Validator
- Cookie-Parser + CORS

---

## Features

- User & Driver authentication with role-based access
- Secure JWT login stored in HTTP-only cookies
- Live location tracking rendered on an interactive map
- Ride request & acceptance flow between riders and drivers
- Real-time ride status updates via Socket.IO
- Driver–Rider communication events
- Responsive UI built with Tailwind CSS
- Smooth animations powered by GSAP

---

## Project Structure

```
UberClone/
│
├── Frontend/        → React + Vite client
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── vite.config.js
│
├── Backend/         → Express API + MongoDB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── app.js
│   └── socket.js
│
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js 18 or later
- npm or compatible package manager
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Clone Repository

**If you want your own copy or plan to contribute**, first fork the repository on GitHub, then clone your fork:
```bash
git clone https://github.com/your-username/UberClone.git
cd UberClone
```

**If you are cloning the original repository directly:**
```bash
git clone https://github.com/ruturaj1010/UberClone.git
cd UberClone
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend/` directory (keys must match the server):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

Note: the backend reads `FRONTEND_URL` for CORS. Ensure this key exists or update `Backend/app.js` to match your env key.

Run the backend development server:

```bash
npm run dev
```

Backend default address (when `PORT=5000`): `http://localhost:5000`

If you prefer the server to fall back to a default port, ensure `Backend/app.js` uses `process.env.PORT || 5000`.

### Frontend Setup

Open a new terminal, then:

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

Tip: the frontend provides a lint script: `npm run lint`.

---

## Authentication Flow

1. User or driver registers / logs in via the auth endpoints
2. Backend validates credentials and hashes passwords using bcrypt
3. JWT token is issued and stored in a secure HTTP-only cookie
4. Protected routes verify the token on every request
5. Role-based access control separates driver and rider permissions

---

## Real-Time Communication

Socket.IO powers all live features across the app:

- **Ride request broadcasting** — riders emit a request that nearby drivers receive instantly
- **Driver acceptance events** — accepted rides are pushed to the rider in real time
- **Live location updates** — driver position is continuously streamed to the map
- **Ride status changes** — both parties receive synchronized status transitions (requested → accepted → in-progress → completed)

---

## Maps & Location

The app uses **React Leaflet** with **OpenStreetMap** tiles (no API key required) for:

- Pickup & drop location selection
- Driver movement visualization on the map
- Route and position awareness throughout the ride

---

## Future Improvements

- Ride fare estimation based on distance
- Route distance & duration calculation
- Payment gateway integration
- Driver availability toggle
- Ride history dashboard
- Admin panel
- Push notifications

---

## Troubleshooting

- Ensure a `.env` file exists in `Backend/` with `PORT`, `MONGO_URI`, `JWT_SECRET`, and `FRONTEND_URL` set.
- If the server fails to start, confirm Node.js version is >= 18 and that MongoDB connection string is correct.

---

## Author

**Ruturaj Nikam**

---