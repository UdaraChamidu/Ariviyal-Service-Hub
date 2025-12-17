import { jsxs } from "react/jsx-runtime";

export type Review = {
  id?: string;
  listingId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: any;
};

export type FirebaseListing = {
  id?: string;
  title: string;
  price: string;
  priceType: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  verified: boolean;
  phone: string;
  description?: string;
};

// Mock functions to satisfy imports
export const addReview = async (review: Review) => {
  console.log("addReview mock called", review);
  return Promise.resolve({ ...review, id: "mock-id" });
};

export const getReviews = async (listingId: string) => {
  console.log("getReviews mock called for", listingId);
  return Promise.resolve([] as Review[]);
};

export const getUserListings = async (userId: string) => {
    return Promise.resolve([] as FirebaseListing[]);
};

export const getUserLikedListings = async (userId: string) => {
    return Promise.resolve([] as FirebaseListing[]);
};

export const getUserReviews = async (userId: string) => {
    return Promise.resolve([] as Review[]);
};

export const getListings = async () => {
    return Promise.resolve([] as FirebaseListing[]);
};

export const addListing = async (listing: any) => {
    console.log("addListing mock called", listing);
    return Promise.resolve({ ...listing, id: "mock-id" });
};

export const toggleListingLike = async (listingId: string, userId: string) => {
    console.log("toggleListingLike mock called", listingId, userId);
    return Promise.resolve();
};

export const storage = {
    // Mock storage object
};
