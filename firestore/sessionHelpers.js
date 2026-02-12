import { config } from './config.js';
import { userHelpers } from './userHelpers.js';

const SESSIONS_COLLECTION = 'sessions';

/**
 * Create a new session in Firestore
 * Document ID is the userId to ensure single-session logic (overwrites existing)
 * Original signature: createSession(token, email)
 */
const createSession = async (token, email) => {
    // 1. Get userId for the email (Minimal change to keep controller original)
    const user = await userHelpers.getUserByEmail(email);
    if (!user) throw new Error('User not found');

    const userId = user.id;
    const serverTimestamp = config.admin.firestore.FieldValue.serverTimestamp();
    const expiresInMs = 3600000; // Default 1h
    const expiresAt = new Date(Date.now() + expiresInMs);

    await config.db.collection(SESSIONS_COLLECTION).doc(userId).set({
        userId,
        token,
        email,
        lastActivity: Date.now(),
        createdAt: serverTimestamp,
        expiresAt: config.admin.firestore.Timestamp.fromDate(expiresAt)
    });
};

/**
 * Get session details by token
 * Uses a query to find the session document by token
 */
const getSession = async (token) => {
    const snapshot = await config.db.collection(SESSIONS_COLLECTION)
        .where('token', '==', token)
        .limit(1)
        .get();

    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
};

/**
 * Update the last activity timestamp
 * Uses a query to find the session document by token
 */
const updateActivity = async (token) => {
    const snapshot = await config.db.collection(SESSIONS_COLLECTION)
        .where('token', '==', token)
        .limit(1)
        .get();

    if (!snapshot.empty) {
        await snapshot.docs[0].ref.update({
            lastActivity: Date.now()
        });
    }
};

/**
 * Delete a specific session by token (Logout)
 */
const deleteSession = async (token) => {
    const snapshot = await config.db.collection(SESSIONS_COLLECTION)
        .where('token', '==', token)
        .get();

    if (snapshot.empty) return;

    const batch = config.db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();
};

/**
 * Delete all sessions for a specific user (Logout All)
 * Robust implementation: deletes by email and also by userId if found.
 */
const deleteAllSessions = async (email) => {
    // 1. Delete all sessions matching the email
    const snapshot = await config.db.collection(SESSIONS_COLLECTION)
        .where('email', '==', email)
        .get();

    const batch = config.db.batch();

    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });

    // 2. Also try to delete by userId just in case (single-session logic)
    const user = await userHelpers.getUserByEmail(email);
    if (user) {
        batch.delete(config.db.collection(SESSIONS_COLLECTION).doc(user.id));
    }

    await batch.commit();
};

const sessionHelpers = {
    createSession,
    getSession,
    updateActivity,
    deleteSession,
    deleteAllSessions
};

export { sessionHelpers };
