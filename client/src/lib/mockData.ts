// todo: remove mock functionality - replace with Firebase data

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Listing = {
  id: string;
  title: string;
  price: string;
  priceType: string;
  location: string;
  locationLink?: string;
  distance: string;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  images?: string[];
  verified: boolean;
  phone: string;
  likes?: string[];
  description?: string;
};

export type EmergencyContact = {
  id: string;
  name: string;
  description: string;
  phone: string;
  icon: string;
};

export const categories: Category[] = [
  { id: "boarding", name: "Boarding", icon: "Home" },
  { id: "food", name: "Food", icon: "Utensils" },
  { id: "transport", name: "Transport", icon: "Car" },
  { id: "market", name: "Market", icon: "ShoppingBag" },
  { id: "jobs", name: "Jobs", icon: "Briefcase" },
  { id: "laundry", name: "Laundry", icon: "Shirt" },
  { id: "other", name: "Other", icon: "MoreHorizontal" },
];

export const listings: Listing[] = [
  {
    id: "1",
    title: "Spacious Single Room with Attached Bath",
    price: "Rs. 8,500",
    priceType: "month",
    location: "Wijemanne Road",
    distance: "500m to gate",
    rating: 4.5,
    reviews: 23,
    category: "boarding",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    verified: true,
    phone: "+94 77 123 4567",
  },
  {
    id: "2",
    title: "Homemade Rice & Curry Delivery",
    price: "Rs. 350",
    priceType: "meal",
    location: "University Canteen Area",
    distance: "100m to gate",
    rating: 4.8,
    reviews: 156,
    category: "food",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    verified: true,
    phone: "+94 71 234 5678",
  },
  {
    id: "3",
    title: "Tuk-Tuk Service to Town",
    price: "Rs. 200",
    priceType: "trip",
    location: "Main Gate",
    distance: "At gate",
    rating: 4.2,
    reviews: 89,
    category: "transport",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
    verified: false,
    phone: "+94 76 345 6789",
  },
  {
    id: "4",
    title: "Engineering Textbooks Bundle",
    price: "Rs. 4,500",
    priceType: "once",
    location: "Engineering Faculty",
    distance: "200m to gate",
    rating: 4.6,
    reviews: 12,
    category: "market",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop",
    verified: true,
    phone: "+94 70 456 7890",
  },
  {
    id: "5",
    title: "Part-Time Tutor Needed",
    price: "Rs. 1,500",
    priceType: "hour",
    location: "Online/Campus",
    distance: "Flexible",
    rating: 0,
    reviews: 0,
    category: "jobs",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    verified: true,
    phone: "+94 78 567 8901",
  },
  {
    id: "6",
    title: "Express Laundry Service",
    price: "Rs. 500",
    priceType: "load",
    location: "Stanley Road",
    distance: "300m to gate",
    rating: 4.4,
    reviews: 67,
    category: "laundry",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=300&fit=crop",
    verified: true,
    phone: "+94 75 678 9012",
  },
];

export const emergencyContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "University Medical Center",
    description: "24/7 Emergency Medical Services",
    phone: "011-2345678",
    icon: "Hospital",
  },
  {
    id: "2",
    name: "Campus Security",
    description: "Security & Safety Issues",
    phone: "011-3456789",
    icon: "Shield",
  },
  {
    id: "3",
    name: "Police Emergency",
    description: "Law Enforcement",
    phone: "119",
    icon: "Siren",
  },
];

export const chatResponses: Record<string, string> = {
  default: "Hi! I'm your UniHub assistant. I can help you find boarding, food, transport, and more. What are you looking for today?",
  rice: "I found several rice and curry options near campus! Check out 'Homemade Rice & Curry Delivery' - they offer meals starting at Rs. 350 with great reviews.",
  boarding: "Looking for accommodation? There are verified boarding places near campus starting from Rs. 8,500/month. Would you like me to show you the listings?",
  transport: "Need a ride? Tuk-tuk services are available at the main gate. Typical fares start at Rs. 200 to town.",
  laundry: "Express Laundry Service on Stanley Road offers washing at Rs. 500 per load with same-day delivery!",
};
