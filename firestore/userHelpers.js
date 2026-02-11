import { db } from './config.js';

const USERS_COLLECTION = 'users';

/**
 * Create a new user in Firestore
 * @param {Object} userData 
 * @returns {Promise<String>} User ID
 */
const userHelpers = {
    createUser,
    getUserByEmail,
    updateUserPassword
};

export { userHelpers };
