'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Video, Send, Mic, Paperclip, Check, CheckCheck, 
  Smile, Search, ArrowLeft, Image as ImageIcon, FileText, 
  Award, ShieldCheck, PhoneCall, Volume2, X, Plus, MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User, ChatMessage } from '../../utils/mockData';
import ClientOnly from '../../components/ClientOnly';

interface ChatWindowProps {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUserId, setSelectedUserId }) => {
  const { currentUser, users, messages, sendChatMessage, markChatAsRead } = useApp();
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [callingState, setCallingState] = useState<'idle' | 'calling_voice' | 'calling_video' | 'connected'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  if (!currentUser) return null;

  // Filter users to chat with (excluding admin if logged in, or others)
  const chatPartners = users.filter(u => u.id !== currentUser.id && u.role !== 'admin');

  // Find active chat partner
  useEffect(() => {
    if (selectedUserId) {
      const partner = users.find(u => u.id === selectedUserId);
      if (partner) {
        setActiveUser(partner);
        markChatAsRead(selectedUserId);
      }
    } else {
      setActiveUser(null);
    }
  }, [selectedUserId, users]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeUser]);

  // Handle incoming message auto-reads
  useEffect(() => {
    if (activeUser) {
      markChatAsRead(activeUser.id);
    }
  }, [messages.length, activeUser]);

  // Handle calling duration timers
  useEffect(() => {
    if (callingState === 'connected') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
      setCallDuration(0);
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [callingState]);

  // Start Call Simulation
  const triggerCall = (type: 'voice' | 'video') => {
    setCallingState(type === 'voice' ? 'calling_voice' : 'calling_video');
    // Connect call automatically after 2 seconds
    setTimeout(() => {
      setCallingState('connected');
    }, 2000);
  };

  const endCall = () => {
    setCallingState('idle');
  };

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Submit text message
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeUser) return;
    sendChatMessage(activeUser.id, inputText, 'text');
    setInputText('');
  };

  // Simulated Voice Note Recording
  const startRecording = () => {
    setIsRecording(true);
    // Auto finish recording after 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      if (activeUser) {
        sendChatMessage(
          activeUser.id,
          'Simulated voice note details',
          'voice',
          'simulated-audio.mp3',
          undefined,
          '0:12'
        );
      }
    }, 3000);
  };

  // Simulated image upload
  const sendMockAttachment = (type: 'image' | 'file') => {
    if (!activeUser) return;
    if (type === 'image') {
      sendChatMessage(
        activeUser.id,
        'Attached photo of organic crops',
        'image',
        'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400',
        'crop_inspection.jpg'
      );
    } else {
      sendChatMessage(
        activeUser.id,
        'Crop Quality Certificate',
        'file',
        '#',
        'AGRI_CERTIFICATE_FL.pdf'
      );
    }
    setShowAttachments(false);
  };

  // Get conversation list items with details
  const getThreads = () => {
    return chatPartners.map(partner => {
      // Find all messages between current user and partner
      const threadMsgs = messages.filter(
        m => (m.senderId === currentUser.id && m.receiverId === partner.id) ||
             (m.senderId === partner.id && m.receiverId === currentUser.id)
      );

      const lastMsg = threadMsgs.length > 0 ? threadMsgs[threadMsgs.length - 1] : null;
      const unreadCount = threadMsgs.filter(
        m => m.senderId === partner.id && m.receiverId === currentUser.id && !m.read
      ).length;

      return {
        partner,
        lastMsg,
        unreadCount
      };
    }).sort((a, b) => {
      if (!a.lastMsg) return 1;
      if (!b.lastMsg) return -1;
      return new Date(b.lastMsg.timestamp).getTime() - new Date(a.lastMsg.timestamp).getTime();
    });
  };

  // Active chat thread messages
  const activeChatMessages = activeUser
    ? messages.filter(
        m => (m.senderId === currentUser.id && m.receiverId === activeUser.id) ||
             (m.senderId === activeUser.id && m.receiverId === currentUser.id)
      )
    : [];

  const threads = getThreads();

  return (
    <div className="flex-1 flex overflow-hidden h-[calc(100vh-4rem)] bg-slate-50 dark:bg-zinc-950">
      
      {/* 1. Chat Threads Sidebar List */}
      <div className={`${
        activeUser ? 'hidden md:flex' : 'flex'
      } flex-col w-full md:w-80 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0`}>
        <div className="p-4 border-b border-slate-100 dark:border-zinc-800/80 space-y-3">
          <h2 className="font-poppins font-bold text-base text-slate-800 dark:text-zinc-100">Direct Messages</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full bg-slate-100 dark:bg-zinc-950 border border-transparent rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-slate-200"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-zinc-800/50">
          {threads.map(({ partner, lastMsg, unreadCount }) => (
            <button
              key={partner.id}
              onClick={() => setSelectedUserId(partner.id)}
              className={`w-full flex items-start gap-3 p-3.5 hover:bg-slate-50 dark:hover:bg-zinc-800/40 cursor-pointer transition-all duration-200 ${
                activeUser?.id === partner.id ? 'bg-emerald-50/20 dark:bg-zinc-800/50' : ''
              }`}
            >
              <div className="relative shrink-0 mt-0.5">
                <img src={partner.avatar} alt={partner.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-zinc-700" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-zinc-900 ring-pulse-green" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <span className="font-bold text-xs text-slate-800 dark:text-zinc-200 truncate">{partner.name}</span>
                    {partner.verified && (
                      <Award className="w-3.5 h-3.5 text-golden-accent fill-golden-accent shrink-0" />
                    )}
                  </div>
                  {lastMsg && (
                    <ClientOnly fallback={<span className="text-[9px] text-slate-400 shrink-0">--:--</span>}>
                      <span className="text-[9px] text-slate-400 shrink-0">{new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </ClientOnly>
                  )}
                </div>
                <p className={`text-[11px] truncate mt-1 ${unreadCount > 0 ? 'text-slate-900 dark:text-zinc-100 font-semibold' : 'text-slate-400'}`}>
                  {lastMsg ? (
                    lastMsg.type === 'voice' ? '🎤 Voice Note' : lastMsg.type === 'image' ? '📷 Photo' : lastMsg.type === 'file' ? '📁 File' : lastMsg.content
                  ) : (
                    'No messages yet'
                  )}
                </p>
              </div>
              {unreadCount > 0 && (
                <span className="shrink-0 bg-emerald-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded-full mt-1.5">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Chat Conversation Viewport */}
      <div className={`${
        !activeUser ? 'hidden md:flex' : 'flex'
      } flex-1 flex-col h-full bg-slate-50 dark:bg-zinc-950 relative`}>
        
        {activeUser ? (
          <>
            {/* Header / Active Partner */}
            <div className="h-16 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedUserId(null)}
                  className="md:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative shrink-0">
                  <img src={activeUser.avatar} className="w-9 h-9 rounded-full object-cover border border-slate-200" alt="avatar" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    <span className="font-bold text-xs text-slate-800 dark:text-zinc-200">{activeUser.name}</span>
                    {activeUser.verified && (
                      <Award className="w-3.5 h-3.5 text-golden-accent fill-golden-accent" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 capitalize">
                    {activeUser.role === 'farmer' ? 'Verified Farmer' : 'Verified Company Sourcing'}
                  </span>
                </div>
              </div>

              {/* Call Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerCall('voice')}
                  className="p-2 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full text-slate-600 dark:text-zinc-300 cursor-pointer"
                  title="Voice Call"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => triggerCall('video')}
                  className="p-2 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full text-slate-600 dark:text-zinc-300 cursor-pointer"
                  title="Video Call"
                >
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-zinc-950/20">
              {activeChatMessages.map((msg) => {
                const isMine = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm text-xs ${
                      isMine 
                        ? 'bg-emerald-600 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 rounded-tl-none border border-slate-100 dark:border-zinc-800'
                    }`}>
                      {/* Message Content depending on Type */}
                      {msg.type === 'text' && (
                        <p>{msg.content}</p>
                      )}
                      
                      {msg.type === 'voice' && (
                        <div className="flex items-center gap-2">
                          <Mic className="w-4 h-4 text-emerald-100" />
                          <div className="flex-1 bg-emerald-700 dark:bg-zinc-800/80 rounded px-2.5 py-1.5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span className="text-[10px] text-white">Voice Note ({msg.duration})</span>
                          </div>
                        </div>
                      )}

                      {msg.type === 'image' && msg.mediaUrl && (
                        <div className="space-y-1">
                          <img src={msg.mediaUrl} className="rounded-lg object-cover max-h-36 w-full" alt="image message" />
                          <p className="text-[10px] italic">{msg.content}</p>
                        </div>
                      )}

                      {msg.type === 'file' && (
                        <div className="flex items-center gap-2 border border-slate-200/20 rounded-lg p-2 bg-slate-100/10">
                          <FileText className="w-5 h-5 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-bold truncate text-[10px]">{msg.fileName}</p>
                            <span className="text-[8px] opacity-75">PDF Document</span>
                          </div>
                        </div>
                      )}

                      {/* Time and Read Receipt */}
                        <div className="mt-1 flex items-center justify-end gap-1 text-[9px] opacity-75">
                          <ClientOnly fallback={<span>--:--</span>}>
                            <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </ClientOnly>
                          {isMine && (
                            msg.read ? (
                              <CheckCheck className="w-3.5 h-3.5 text-blue-300" />
                            ) : (
                              <Check className="w-3.5 h-3.5 text-slate-300" />
                            )
                          )}
                        </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input Toolbar */}
            <div className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 flex items-center gap-2 relative">
              
              {/* Attachments quick panel toggle */}
              <button
                onClick={() => setShowAttachments(!showAttachments)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 cursor-pointer"
              >
                <Paperclip className="w-4.5 h-4.5" />
              </button>

              {/* Attachments Overlay dropdown */}
              {showAttachments && (
                <div className="absolute left-3 bottom-16 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl rounded-2xl p-2 z-30 flex gap-2">
                  <button
                    onClick={() => sendMockAttachment('image')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-xl cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                    Image
                  </button>
                  <button
                    onClick={() => sendMockAttachment('file')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-xl cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    PDF Certificate
                  </button>
                </div>
              )}

              {/* Input field */}
              <form onSubmit={handleSend} className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-emerald-600"
                />
                
                {/* Voice recording button */}
                <button
                  type="button"
                  onClick={startRecording}
                  className={`p-2 rounded-full cursor-pointer transition-colors ${
                    isRecording 
                      ? 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse'
                      : 'hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600'
                  }`}
                  title="Simulate Voice Note"
                >
                  <Mic className="w-4.5 h-4.5" />
                </button>

                {/* Send button */}
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-full shadow-sm cursor-pointer hover:shadow"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
            <MessageSquare className="w-16 h-16 mb-3 text-slate-300 dark:text-zinc-700" />
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-300">Your Inbox</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs text-center">Select an active farmer or corporate buyer from the list on the left to start business negotiations.</p>
          </div>
        )}

      </div>

      {/* 3. Voice/Video Call Calling Simulation Overlay UI */}
      {callingState !== 'idle' && activeUser && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white">
          <div className="text-center space-y-6 max-w-sm">
            <div className="relative inline-block">
              <img src={activeUser.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 shadow-xl" alt="calling" />
              <span className="absolute bottom-1 right-1 bg-emerald-500 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-slate-900">
                <Volume2 className="w-3 h-3 text-white" />
              </span>
            </div>

            <div>
              <h2 className="font-poppins font-bold text-xl">{activeUser.name}</h2>
              {callingState === 'calling_voice' && (
                <p className="text-xs text-slate-400 animate-pulse mt-1.5">Calling via Voice (Secure JWT VoIP)...</p>
              )}
              {callingState === 'calling_video' && (
                <p className="text-xs text-slate-400 animate-pulse mt-1.5">Calling via Video (P2P WebRTC Stream)...</p>
              )}
              {callingState === 'connected' && (
                <p className="text-xs text-emerald-400 font-semibold mt-1.5">
                  Connected • {formatDuration(callDuration)}
                </p>
              )}
            </div>

            {/* Call Action buttons */}
            <div className="flex items-center justify-center gap-6 pt-8">
              <button
                onClick={endCall}
                className="bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
                title="Hang up"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
