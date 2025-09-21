import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  MoreHorizontal,
  ArrowLeft,
  Send,
  User,
  Play,
  Volume2,
  VolumeX
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Reels = () => {
  const { toast } = useToast();
  const [activeReel, setActiveReel] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch and scroll handling
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const isScrolling = useRef(false);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current) return;
    
    const distance = touchStartY.current - touchEndY.current;
    const minDistance = 50;

    if (Math.abs(distance) < minDistance) return;

    if (distance > 0) {
      // Swiped up - next reel
      nextReel();
    } else {
      // Swiped down - previous reel
      previousReel();
    }

    touchStartY.current = 0;
    touchEndY.current = 0;
  };

  // Handle mouse wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    if (isScrolling.current) return;
    isScrolling.current = true;

    if (e.deltaY > 0) {
      // Scroll down - next reel
      nextReel();
    } else {
      // Scroll up - previous reel
      previousReel();
    }

    // Reset scrolling flag after delay
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      nextReel();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      previousReel();
    }
  };

  // Navigation functions
  const nextReel = () => {
    if (activeReel < reels.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveReel(activeReel + 1);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 150);
    }
  };

  const previousReel = () => {
    if (activeReel > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveReel(activeReel - 1);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 150);
    }
  };

  // Add keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeReel]);
  
  const [reelInteractions, setReelInteractions] = useState<{[key: number]: {
    liked: boolean;
    saved: boolean;
    likes: number;
    comments: Array<{id: number; user: string; text: string; time: string}>;
  }}>({
    0: { 
      liked: false, 
      saved: false, 
      likes: 1240, 
      comments: [
        {id: 1, user: "foodie_lover", text: "This looks absolutely delicious! 😍", time: "2h"},
        {id: 2, user: "chef_mike", text: "Great plating technique!", time: "1h"},
        {id: 3, user: "hungry_student", text: "I need this recipe ASAP", time: "30m"},
      ]
    },
    1: { 
      liked: true, 
      saved: false, 
      likes: 856, 
      comments: [
        {id: 1, user: "pizza_fanatic", text: "Best pizza in town! 🍕", time: "3h"},
        {id: 2, user: "local_foodie", text: "Their margherita is amazing too", time: "2h"},
      ]
    },
    2: { 
      liked: false, 
      saved: true, 
      likes: 2100, 
      comments: [
        {id: 1, user: "sushi_master", text: "Perfect knife work! 👨‍🍳", time: "4h"},
        {id: 2, user: "fish_lover", text: "That salmon looks so fresh", time: "2h"},
        {id: 3, user: "tokyo_eats", text: "Reminds me of Tokyo!", time: "1h"},
      ]
    },
  });

  const reels = [
    {
      id: 0,
      restaurant: "Mama's Kitchen",
      dish: "Truffle Pasta",
      description: "Watch our chef create magic with fresh truffle and homemade pasta 🍝✨ #TrufflePasta #FreshMade #ChefSpecial",
      avatar: "/placeholder.svg",
      thumbnail: "🍝",
      verified: true,
    },
    {
      id: 1,
      restaurant: "Pizza Palace",
      dish: "Wood-Fired Pizza",
      description: "Nothing beats the taste of authentic wood-fired pizza! 🍕🔥 Our dough is made fresh daily #WoodFired #AuthenticPizza #FreshDough",
      avatar: "/placeholder.svg",
      thumbnail: "🍕",
      verified: true,
    },
    {
      id: 2,
      restaurant: "Sakura Sushi",
      dish: "Fresh Sashimi",
      description: "The art of sashimi - watch our master chef prepare the freshest catch 🍣🎌 #Sashimi #FreshFish #SushiArt #JapaneseFood",
      avatar: "/placeholder.svg",
      thumbnail: "🍣",
      verified: false,
    },
  ];

  const handleLike = (reelId: number) => {
    setReelInteractions(prev => ({
      ...prev,
      [reelId]: {
        ...prev[reelId],
        liked: !prev[reelId].liked,
        likes: prev[reelId].liked ? prev[reelId].likes - 1 : prev[reelId].likes + 1
      }
    }));
    
    toast({
      title: reelInteractions[reelId]?.liked ? "Unliked" : "Liked!",
      description: reelInteractions[reelId]?.liked ? "Removed from favorites" : "Added to your favorites",
    });
  };

  const handleSave = (reelId: number) => {
    setReelInteractions(prev => ({
      ...prev,
      [reelId]: {
        ...prev[reelId],
        saved: !prev[reelId].saved
      }
    }));
    
    toast({
      title: reelInteractions[reelId]?.saved ? "Unsaved" : "Saved!",
      description: reelInteractions[reelId]?.saved ? "Removed from saved reels" : "Added to saved reels",
    });
  };

  const handleComment = (reelId: number) => {
    if (!commentInput.trim()) return;
    
    setReelInteractions(prev => ({
      ...prev,
      [reelId]: {
        ...prev[reelId],
        comments: [
          ...prev[reelId].comments,
          {
            id: Date.now(),
            user: "you",
            text: commentInput,
            time: "now"
          }
        ]
      }
    }));
    
    setCommentInput("");
    toast({
      title: "Comment Added!",
      description: "Your comment has been posted",
    });
  };

  const currentReel = reels[activeReel];
  const currentInteractions = reelInteractions[activeReel] || { liked: false, saved: false, likes: 0, comments: [] };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-white font-semibold">Food Reels</h1>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </header>

      {/* Main Reel Content */}
      <div className="relative h-screen flex">
        {/* Video Area with smooth transitions */}
        <div className="relative w-full overflow-hidden">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className={`absolute inset-0 transition-transform duration-300 ease-out ${
                index === activeReel 
                  ? 'translate-y-0' 
                  : index < activeReel 
                    ? '-translate-y-full' 
                    : 'translate-y-full'
              } ${isTransitioning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}
              style={{ 
                zIndex: index === activeReel ? 10 : 1,
                transform: `translateY(${(index - activeReel) * 100}%) ${isTransitioning ? 'scale(0.95)' : 'scale(1)'}`,
                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s ease'
              }}
            >
              <div className="flex-1 relative bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-9xl mb-4 animate-pulse-heart">
                    {reel.thumbnail}
                  </div>
                  <div className="absolute inset-0 bg-gradient-overlay"></div>
                </div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full w-20 h-20"
                  >
                    <Play className="w-8 h-8 fill-current" />
                  </Button>
                </div>

                {/* Volume Control */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-20 left-4 text-white hover:bg-white/20 rounded-full w-10 h-10"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>

                {/* Bottom Content for this reel */}
                <div className="absolute bottom-0 left-0 right-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-12 w-12 border-2 border-white">
                      <AvatarImage src={reel.avatar} alt={reel.restaurant} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {reel.restaurant[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-semibold">{reel.restaurant}</h3>
                        {reel.verified && (
                          <Badge variant="secondary" className="bg-blue-600 text-white border-0">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <p className="text-white/80 text-sm">{reel.dish}</p>
                    </div>
                    <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                      Follow
                    </Button>
                  </div>
                  
                  <p className="text-white text-sm mb-4 leading-relaxed">
                    {reel.description}
                  </p>

                  {/* Comment Input */}
                  {index === activeReel && (
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Add a comment..."
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-12"
                          onKeyPress={(e) => e.key === 'Enter' && handleComment(activeReel)}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-8 w-8"
                          onClick={() => handleComment(activeReel)}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar - Actions */}
        <div className="absolute right-0 top-0 w-20 flex flex-col items-center justify-end pb-32 space-y-6 h-full z-20">
          {/* Like Button */}
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full w-12 h-12 transition-all duration-200 ${
                currentInteractions.liked 
                  ? 'text-red-500 bg-white/20 scale-110' 
                  : 'text-white hover:bg-white/20 hover:scale-105'
              }`}
              onClick={() => handleLike(activeReel)}
            >
              <Heart className={`w-6 h-6 transition-all duration-200 ${currentInteractions.liked ? 'fill-current animate-pulse' : ''}`} />
            </Button>
            <span className="text-white text-xs font-medium">
              {currentInteractions.likes.toLocaleString()}
            </span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 rounded-full w-12 h-12"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <span className="text-white text-xs font-medium">
              {currentInteractions.comments.length}
            </span>
          </div>

          {/* Save Button */}
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-full w-12 h-12 transition-all duration-200 ${
                currentInteractions.saved 
                  ? 'text-yellow-500 bg-white/20 scale-110' 
                  : 'text-white hover:bg-white/20 hover:scale-105'
              }`}
              onClick={() => handleSave(activeReel)}
            >
              <Bookmark className={`w-5 h-5 transition-all duration-200 ${currentInteractions.saved ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 rounded-full w-12 h-12"
            >
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col space-y-2">
        {reels.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-8 rounded-full transition-colors ${
              index === activeReel ? 'bg-white' : 'bg-white/40'
            }`}
            onClick={() => setActiveReel(index)}
          />
        ))}
      </div>

      {/* Comments Sidebar (Optional - can be toggled) */}
      {/* This would be implemented as a slide-out panel */}
    </div>
  );
};

export default Reels;