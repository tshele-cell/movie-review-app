const admin = require('firebase-admin');

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
} catch (error) {
  if (!error.toString().includes('already exists')) {
    console.error('Firebase admin initialization error', error);
  }
}

const db = admin.firestore();
module.exports = { admin, db };
