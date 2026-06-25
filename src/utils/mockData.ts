export interface User {
  id: string;
  name: string;
  role: 'farmer' | 'company' | 'admin';
  avatar: string;
  verified: boolean;
  location: string;
  email: string;
  phone: string;
  language: string;
  // Farmer specific
  farmName?: string;
  farmSize?: string;
  crops?: string[];
  rating?: number;
  reviewsCount?: number;
  qrCode?: string;
  // Company specific
  companyName?: string;
  businessType?: string;
  procurementGoal?: string;
  registrationNumber?: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: 'farmer' | 'company' | 'admin';
  verified: boolean;
  type: 'crop_offer' | 'corporate_requirement' | 'general';
  content: string;
  translatedContent?: { [key: string]: string };
  mediaType?: 'image' | 'video' | 'none';
  mediaUrl?: string;
  language: string;
  location: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  likedBy: string[]; // userIds
  savedBy: string[]; // userIds
  // Farmer Specific Crop fields
  cropDetails?: {
    productName: string;
    category: 'Vegetables' | 'Fruits' | 'Grains' | 'Pulses' | 'Organic' | 'Dairy';
    quantity: string;
    price: string;
    harvestDate: string;
  };
  // Corporate Specific Requirement fields
  requirementDetails?: {
    requirementTitle: string;
    quantityNeeded: string;
    budget: string;
    deadline: string;
  };
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'voice' | 'image' | 'file';
  mediaUrl?: string;
  duration?: string; // for voice notes
  fileName?: string;
  timestamp: string;
  read: boolean;
}

export interface MarketPrice {
  id: string;
  cropName: string;
  category: string;
  pricePerQuintal: number;
  change: number; // percentage
  market: string;
}

export interface WeatherInfo {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: { day: string; temp: number; condition: string }[];
}

export interface GovScheme {
  id: string;
  title: string;
  description: string;
  subsidy: string;
  link: string;
  category: string;
}

// Initial Users
export const initialUsers: User[] = [
  {
    id: 'u1',
    name: 'Rajesh Patel',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    verified: true,
    location: 'Anand, Gujarat',
    email: 'rajesh.patel@farmmail.com',
    phone: '+91 98765 43210',
    language: 'Hindi',
    farmName: 'Patel Organic Farms',
    farmSize: '5 Acres',
    crops: ['Wheat', 'Potatoes', 'Tomatoes'],
    rating: 4.8,
    reviewsCount: 34,
    qrCode: 'FL-FARM-RAJESH-9876'
  },
  {
    id: 'u2',
    name: 'Ananya Rao',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    verified: true,
    location: 'Mysuru, Karnataka',
    email: 'ananya.rao@agri.com',
    phone: '+91 87654 32109',
    language: 'Kannada',
    farmName: 'Green Meadows Farm',
    farmSize: '8 Acres',
    crops: ['Ragi', 'Organic Turmeric', 'Bananas'],
    rating: 4.9,
    reviewsCount: 42,
    qrCode: 'FL-FARM-ANANYA-8765'
  },
  {
    id: 'u3',
    name: 'Muthu Kumar',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    verified: false,
    location: 'Coimbatore, Tamil Nadu',
    email: 'muthu.organic@gmail.com',
    phone: '+91 76543 21098',
    language: 'Tamil',
    farmName: 'Muthu Agri Orchards',
    farmSize: '12 Acres',
    crops: ['Coconut', 'Rice', 'Chillies'],
    rating: 4.2,
    reviewsCount: 15,
    qrCode: 'FL-FARM-MUTHU-7654'
  },
  {
    id: 'u4',
    name: 'ITC Agri Business',
    role: 'company',
    avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150',
    verified: true,
    location: 'Hyderabad, Telangana',
    email: 'procurement@itcagri.com',
    phone: '+91 40 2345 6789',
    language: 'English',
    companyName: 'ITC Limited (Agri Division)',
    businessType: 'Food Processing / FMCG',
    procurementGoal: 'Bulk Grains, Oilseeds & Spices',
    registrationNumber: 'L16005WB1910PLC001985'
  },
  {
    id: 'u5',
    name: 'Reliance Retail',
    role: 'company',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    verified: true,
    location: 'Mumbai, Maharashtra',
    email: 'agrisupply@ril.com',
    phone: '+91 22 4477 8899',
    language: 'English',
    companyName: 'Reliance Retail Ventures',
    businessType: 'Retail Hypermarket Chain',
    procurementGoal: 'Fresh Fruits & Vegetables',
    registrationNumber: 'U51909MH2006PLC166166'
  },
  {
    id: 'admin',
    name: 'FarmerLink Admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    verified: true,
    location: 'New Delhi, Delhi',
    email: 'admin@farmerlink.org',
    phone: '+91 11 2200 4400',
    language: 'English'
  }
];

// Initial Posts
export const initialPosts: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    userName: 'Rajesh Patel',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    userRole: 'farmer',
    verified: true,
    type: 'crop_offer',
    content: 'Harvesting fresh premium quality organic tomatoes. Available in next 3 days. Seeking direct wholesale buyers. Excellent firmness, suitable for food processing or retail chains.',
    translatedContent: {
      'English': 'Harvesting fresh premium quality organic tomatoes. Available in next 3 days. Seeking direct wholesale buyers. Excellent firmness, suitable for food processing or retail chains.',
      'Hindi': 'ताजा प्रीमियम गुणवत्ता वाले जैविक टमाटरों की कटाई। अगले 3 दिनों में उपलब्ध। प्रत्यक्ष थोक खरीदारों की तलाश है। उत्कृष्ट गुणवत्ता, खाद्य प्रसंस्करण या खुदरा श्रृंखलाओं के लिए उपयुक्त।',
      'Tamil': 'புதிய பிரீமியம் தரமான இயற்கை தக்காளி அறுவடை செய்யப்படுகிறது. அடுத்த 3 நாட்களில் கிடைக்கும். மொத்த வியாபாரிகளை நேரடியாக தேடுகிறோம்.'
    },
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600',
    language: 'Hindi',
    location: 'Anand, Gujarat',
    timestamp: '2026-06-23T11:30:00Z',
    likes: 12,
    commentsCount: 3,
    likedBy: ['u4'],
    savedBy: ['u4'],
    cropDetails: {
      productName: 'Organic Tomato',
      category: 'Vegetables',
      quantity: '5 Tons',
      price: '₹22,000 / Ton',
      harvestDate: '2026-06-26'
    }
  },
  {
    id: 'p2',
    userId: 'u4',
    userName: 'ITC Agri Business',
    userAvatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150',
    userRole: 'company',
    verified: true,
    type: 'corporate_requirement',
    content: 'URGENT: Requirement for 100 Tons of Sharbati Wheat for our Aashirvaad Atta processing unit. Moisture level should be under 12%. Ready for spot payment upon verification. Farmers or FPOs please contact.',
    translatedContent: {
      'English': 'URGENT: Requirement for 100 Tons of Sharbati Wheat for our Aashirvaad Atta processing unit. Moisture level should be under 12%. Ready for spot payment upon verification. Farmers or FPOs please contact.',
      'Hindi': 'आपातकालीन: हमारे आशीर्वाद आटा प्रसंस्करण इकाई के लिए 100 टन शरबती गेहूं की आवश्यकता। नमी का स्तर 12% से कम होना चाहिए। सत्यापन के तुरंत बाद भुगतान के लिए तैयार।'
    },
    mediaType: 'none',
    language: 'English',
    location: 'Bhopal, MP Hub',
    timestamp: '2026-06-23T09:15:00Z',
    likes: 24,
    commentsCount: 8,
    likedBy: ['u1', 'u2'],
    savedBy: ['u1'],
    requirementDetails: {
      requirementTitle: 'Sharbati Wheat (100 Tons)',
      quantityNeeded: '100 Tons',
      budget: '₹2,650 / Quintal',
      deadline: '2026-07-05'
    }
  },
  {
    id: 'p3',
    userId: 'u2',
    userName: 'Ananya Rao',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    userRole: 'farmer',
    verified: true,
    type: 'crop_offer',
    content: 'Ready stock of GI-tagged Madugiri Pomegranate. Exceptionally sweet, high juice content, deep red arils. Handgraded. 200 boxes available, 10kg each. Looking for premium fruit exporters.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600',
    language: 'English',
    location: 'Mysuru, Karnataka',
    timestamp: '2026-06-23T08:00:00Z',
    likes: 18,
    commentsCount: 2,
    likedBy: ['u5'],
    savedBy: [],
    cropDetails: {
      productName: 'Madugiri Pomegranate',
      category: 'Fruits',
      quantity: '2 Tons',
      price: '₹140 / Kg',
      harvestDate: 'Ready'
    }
  },
  {
    id: 'p4',
    userId: 'u5',
    userName: 'Reliance Retail',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    userRole: 'company',
    verified: true,
    type: 'corporate_requirement',
    content: 'Contract Farming Opportunity: Looking to sign annual contracts with Potato farmers in Punjab/Gujarat for chip-grade processing potatoes (Atlantic/Jyoti variety). Technical support and seed supply provided by us.',
    mediaType: 'none',
    language: 'English',
    location: 'Ahmedabad, Gujarat',
    timestamp: '2026-06-22T15:30:00Z',
    likes: 42,
    commentsCount: 15,
    likedBy: ['u1'],
    savedBy: ['u1'],
    requirementDetails: {
      requirementTitle: 'Contract Potato Farming (Annual)',
      quantityNeeded: 'Unlimited (Contract-based)',
      budget: 'Fixed: ₹12.5 / Kg',
      deadline: '2026-08-30'
    }
  }
];

// Initial Comments
export const initialComments: Comment[] = [
  {
    id: 'c1',
    postId: 'p1',
    userId: 'u4',
    userName: 'ITC Agri Business',
    userAvatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150',
    content: 'Interested in this batch. Can we discuss shipping logistics and local inspection?',
    timestamp: '2026-06-23T11:45:00Z'
  },
  {
    id: 'c2',
    postId: 'p1',
    userId: 'u1',
    userName: 'Rajesh Patel',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    content: 'Yes, please open a chat thread. I can arrange transportation till our local mandi.',
    timestamp: '2026-06-23T11:50:00Z'
  },
  {
    id: 'c3',
    postId: 'p2',
    userId: 'u1',
    userName: 'Rajesh Patel',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    content: 'I have 15 Tons of high quality Sharbati wheat ready from my farm. Moisture level is 11.2%. Let me contact you.',
    timestamp: '2026-06-23T09:30:00Z'
  }
];

// Initial Chats/Messages
export const initialMessages: ChatMessage[] = [
  {
    id: 'm1',
    senderId: 'u4',
    receiverId: 'u1',
    content: 'Hello Mr. Rajesh, we saw your tomato offer on the feed. Is it still available?',
    type: 'text',
    timestamp: '2026-06-23T11:46:00Z',
    read: true
  },
  {
    id: 'm2',
    senderId: 'u1',
    receiverId: 'u4',
    content: 'Yes, 5 tons of organic tomatoes are ready. Here is a voice note detailing the crop condition.',
    type: 'text',
    timestamp: '2026-06-23T11:48:00Z',
    read: true
  },
  {
    id: 'm3',
    senderId: 'u1',
    receiverId: 'u4',
    content: 'Voice note describing tomato harvesting quality',
    type: 'voice',
    mediaUrl: 'simulated-audio-file.mp3',
    duration: '0:22',
    timestamp: '2026-06-23T11:48:30Z',
    read: true
  },
  {
    id: 'm4',
    senderId: 'u4',
    receiverId: 'u1',
    content: 'Looks excellent. Sending the procurement executive to inspect the lot today.',
    type: 'text',
    timestamp: '2026-06-23T11:52:00Z',
    read: false
  }
];

// Market Prices Mock Data
export const initialMarketPrices: MarketPrice[] = [
  { id: 'mp1', cropName: 'Tomato', category: 'Vegetables', pricePerQuintal: 2400, change: 8.5, market: 'Azadpur Mandi, Delhi' },
  { id: 'mp2', cropName: 'Wheat (Sharbati)', category: 'Grains', pricePerQuintal: 2650, change: -1.2, market: 'Indore Mandi, MP' },
  { id: 'mp3', cropName: 'Pomegranate', category: 'Fruits', pricePerQuintal: 12000, change: 4.3, market: 'Mysuru Mandi, KA' },
  { id: 'mp4', cropName: 'Rice (Basmati)', category: 'Grains', pricePerQuintal: 8500, change: 1.5, market: 'Karnal Mandi, HR' },
  { id: 'mp5', cropName: 'Potato', category: 'Vegetables', pricePerQuintal: 1450, change: -3.8, market: 'Anand Mandi, GJ' },
  { id: 'mp6', cropName: 'Turmeric (Organic)', category: 'Pulses', pricePerQuintal: 9200, change: 12.1, market: 'Erode Mandi, TN' }
];

// Government Schemes Mock Data
export const initialGovSchemes: GovScheme[] = [
  {
    id: 'gs1',
    title: 'PM-KISAN Samman Nidhi',
    description: 'Income support of ₹6,000 per year in three equal installments to all landholder farmer families.',
    subsidy: '100% Central Funding',
    link: 'https://pmkisan.gov.in',
    category: 'Income Support'
  },
  {
    id: 'gs2',
    title: 'PM Fasal Bima Yojana (PMFBY)',
    description: 'Low-cost crop insurance scheme protecting farmers against crop losses from natural calamities.',
    subsidy: 'Premium capped at 2% for Kharif & 1.5% for Rabi',
    link: 'https://pmfby.gov.in',
    category: 'Crop Insurance'
  },
  {
    id: 'gs3',
    title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    description: 'Financial assistance for purchasing advanced farm machinery like tractors, rotavators, and laser levellers.',
    subsidy: '40% to 50% Subsidy depending on category',
    link: 'https://agrimachinery.nic.in',
    category: 'Machinery Subsidy'
  }
];

// Weather Data Mock Generator
export const getWeatherData = (location: string): WeatherInfo => {
  if (location.includes('Gujarat') || location.includes('Anand')) {
    return {
      temp: 34,
      condition: 'Sunny',
      humidity: 48,
      windSpeed: 14,
      forecast: [
        { day: 'Wed', temp: 35, condition: 'Sunny' },
        { day: 'Thu', temp: 34, condition: 'Partly Cloudy' },
        { day: 'Fri', temp: 32, condition: 'Scattered Showers' }
      ]
    };
  }
  if (location.includes('Karnataka') || location.includes('Mysuru')) {
    return {
      temp: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 18,
      forecast: [
        { day: 'Wed', temp: 29, condition: 'Partly Cloudy' },
        { day: 'Thu', temp: 28, condition: 'Cloudy' },
        { day: 'Fri', temp: 27, condition: 'Rain' }
      ]
    };
  }
  return {
    temp: 31,
    condition: 'Clear',
    humidity: 55,
    windSpeed: 12,
    forecast: [
      { day: 'Wed', temp: 32, condition: 'Sunny' },
      { day: 'Thu', temp: 31, condition: 'Clear' },
      { day: 'Fri', temp: 30, condition: 'Partly Cloudy' }
    ]
  };
};
