'use client';

import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, Award, MessageSquare,
  Globe, Calendar, MapPin, DollarSign, Archive, Eye, RefreshCw
} from 'lucide-react';
import { Post, Comment } from '../../utils/mockData';
import { useApp } from '../../context/AppContext';
import { translateText, detectLanguage, UI_TRANSLATIONS } from '../../utils/translation';
import ClientOnly from '../../components/ClientOnly';

interface PostCardProps {
  post: Post;
  onContactClick: (userId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onContactClick }) => {
  const { currentUser, likePost, savePost, comments, addComment, currentLanguage } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  
  // Translation state
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [detectedLang] = useState(() => detectLanguage(post.content));

  if (!currentUser) return null;

  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.English;
  const isLiked = post.likedBy.includes(currentUser.id);
  const isSaved = post.savedBy.includes(currentUser.id);

  const postComments = comments.filter(c => c.postId === post.id);

  const handleTranslate = async () => {
    if (translatedText) {
      setTranslatedText(null); // toggle back
      return;
    }
    
    setIsTranslating(true);
    try {
      // Check if we have pre-translated text in mockData
      if (post.translatedContent && post.translatedContent[currentLanguage]) {
        setTimeout(() => {
          setTranslatedText(post.translatedContent![currentLanguage]);
          setIsTranslating(false);
        }, 300);
      } else {
        const result = await translateText(post.content, detectedLang, currentLanguage);
        setTranslatedText(result);
        setIsTranslating(false);
      }
    } catch (err) {
      setIsTranslating(false);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(post.id, newCommentText);
    setNewCommentText('');
  };

  const handleShare = () => {
    // Copy a simulated post link to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/posts/${post.id}`);
    alert('Share link copied to clipboard!');
  };

  return (
    <article className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
      
      {/* Header Profile Info */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img 
            src={post.userAvatar} 
            alt={post.userName} 
            className={`w-11 h-11 rounded-full object-cover border-2 ${
              post.userRole === 'farmer' ? 'border-emerald-600/40' : 'border-blue-600/40'
            }`}
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-poppins font-bold text-sm text-slate-800 dark:text-zinc-100">{post.userName}</span>
              {post.verified && (
                <Award className="w-4 h-4 text-golden-accent fill-golden-accent" />
              )}
              <ClientOnly fallback={<span className="text-[10px] text-slate-400 font-medium">• --:--</span>}>
                <span className="text-[10px] text-slate-400 font-medium">• {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </ClientOnly>
            </div>
            
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                post.userRole === 'farmer' 
                  ? 'bg-emerald-50 text-primary-green dark:bg-emerald-950/30' 
                  : 'bg-blue-50 text-corporate-blue dark:bg-blue-950/30'
              }`}>
                {post.userRole === 'farmer' ? t.farmerRole : t.companyRole}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                {post.location}
              </span>
            </div>
          </div>
        </div>

        {/* Translation tag */}
        <button
          onClick={handleTranslate}
          className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 px-2 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer transition-all duration-200"
          title="Translate post"
        >
          {isTranslating ? (
            <RefreshCw className="w-3 h-3 animate-spin text-emerald-600" />
          ) : (
            <Globe className="w-3.5 h-3.5" />
          )}
          <span>{translatedText ? 'Show Original' : `Translate (${detectedLang})`}</span>
        </button>
      </div>

      {/* Main post text content */}
      <div className="mt-3 text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-sans">
        <p>{translatedText ? translatedText : post.content}</p>
        
        {translatedText && (
          <span className="inline-block mt-1 text-[9px] font-bold text-emerald-600 uppercase tracking-wide">
            ★ AI Translated to {currentLanguage}
          </span>
        )}
      </div>

      {/* Crop details table if crop listing */}
      {post.type === 'crop_offer' && post.cropDetails && (
        <div className="mt-3 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-500/10 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <span className="text-slate-400 font-medium">Crop Name:</span>
            <p className="font-bold text-slate-700 dark:text-zinc-200 mt-0.5">{post.cropDetails.productName}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Quantity:</span>
            <p className="font-bold text-slate-700 dark:text-zinc-200 mt-0.5">{post.cropDetails.quantity}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Pricing:</span>
            <p className="font-bold text-slate-700 dark:text-zinc-200 mt-0.5">{post.cropDetails.price}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Harvest Date:</span>
            <p className="font-bold text-slate-700 dark:text-zinc-200 mt-0.5">{post.cropDetails.harvestDate}</p>
          </div>
        </div>
      )}

      {/* Corporate requirement details table if requirement listing */}
      {post.type === 'corporate_requirement' && post.requirementDetails && (
        <div className="mt-3 bg-blue-50/50 dark:bg-blue-950/10 border border-blue-500/10 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <span className="text-slate-400 font-medium">Requirement:</span>
            <p className="font-bold text-slate-700 dark:text-zinc-200 mt-0.5">{post.requirementDetails.requirementTitle}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Quantity Needed:</span>
            <p className="font-bold text-slate-700 dark:text-zinc-200 mt-0.5">{post.requirementDetails.quantityNeeded}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Target Budget:</span>
            <p className="font-bold text-slate-700 dark:text-zinc-200 mt-0.5">{post.requirementDetails.budget}</p>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Procurement Deadline:</span>
            <p className="font-bold text-slate-700 dark:text-zinc-200 mt-0.5">{post.requirementDetails.deadline}</p>
          </div>
        </div>
      )}

      {/* Media attachments */}
      {post.mediaType === 'image' && post.mediaUrl && (
        <div className="mt-3 rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 aspect-video max-h-72 w-full">
          <img 
            src={post.mediaUrl} 
            alt="Post Attachment" 
            className="w-full h-full object-cover hover:scale-101 transition-transform duration-200"
          />
        </div>
      )}

      {/* Action Buttons Panel */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
        
        {/* Social interactions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Like */}
          <button
            onClick={() => likePost(post.id)}
            className={`flex items-center gap-1.5 text-xs font-medium cursor-pointer transition-colors group ${
              isLiked ? 'text-rose-600' : 'text-slate-500 dark:text-zinc-400 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform group-active:scale-125 ${isLiked ? 'fill-rose-600' : ''}`} />
            <span>{post.likes}</span>
          </button>

          {/* Comments count */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-zinc-400 hover:text-emerald-600 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{postComments.length}</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => savePost(post.id)}
            className={`flex items-center gap-1 text-xs font-medium cursor-pointer transition-colors ${
              isSaved ? 'text-blue-600' : 'text-slate-500 dark:text-zinc-400 hover:text-blue-500'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
          </button>
          
          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 cursor-pointer"
            title={t.share}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Contact/Direct Message Action Button */}
        {currentUser.id !== post.userId && (
          <button
            onClick={() => onContactClick(post.userId)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm cursor-pointer hover:shadow transition-all duration-200 ${
              post.userRole === 'farmer' 
                ? 'bg-primary-green hover:bg-primary-green-hover ring-pulse-green' 
                : 'bg-corporate-blue hover:bg-corporate-blue-hover ring-pulse-blue'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        )}
      </div>

      {/* Expanded Comments Section */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Comments
          </div>
          
          {/* Comments List */}
          <div className="space-y-2.5 max-h-48 overflow-y-auto">
            {postComments.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No comments yet. Start the conversation!</p>
            ) : (
              postComments.map((comment) => (
                <div key={comment.id} className="flex gap-2.5 bg-slate-50 dark:bg-zinc-950 p-2.5 rounded-xl text-xs">
                  <img src={comment.userAvatar} className="w-7 h-7 rounded-full object-cover shrink-0" alt="avatar" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800 dark:text-zinc-200">{comment.userName}</span>
                      <ClientOnly fallback={<span className="text-[9px] text-slate-400">--:--</span>}>
                        <span className="text-[9px] text-slate-400">{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </ClientOnly>
                    </div>
                    <p className="text-slate-600 dark:text-zinc-300 mt-0.5 leading-normal">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Add your reply..."
              className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="bg-slate-800 dark:bg-zinc-800 hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl text-xs cursor-pointer"
            >
              Reply
            </button>
          </form>
        </div>
      )}

    </article>
  );
};
