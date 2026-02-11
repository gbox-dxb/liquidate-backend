import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

/**
 * PROD-READY FIREBASE CONFIGURATION
 * To use this in production:
 * 1. Go to Firebase Console > Project Settings > Service Accounts.
 * 2. Generate a new private key and download the JSON.
 * 3. Store the JSON content securely or provide the path via FIREBASE_SERVICE_ACCOUNT_PATH.
 */

// For demonstration, we assume a service account JSON or credentials via environment variables
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath && process.env.NODE_ENV === 'production') {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH is required in production');
}

// Initialize Firebase Admin
if (!admin.apps.length) {
    try {
        if (serviceAccountPath) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccountPath),
            });
        } else {
            // Fallback for development if using ADC (Application Default Credentials)
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
            });
        }
    } catch (error) {
        console.error('Firebase initialization error:', error.message);
    }
}

const db = admin.firestore();

export { admin, db };
