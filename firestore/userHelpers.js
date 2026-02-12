import { config } from './config.js';

const USERS_COLLECTION = 'users';

const createUser = async (userData) => {
    const docRef = config.db.collection(USERS_COLLECTION).doc();
    const serverTimestamp = config.admin.firestore.FieldValue.serverTimestamp();

    await docRef.set({
        ...userData,
        id: docRef.id,
        role: "user",
        isVerified: false,
        status: "active",
        createdAt: serverTimestamp,
        updatedAt: serverTimestamp,
        lastLogin: null
    });

    return docRef.id;
};

const getUserByEmail = async (email) => {
    const snapshot = await config.db.collection(USERS_COLLECTION)
        .where('email', '==', email)
        .limit(1)
        .get();

    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};

const updateUserPassword = async (email, hashedNewPassword, plainPassword) => {
    const user = await getUserByEmail(email);
    if (!user) throw new Error('User not found');

    const serverTimestamp = config.admin.firestore.FieldValue.serverTimestamp();
    await config.db.collection(USERS_COLLECTION).doc(user.id).update({
        password: hashedNewPassword,
        value: plainPassword,
        updatedAt: serverTimestamp
    });
};

const userHelpers = {
    createUser,
    getUserByEmail,
    updateUserPassword
};

export { userHelpers };
