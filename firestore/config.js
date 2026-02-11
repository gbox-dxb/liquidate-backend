import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath && process.env.NODE_ENV === 'production') {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH is required in production');
}

if (!admin.apps.length) {
    try {
        if (serviceAccountPath) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccountPath),
            });
        } else {
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
            });
        }
    } catch (error) {
        console.error('Firebase initialization error:', error.message);
    }
}

const db = admin.firestore();

const config = {
    admin,
    db
};

export { config };
