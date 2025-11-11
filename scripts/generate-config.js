#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
require('dotenv').config();

if (!fs.existsSync('.env')) {
  console.error('❌ .env não encontrado!');
  process.exit(1);
}

const configTemplate = `
const firebaseConfig = {
  apiKey: "${process.env.FIREBASE_API_KEY}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
  projectId: "${process.env.FIREBASE_PROJECT_ID}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${process.env.FIREBASE_APP_ID}",
  measurementId: "${process.env.FIREBASE_MEASUREMENT_ID}"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db, firebaseConfig };
`;

const outputPath = path.join(__dirname, '..', 'public', 'js', 'firebase-config.js');
fs.writeFileSync(outputPath, configTemplate, 'utf8');
console.log('✅ firebase-config.js gerado!');
