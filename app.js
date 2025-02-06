const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes');
const appRouter = require('./routes/appRoutes');
const viewRouter = require('./routes/viewRoutes');

dotenv.config({ path: './config.env' });

const app = express();

// ✅ CORS Middleware - Allows frontend access (both local and deployed)
app.use(cors({
  origin: ['http://localhost:4001', 'https://gcit-hub-13.onrender.com'], // ✅ Add your local and deployed frontend URLs
  credentials: true // ✅ Allows sending cookies with requests
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/images', express.static(path.join(__dirname, 'views/img')));
app.use('/components', express.static(path.join(__dirname, 'views/components')));
app.use('/js', express.static(path.join(__dirname, 'views/js')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Debugging Middleware - Check if cookies are received


// API Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/apps', appRouter);
app.use('/', viewRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message });
});

module.exports = app; // ✅ Export app only (server will be in `server.js`)
