import dotenv from 'dotenv';
import fs from 'fs';

const envConfig = dotenv.parse(fs.readFileSync('.env'));

console.log('--- ENV DEBUG ---');
console.log('API_KEY_LENGTH:', envConfig.VITE_FIREBASE_API_KEY ? envConfig.VITE_FIREBASE_API_KEY.length : 'MISSING');
console.log('API_KEY_VALUE:', envConfig.VITE_FIREBASE_API_KEY);
console.log('PROJECT_ID:', envConfig.VITE_FIREBASE_PROJECT_ID);
console.log('STORAGE_BUCKET:', envConfig.VITE_FIREBASE_STORAGE_BUCKET);
console.log('-----------------');
