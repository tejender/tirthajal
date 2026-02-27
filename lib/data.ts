// lib/data.ts - Complete data file for Tirthan Valley Cottage

export interface Room {
  id: string
  name: string
  tagline: string
  price: number
  capacity: number
  beds: string
  bathrooms: number
  size: string
  images: string[]
  amenities: { icon: string; name: string }[]
  description: string
  features: string[]
}

export interface Experience {
  title: string
  description: string
  duration: string
  price: number
  image: string
}

export const roomsData: Room[] = [
  {
    id: 'deodar-suite',
    name: 'The Deodar Suite',
    tagline: 'Attic sanctuary with panoramic peaks',
    price: 4500,
    capacity: 2,
    beds: '1 King Bed',
    bathrooms: 1,
    size: '450 sq ft',
    images: [
      '/images/rooms/home-card/1.jpeg',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: [
      { icon: 'wifi', name: 'High-speed WiFi' },
      { icon: 'mountain', name: 'Mountain View' },
      { icon: 'coffee', name: 'Premium Coffee' },
      { icon: 'bath', name: 'Rain Shower' },
      { icon: 'flame', name: 'Wood Stove' },
      { icon: 'thermometer', name: 'Heating' },
      { icon: 'tv', name: 'Smart TV' },
      { icon: 'utensils', name: 'Mini Kitchen' },
      { icon: 'car', name: 'Free Parking' },
      { icon: 'wind', name: 'Air Purifier' }
    ],
    description: 'Perched under the traditional sloping roof, the Deodar Suite offers spectacular views of the snow-capped Great Himalayan Range. Exposed deodar beams create a cathedral-like atmosphere.',
    features: ['Private balcony', 'Attic loft', 'Traditional woodwork', 'Blackout curtains', 'Luxury linens']
  },
  {
    id: 'river-room',
    name: 'The River Room',
    tagline: 'Ground floor haven with garden access',
    price: 3800,
    capacity: 2,
    beds: '1 Queen Bed',
    bathrooms: 1,
    size: '380 sq ft',
    images: [
      '/images/rooms/home-card/r-2.jpeg',
      'https://images.unsplash.com/photo-1616594039964-40891a909d99?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: [
      { icon: 'wifi', name: 'High-speed WiFi' },
      { icon: 'waves', name: 'River View' },
      { icon: 'coffee', name: 'Tea Station' },
      { icon: 'bath', name: 'Modern Bathroom' },
      { icon: 'door', name: 'Garden Access' },
      { icon: 'armchair', name: 'Reading Nook' },
      { icon: 'tv', name: 'Smart TV' },
      { icon: 'snowflake', name: 'AC & Heating' },
      { icon: 'car', name: 'Free Parking' },
      { icon: 'concierge', name: 'Room Service' }
    ],
    description: 'The River Room sits at garden level with French doors opening onto a private patio meters from the Tirthan River. Traditional mud plaster walls regulate temperature naturally.',
    features: ['Direct river access', 'Private patio', 'Mud plaster walls', 'Outdoor seating', 'Bird watching']
  },
  {
    id: 'forest-cabin',
    name: 'The Forest Cabin',
    tagline: 'Standalone cottage for families',
    price: 6200,
    capacity: 4,
    beds: '2 Queen Beds',
    bathrooms: 2,
    size: '720 sq ft',
    images: [
      '/images/rooms/home-card/r-3.jpeg',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616594039964-40891a909d99?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop'
    ],
    amenities: [
      { icon: 'wifi', name: 'High-speed WiFi' },
      { icon: 'tree', name: 'Forest View' },
      { icon: 'flame', name: 'Fireplace' },
      { icon: 'bath', name: '2 Bathrooms' },
      { icon: 'chef', name: 'Full Kitchen' },
      { icon: 'sofa', name: 'Living Room' },
      { icon: 'tv', name: '2 Smart TVs' },
      { icon: 'washer', name: 'Washer/Dryer' },
      { icon: 'car', name: 'Private Parking' },
      { icon: 'utensils', name: 'BBQ Grill' },
      { icon: 'gamepad', name: 'Board Games' },
      { icon: 'baby', name: 'Baby Friendly' }
    ],
    description: 'A complete private cottage surrounded by ancient deodar trees. Features two bedrooms, living area with traditional bukhari stove, and fully equipped kitchen.',
    features: ['Private entrance', 'Full kitchen', 'Fireplace', 'Outdoor dining', 'Kids area', 'Pet friendly']
  }
]

export const experiencesData: Experience[] = [
  {
    title: 'Trout Fishing',
    description: 'Learn fly-fishing in crystal-clear Tirthan River waters.',
    duration: '4 hours',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1516967124798-10656f7dca28?q=80&w=1974&auto=format&fit=crop'
  },
  {
    title: 'Valley Treks',
    description: 'Guided hikes through Great Himalayan National Park.',
    duration: 'Full day',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Local Cooking Class',
    description: 'Learn traditional Himachali dishes with our chef.',
    duration: '3 hours',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Stargazing Night',
    description: 'Telescope session with hot cocoa and stories.',
    duration: '2 hours',
    price: 800,
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2013&auto=format&fit=crop'
  }
]

// ✅ ADD THIS - Gallery images for the gallery page
export const galleryImages = [
  // Mountains & Landscapes
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop',
  
  // Cottage & Interiors
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616594039964-40891a909d99?q=80&w=2070&auto=format&fit=crop',
  
  // Nature & Forest
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=2574&auto=format&fit=crop',
  
  // River & Water
  'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?q=80&w=2070&auto=format&fit=crop',
  
  // Activities & Experiences
  'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
  
  // Food & Dining
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop'
]