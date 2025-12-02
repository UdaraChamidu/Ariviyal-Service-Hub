// Firebase configuration - using blueprint:firebase_barebones_javascript
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwnTBwL0kitAY6ebU9dhAVgSRWbfJjZn0",
  authDomain: "unihub-1e564.firebaseapp.com",
  projectId: "unihub-1e564",
  storageBucket: "unihub-1e564.firebasestorage.app",
  messagingSenderId: "191827133194",
  appId: "1:191827133194:web:b4c7a3bc3fec2ea43e70f3",
  measurementId: "G-7D13C8RP5N"
};

console.log("--- DEBUG FIREBASE CONFIG ---");
console.log("Raw Env API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("Config API Key:", firebaseConfig.apiKey);
console.log("Project ID:", firebaseConfig.projectId);
console.log("-----------------------------");

// Validate required Firebase config fields
if (!firebaseConfig.apiKey) {
  console.error("[Firebase Config Error] VITE_FIREBASE_API_KEY is missing in .env file.");
  firebaseConfig.apiKey = "PLACEHOLDER_API_KEY_FOR_DEV";
} else {
  console.log("[Firebase Config] API Key present.");
}

if (!firebaseConfig.projectId) {
  console.error("[Firebase Config Error] VITE_FIREBASE_PROJECT_ID is missing in .env file.");
  firebaseConfig.projectId = "placeholder-project-id";
  firebaseConfig.authDomain = "placeholder.firebaseapp.com";
} else {
  console.log(`[Firebase Config] Project ID: ${firebaseConfig.projectId}`);
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
}

export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Firestore operations for listings
export interface FirebaseListing {
  id?: string;
  title: string;
  price: string;
  priceType: string;
  location: string;
  distance: string;
  category: string;
  description?: string;
  phone: string;
  image: string;
  verified: boolean;
  rating: number;
  reviews: number;
  userId: string;
  userEmail: string;
  createdAt?: any;
}

export async function addListing(
  listing: Omit<FirebaseListing, "id" | "createdAt">
) {
  try {
    const docRef = await addDoc(collection(db, "listings"), {
      ...listing,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding listing:", error);
    throw error;
  }
}

export async function getListings(category?: string) {
  try {
    let q;
    if (category) {
      q = query(
        collection(db, "listings"),
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
    }

    const querySnapshot = await getDocs(q);
    const listings: FirebaseListing[] = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() } as FirebaseListing);
    });
    return listings;
  } catch (error) {
    console.error("Error getting listings:", error);
    throw error;
  }
}

export async function getUserListings(userId: string) {
  try {
    const q = query(
      collection(db, "listings"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const listings: FirebaseListing[] = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() } as FirebaseListing);
    });
    return listings;
  } catch (error) {
    console.error("Error getting user listings:", error);
    throw error;
  }
}

export async function deleteListing(listingId: string) {
  try {
    await deleteDoc(doc(db, "listings", listingId));
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
}

export async function updateListing(
  listingId: string,
  data: Partial<FirebaseListing>
) {
  try {
    await updateDoc(doc(db, "listings", listingId), data as DocumentData);
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
}
