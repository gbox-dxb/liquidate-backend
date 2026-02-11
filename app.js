import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { authRoutes, tradeRoutes } from './routes/_index.js';
import { errorHandler } from './middlewares/_index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Global APP_ENV Response Injector
app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
        if (data && typeof data === 'object' && !Array.isArray(data)) {
            // Priority: Request Body > Query Params > Server Variable > Default
            data.APP_ENV = req.body?.APP_ENV || req.query?.APP_ENV || process.env.APP_ENV || 'demo';
        }
        return originalJson.call(this, data);
    };
    next();
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trade', tradeRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Futures API',
        version: '1.0.0',
        status: 200,
        timestamp: new Date().toISOString()
    });
});
app.get('/health', (req, res) => {
    res.json({
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Crypto Futures API Server running on port ${PORT}`);
});

export default app;
