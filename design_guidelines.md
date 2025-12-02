# UniHub Design Guidelines

## Design Philosophy
**Mobile-First, Trust-Focused Platform** - Clean, modern Progressive Web App design that emphasizes trustworthiness and student-centric usability.

## Color Palette
- **Primary Blue**: #2563EB (trust and education)
- **Indigo Accent**: #4F46E5 (depth and engagement)
- **Background**: #F9FAFB (light gray for contrast)
- **Success/Verified**: Green tones for verified badges and positive actions

## Typography
- **Font Family**: Inter or Roboto (sans-serif)
- **Hierarchy**: Clear distinction between headlines, body text, and metadata
- **Touch Targets**: Ensure all interactive elements are thumb-friendly on mobile

## Layout System
- **Spacing**: Tailwind's default spacing scale (2, 4, 8 units for consistency)
- **Responsive Grid**: 1 column mobile, 3 columns desktop for listing feed
- **Container**: Max-width constraints for readable content on large screens

## Navigation Bar
- Sticky positioned at top
- Logo: "UniHub" with graduation cap or location icon
- Desktop: Browse, Map View, Community, Emergency links
- **Prominent CTA**: "Post Ad" button in primary blue
- Mobile: Hamburger menu pattern

## Hero Section
- **Headline**: "Everything a Student Needs, In One Place."
- **Sub-headline**: "Find boarding, food delivery, tuk-tuks, and sold textbooks nearby."
- **Search Bar**: Large, central input with search icon
- Background: Clean, subtle treatment (avoid heavy imagery)

## Category System
- **Horizontal Scroll** on mobile
- Categories: Boarding (Home), Food (Utensils), Transport (Car), Market (Shopping Bag), Jobs (Briefcase), Laundry (Shirt)
- Use Lucide React icons throughout

## Listing Cards
- **Image**: Top-positioned with reliable placeholders (Unsplash)
- **Verified Badge**: Green checkmark for verified students/landlords
- **Content**: Title, Price (Rs. 8,500/month format), Location (with distance to gate), Star rating with review count
- **Action**: "Contact" button opening modal or phone reveal
- **Layout**: Responsive grid with consistent card heights

## Interactive Features
- **View Toggle**: Switch between List View and Map View
- **Map View**: Placeholder interactive map UI with location pins
- **Floating AI Chatbot**: FAB (Floating Action Button) bottom-right, opens chat interface for student queries

## Post Ad Flow (Auth Gate)
- **Unauthenticated**: Beautiful login modal with "Sign in with Google" and "Student Email Verification"
- **Authenticated**: Form with Title, Category, Price, Image Upload fields
- Firebase Authentication integration

## Emergency Page
- Dedicated section with large, clear buttons for:
  - University Medical Center
  - Campus Security
  - Police
- "Tap to Call" functionality with phone icons

## Animations & Interactions
- Use Framer Motion for smooth transitions
- Modal open/close animations
- Subtle hover effects on cards
- Touch feedback on mobile interactions

## Component Architecture
- Modular structure: Navbar, ListingCard, CategoryFilter, ChatBot components
- Reusable patterns across the platform
- Icon system via Lucide React exclusively

## Images
- **Hero Section**: Clean, minimal background treatment (no large hero image needed)
- **Listing Cards**: Each card requires a service/item image from Unsplash placeholders
- **Category Icons**: Lucide React icons only
- **Emergency Page**: Icon-driven with clear visual hierarchy