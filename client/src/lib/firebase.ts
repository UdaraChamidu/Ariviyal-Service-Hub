// Firebase configuration - using blueprint:firebase_barebones_javascript
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
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
  arrayUnion,
  arrayRemove,
  increment,
  runTransaction,
  getDoc,
  type DocumentData,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
export const storage = getStorage(app);

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
  locationLink?: string;
  distance: string;
  category: string;
  description?: string;
  phone: string;
  image: string;
  images?: string[];
  verified: boolean;
  rating: number;
  reviews: number;
  userId: string;
  userEmail: string;
  likes?: string[];
  createdAt?: any;
}

export interface Review {
  id?: string;
  listingId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: any;
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

export async function toggleListingLike(listingId: string, userId: string) {
  try {
    const listingRef = doc(db, "listings", listingId);
    const listingSnap = await getDoc(listingRef);

    if (listingSnap.exists()) {
      const listingData = listingSnap.data() as FirebaseListing;
      const likes = listingData.likes || [];
      const isLiked = likes.includes(userId);

      if (isLiked) {
        await updateDoc(listingRef, {
          likes: arrayRemove(userId)
        });
      } else {
        await updateDoc(listingRef, {
          likes: arrayUnion(userId)
        });
      }
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
}

export async function addReview(review: Omit<Review, "id" | "createdAt">) {
  try {
    await runTransaction(db, async (transaction) => {
      // 1. Create the review document
      const newReviewRef = doc(collection(db, "reviews"));
      transaction.set(newReviewRef, {
        ...review,
        createdAt: serverTimestamp(),
      });

      // 2. Update the listing's rating and review count
      const listingRef = doc(db, "listings", review.listingId);
      const listingSnap = await transaction.get(listingRef);

      if (!listingSnap.exists()) {
        throw new Error("Listing does not exist!");
      }

      const listingData = listingSnap.data() as FirebaseListing;
      const currentReviews = listingData.reviews || 0;
      const currentRating = listingData.rating || 0;

      const newReviewCount = currentReviews + 1;
      const newRating = ((currentRating * currentReviews) + review.rating) / newReviewCount;

      transaction.update(listingRef, {
        reviews: newReviewCount,
        rating: newRating,
      });
    });
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}

export async function getReviews(listingId: string) {
  try {
    const q = query(
      collection(db, "reviews"),
      where("listingId", "==", listingId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
    });
    return reviews;
  } catch (error) {
    console.error("Error getting reviews:", error);
    return [];
  }
}
