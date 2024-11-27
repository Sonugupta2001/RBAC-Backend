import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const helmet = require('helmet');
const { swaggerUi, specs } = require('./config/swagger');
const authRoutes = require('./routes/auth');
const { authenticate, authorize } = require('./middlewares/rbac');

cors = require('cors');
const app = express();
dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/users' ,userRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});