// import express from 'express';
// import cors from 'cors';

// // Import routes
// import userRoutes from './routes/userRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';
// import aiRoutes from './routes/aiRoutes.js';

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/ai', aiRoutes);

// // Root route
// app.get('/', (req, res) => {
//     res.send('Backend is running!');
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });




import express from 'express';
import cors from 'cors';

// Import routes
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);   // ⭐ ADD THIS

// Root route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
