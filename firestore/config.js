import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!admin.apps.length) {
    try {
        if (serviceAccountJson) {
            // Support passing the entire JSON as an environment variable
            const serviceAccount = JSON.parse(serviceAccountJson);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } else if (serviceAccountPath) {
            // Support passing a path to the service account file
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccountPath),
            });
        } else {
            // Fallback to application default credentials (useful for GCP/Vercel/etc.)
            if (process.env.APP_ENV === 'production') {
                console.warn('⚠️ FIREBASE_SERVICE_ACCOUNT_PATH/JSON not found. Falling back to Application Default Credentials.');
            }
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
            });
        }
    } catch (error) {
        console.error('❌ Firebase initialization error:', error.message);
        // In production, we still want to know if it failed completely
        if (process.env.APP_ENV === 'production' && !serviceAccountPath && !serviceAccountJson) {
            console.error('Tip: Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH in your environment variables.');
        }
    }
}

const db = admin.firestore();

const config = {
    admin,
    db
};

export { config };
