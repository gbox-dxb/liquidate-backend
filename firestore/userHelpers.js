import { db } from './config.js';

const USERS_COLLECTION = 'users';

/**
 * Create a new user in Firestore
 * @param {Object} userData 
 * @returns {Promise<String>} User ID
 */
export const createUser = async (userData) => {
    const { email, ...rest } = userData;
    const userRef = db.collection(USERS_COLLECTION).doc(email);
    await userRef.set({
        email,
        ...rest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    return email;
};

/**
 * Fetch a user by email
 * @param {String} email 
 * @returns {Promise<Object|null>}
 */
export const getUserByEmail = async (email) => {
    const userDoc = await db.collection(USERS_COLLECTION).doc(email).get();
    if (!userDoc.exists) {
        return null;
    }
    return userDoc.data();
};

/**
 * Update user password
 * @param {String} email 
 * @param {String} hashedNewPassword 
 */
export const updateUserPassword = async (email, hashedNewPassword) => {
    const userRef = db.collection(USERS_COLLECTION).doc(email);
    await userRef.update({
        password: hashedNewPassword,
        updatedAt: new Date().toISOString()
    });
};
