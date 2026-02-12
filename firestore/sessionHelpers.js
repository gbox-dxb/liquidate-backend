import { config } from './config.js';

const SESSIONS_COLLECTION = 'sessions';

/**
 * Create a new session in Firestore
 */
const createSession = async (token, email) => {
    await config.db.collection(SESSIONS_COLLECTION).doc(token).set({
        email,
        lastActivity: Date.now(),
        createdAt: new Date()
    });
};

/**
 * Get session details by token
 */
const getSession = async (token) => {
    const doc = await config.db.collection(SESSIONS_COLLECTION).doc(token).get();
    if (!doc.exists) return null;
    return doc.data();
};

/**
 * Update the last activity timestamp
 */
const updateActivity = async (token) => {
    await config.db.collection(SESSIONS_COLLECTION).doc(token).update({
        lastActivity: Date.now()
    });
};

/**
 * Delete a specific session (Logout)
 */
const deleteSession = async (token) => {
    await config.db.collection(SESSIONS_COLLECTION).doc(token).delete();
};

/**
 * Delete all sessions for a specific user (Logout All)
 */
const deleteAllSessions = async (email) => {
    const snapshot = await config.db.collection(SESSIONS_COLLECTION)
        .where('email', '==', email)
        .get();

    if (snapshot.empty) return;

    const batch = config.db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
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
