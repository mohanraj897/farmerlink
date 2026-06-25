'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Post, Comment, ChatMessage, MarketPrice, GovScheme,
  initialUsers, initialPosts, initialComments, initialMessages, initialMarketPrices, initialGovSchemes
} from '../utils/mockData';
import { Language } from '../utils/translation';

interface AppContextProps {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  comments: Comment[];
  messages: ChatMessage[];
  marketPrices: MarketPrice[];
  govSchemes: GovScheme[];
  currentLanguage: Language;
  notifications: Array<{ id: string; title: string; body: string; timestamp: string; read: boolean }>;
  searchQuery: string;
  filters: {
    category: string;
    location: string;
    verifiedOnly: boolean;
    priceMin: number;
    priceMax: number;
    userRole: string;
  };
  aiChatHistory: Array<{ role: 'user' | 'assistant'; text: string }>;
  aiMatchSuggestions: Array<{ farmer: User; company: User; crop: string; matchScore: number; reason: string }>;
  
  // Actions
  login: (emailOrPhone: string, role: 'farmer' | 'company' | 'admin') => boolean;
  logout: () => void;
  registerUser: (userData: Partial<User>) => void;
  setCurrentLanguage: (lang: Language) => void;
  setSearchQuery: (query: string) => void;
  setFilter: (key: string, value: any) => void;
  resetFilters: () => void;
  
  // Post Actions
  createPost: (postData: Partial<Post>) => void;
  likePost: (postId: string) => void;
  savePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  deletePost: (postId: string) => void;
  
  // Message Actions
  sendChatMessage: (receiverId: string, content: string, type?: 'text' | 'voice' | 'image' | 'file', mediaUrl?: string, fileName?: string, duration?: string) => void;
  markChatAsRead: (otherUserId: string) => void;
  
  // Admin Actions
  verifyUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  
  // AI Actions
  askAIChatbot: (message: string) => void;
  runAIMatching: () => void;
  
  // Simulated socket receipt trigger
  triggerSimulatedIncomingMessage: (senderId: string, text: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>(initialMarketPrices);
  const [govSchemes] = useState<GovScheme[]>(initialGovSchemes);
  const [currentLanguage, setCurrentLanguageState] = useState<Language>('English');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; body: string; timestamp: string; read: boolean }>>([
    {
      id: 'n1',
      title: 'Welcome to FarmerLink!',
      body: 'Get started by completing your profile details to connect with companies.',
      timestamp: '2026-06-23T10:00:00Z',
      read: false
    }
  ]);

  const [filters, setFilters] = useState({
    category: 'All',
    location: '',
    verifiedOnly: false,
    priceMin: 0,
    priceMax: 50000,
    userRole: 'All'
  });

  const [aiChatHistory, setAiChatHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Namaste! I am your FarmerLink AI Assistant. I can help you find suitable crop recommendations, analyze market prices, translate posts, or match farmers with buyers. How can I help you today?' }
  ]);

  const [aiMatchSuggestions, setAiMatchSuggestions] = useState<Array<{ farmer: User; company: User; crop: string; matchScore: number; reason: string }>>([]);

  const login = (emailOrPhone: string, role: 'farmer' | 'company' | 'admin'): boolean => {
    const normalized = emailOrPhone.trim().toLowerCase();
    const found = users.find(u => 
      (u.email.toLowerCase() === normalized || 
       u.phone.replace(/\s+/g, '') === normalized.replace(/\s+/g, '') ||
       u.id.toLowerCase() === normalized) && 
      u.role === role
    );
    
    if (found) {
      setCurrentUser(found);
      setCurrentLanguageState(found.language as Language);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: `u_${Date.now()}`,
      name: userData.name || 'Anonymous User',
      role: userData.role || 'farmer',
      avatar: userData.avatar || `https://images.unsplash.com/photo-${userData.role === 'farmer' ? '1507003211169-0a1dd7228f2d' : '1486406146926-c627a92ad1ab'}?w=150`,
      verified: false,
      location: userData.location || 'Not Specified',
      email: userData.email || '',
      phone: userData.phone || '',
      language: userData.language || 'English',
      farmName: userData.farmName,
      farmSize: userData.farmSize,
      crops: userData.crops || [],
      rating: 5.0,
      reviewsCount: 0,
      qrCode: userData.role === 'farmer' ? `FL-FARM-${(userData.name || 'USER').toUpperCase().slice(0, 5)}-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      companyName: userData.companyName,
      businessType: userData.businessType,
      procurementGoal: userData.procurementGoal,
      registrationNumber: userData.registrationNumber
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    if (userData.language) {
      setCurrentLanguageState(userData.language as Language);
    }
  };

  const setCurrentLanguage = (lang: Language) => {
    setCurrentLanguageState(lang);
    if (currentUser) {
      setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, language: lang } : u));
      setCurrentUser(prev => prev ? { ...prev, language: lang } : null);
    }
  };

  const setFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      location: '',
      verifiedOnly: false,
      priceMin: 0,
      priceMax: 50000,
      userRole: 'All'
    });
  };

  // Post Actions
  const createPost = (postData: Partial<Post>) => {
    if (!currentUser) return;
    const newPost: Post = {
      id: `p_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userRole: currentUser.role,
      verified: currentUser.verified,
      type: postData.type || 'general',
      content: postData.content || '',
      mediaType: postData.mediaType || 'none',
      mediaUrl: postData.mediaUrl,
      language: currentLanguage,
      location: currentUser.location,
      timestamp: new Date().toISOString(),
      likes: 0,
      commentsCount: 0,
      likedBy: [],
      savedBy: [],
      cropDetails: postData.cropDetails,
      requirementDetails: postData.requirementDetails
    };

    setPosts(prev => [newPost, ...prev]);

    // Send mock notification to other user type
    if (currentUser.role === 'farmer') {
      // Notify corporate companies
      setNotifications(prev => [
        {
          id: `n_${Date.now()}`,
          title: 'New Crop Available!',
          body: `${currentUser.name} posted availability for ${postData.cropDetails?.productName || 'crops'} in ${currentUser.location}.`,
          timestamp: new Date().toISOString(),
          read: false
        },
        ...prev
      ]);
    } else if (currentUser.role === 'company') {
      // Notify farmers
      setNotifications(prev => [
        {
          id: `n_${Date.now()}`,
          title: 'New Sourcing Sourcing Requirement!',
          body: `${currentUser.name} posted requirement for ${postData.requirementDetails?.requirementTitle || 'crop supply'}.`,
          timestamp: new Date().toISOString(),
          read: false
        },
        ...prev
      ]);
    }
  };

  const likePost = (postId: string) => {
    if (!currentUser) return;
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes(currentUser.id);
        const likedBy = isLiked 
          ? post.likedBy.filter(id => id !== currentUser.id)
          : [...post.likedBy, currentUser.id];
        return {
          ...post,
          likes: likedBy.length,
          likedBy
        };
      }
      return post;
    }));
  };

  const savePost = (postId: string) => {
    if (!currentUser) return;
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isSaved = post.savedBy.includes(currentUser.id);
        const savedBy = isSaved
          ? post.savedBy.filter(id => id !== currentUser.id)
          : [...post.savedBy, currentUser.id];
        return { ...post, savedBy };
      }
      return post;
    }));
  };

  const addComment = (postId: string, text: string) => {
    if (!currentUser) return;
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      postId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: text,
      timestamp: new Date().toISOString()
    };

    setComments(prev => [...prev, newComment]);
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, commentsCount: post.commentsCount + 1 };
      }
      return post;
    }));
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  // Message Actions
  const sendChatMessage = (
    receiverId: string,
    content: string,
    type: 'text' | 'voice' | 'image' | 'file' = 'text',
    mediaUrl?: string,
    fileName?: string,
    duration?: string
  ) => {
    if (!currentUser) return;
    const newMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      content,
      type,
      mediaUrl,
      fileName,
      duration,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate reply from receiver (Mock Socket.io response) after 2 seconds
    setTimeout(() => {
      const responder = users.find(u => u.id === receiverId);
      if (responder && responder.role !== 'admin') {
        const replyText = getSimulatedAutoReply(responder, content, type);
        triggerSimulatedIncomingMessage(receiverId, replyText);
      }
    }, 2500);
  };

  const triggerSimulatedIncomingMessage = (senderId: string, text: string) => {
    const sender = users.find(u => u.id === senderId);
    if (!sender) return;

    const newMessage: ChatMessage = {
      id: `m_in_${Date.now()}`,
      senderId,
      receiverId: currentUser?.id || 'u1',
      content: text,
      type: 'text',
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
    setNotifications(prev => [
      {
        id: `n_msg_${Date.now()}`,
        title: `Message from ${sender.name}`,
        body: text.length > 50 ? `${text.slice(0, 47)}...` : text,
        timestamp: new Date().toISOString(),
        read: false
      },
      ...prev
    ]);
  };

  const markChatAsRead = (otherUserId: string) => {
    if (!currentUser) return;
    setMessages(prev => prev.map(msg => {
      if (msg.senderId === otherUserId && msg.receiverId === currentUser.id) {
        return { ...msg, read: true };
      }
      return msg;
    }));
  };

  // Helper simulated auto-replies
  const getSimulatedAutoReply = (responder: User, incomingText: string, incomingType: string): string => {
    if (incomingType === 'voice') {
      return `Thank you for the voice note. I am currently reviewing the details you sent. Let me get back to you shortly!`;
    }
    const lower = incomingText.toLowerCase();
    if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
      return `Our pricing is competitive. Let us check the quality grade and discuss bulk logistics. What is the nearest delivery port or mandi for you?`;
    }
    if (lower.includes('available') || lower.includes('stock') || lower.includes('quantity')) {
      return `We have active logistics capacity to procure. Could you please share the moisture levels or grades, and whether you possess a Farmer Certificate?`;
    }
    return `Hello! Thanks for reaching out. Yes, we saw your profile details and are very interested. Let's discuss details and close a contract.`;
  };

  // Admin Actions
  const verifyUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, verified: true } : u));
    setPosts(prev => prev.map(p => p.userId === userId ? { ...p, verified: true } : p));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, verified: true } : null);
    }
    setNotifications(prev => [
      {
        id: `n_ver_${Date.now()}`,
        title: 'Account Verified!',
        body: `Congratulations, user account ${userId} has been officially verified by FarmerLink Admin. Golden badge added.`,
        timestamp: new Date().toISOString(),
        read: false
      },
      ...prev
    ]);
  };

  const rejectUser = (userId: string) => {
    // Flag or reset verification request
    setNotifications(prev => [
      {
        id: `n_rej_${Date.now()}`,
        title: 'Verification Request Rejected',
        body: `FarmerLink Admin rejected the verification request for user ${userId} due to incomplete documentation.`,
        timestamp: new Date().toISOString(),
        read: false
      },
      ...prev
    ]);
  };

  // AI Chatbot Assistant Simulation
  const askAIChatbot = (text: string) => {
    const userMsg = { role: 'user' as const, text };
    setAiChatHistory(prev => [...prev, userMsg]);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "I can analyze crop prices, suggest optimal crops, or translate text. Can you write a more specific question?";

      if (lower.includes('recommend') || lower.includes('plant') || lower.includes('suggest crop')) {
        reply = "Based on current market trends and seasonal analysis: For the current Monsoon season in Gujarat, planting Tomatoes or short-duration Grains is highly recommended. Grains are fetching 12% higher prices than last month in nearby Indore mandis. Organic Turmeric is also showing strong demand from corporate buyers like ITC Agri.";
      } else if (lower.includes('price') || lower.includes('mandi') || lower.includes('rate')) {
        reply = "Let's check the tracker: Tomatoes are trading at ₹2,400/Quintal (+8.5% rise), Basmati Rice is stable at ₹8,500/Quintal, and Turmeric is at ₹9,200/Quintal (+12.1% surge!). I recommend listing your products now to lock in these high rates.";
      } else if (lower.includes('scheme') || lower.includes('subsidy') || lower.includes('government')) {
        reply = "Under PM-KISAN, you can get ₹6,000/year support. If you're looking to purchase machinery, the Sub-Mission on Agricultural Mechanization (SMAM) offers up to 50% subsidy. I can share the direct links from the 'Government Schemes' section!";
      } else if (lower.includes('match') || lower.includes('buyer') || lower.includes('sell')) {
        reply = "I've matched Rajesh Patel (Tomato crop ready) with Reliance Retail (seeking Tomato sourcing). Opening a matchmaking lead report in the Business Dashboard!";
        runAIMatching();
      }

      setAiChatHistory(prev => [...prev, { role: 'assistant' as const, text: reply }]);
    }, 1000);
  };

  // AI Matching algorithm simulation between Farmers and Companies
  const runAIMatching = () => {
    const suggestions = [
      {
        farmer: users.find(u => u.id === 'u1')!,
        company: users.find(u => u.id === 'u5')!,
        crop: 'Organic Tomatoes',
        matchScore: 98,
        reason: 'Rajesh has 5 Tons of Organic Tomatoes ready, matching Reliance Retail\'s active sourcing requirements in the Gujarat-mandi region.'
      },
      {
        farmer: users.find(u => u.id === 'u1')!,
        company: users.find(u => u.id === 'u4')!,
        crop: 'Wheat (Sharbati)',
        matchScore: 92,
        reason: 'Wheat batch matches ITC Agri\'s Aashirvaad Atta processing moisture standards (< 12%) and direct procurement pricing.'
      },
      {
        farmer: users.find(u => u.id === 'u2')!,
        company: users.find(u => u.id === 'u5')!,
        crop: 'Madugiri Pomegranate',
        matchScore: 89,
        reason: 'Premium organic fruits matches Reliance Retail fresh tier-1 supply request for metropolitan retail stores.'
      }
    ].filter(s => s.farmer && s.company);

    setAiMatchSuggestions(suggestions);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      posts,
      comments,
      messages,
      marketPrices,
      govSchemes,
      currentLanguage,
      notifications,
      searchQuery,
      filters,
      aiChatHistory,
      aiMatchSuggestions,
      login,
      logout,
      registerUser,
      setCurrentLanguage,
      setSearchQuery,
      setFilter,
      resetFilters,
      createPost,
      likePost,
      savePost,
      addComment,
      deletePost,
      sendChatMessage,
      markChatAsRead,
      verifyUser,
      rejectUser,
      askAIChatbot,
      runAIMatching,
      triggerSimulatedIncomingMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
