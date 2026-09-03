import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, Heart, Share2, Music, X, ChevronRight, ChevronLeft, Check } from "lucide-react";

const REEL_SCENES = [
  {
    id: 1,
    title: "1. Welcome to Noir & Bean",
    caption: "✨ Step inside Vadodara's aesthetic sanctuary. Roasted daily, crafted slowly. ☕🌿",
    video: "https://assets.mixkit.co/videos/preview/mixkit-coffee-barista-pouring-milk-in-a-cup-41150-large.mp4",
    poster: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    audio: "Original Atmosphere Audio — Lofi Roastery Chill"
  },
  {
    id: 2,
    title: "2. Courtyard Waterfall & Garden",
    caption: "🌊 Relax by our open-air courtyard waterfall, foliage nooks, and cozy seating. 🍃✨",
    video: "https://assets.mixkit.co/videos/preview/mixkit-water-flowing-over-rocks-in-a-river-41485-large.mp4",
    poster: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    audio: "Waterfall Sounds & Morning Bird Acoustic"
  },
  {
    id: 3,
    title: "3. Live Jazz & Evening Vibes",
    caption: "🎷 Live Sunday Jazz sessions & golden hour artisan coffee pour-overs. 🎹🎶",
    video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-barista-making-a-latte-40156-large.mp4",
    poster: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
    audio: "Live Saxophone & Jazz Quartet Performance"
  },
  {
    id: 4,
    title: "4. Master Barista Pour-over",
    caption: "☕ Watch our master baristas pour signature latte art and cold brew drips! 🥛⚡",
    video: "https://assets.mixkit.co/videos/preview/mixkit-dripping-filter-coffee-in-a-glass-41148-large.mp4",
    poster: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    audio: "Espresso Steam Wand & Latte Art Beats"
  }
];

const CafeReelModal = ({ open, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(3120);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % REEL_SCENES.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [open, isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, activeIdx]);

  if (!open) return null;

  const currentScene = REEL_SCENES[activeIdx];

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(l => liked ? l - 1 : l + 1);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-6">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md nb-fade" onClick={onClose} />
      
      <div className="relative w-full max-w-sm h-[84vh] max-h-[740px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 z-10 flex flex-col justify-between nb-scale-in">
        {/* Story Progress Bar Indicators */}
        <div className="absolute top-3 left-4 right-14 z-30 flex gap-1.5">
          {REEL_SCENES.map((s, idx) => (
            <div key={s.id} className="h-1 grow bg-white/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-white transition-all duration-300 ${idx === activeIdx ? 'w-full' : idx < activeIdx ? 'w-full' : 'w-0'}`} 
              />
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white nb-focus"
        >
          <X size={18} />
        </button>

        {/* REAL Live Video Player Layer */}
        <div className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center">
          <video 
            ref={videoRef}
            key={currentScene.id}
            src={currentScene.video}
            poster={currentScene.poster}
            autoPlay 
            loop 
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50 pointer-events-none" />
        </div>

        {/* Top Header Branding Overlay */}
        <div className="relative z-20 p-5 pt-8 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="nb-display text-sm font-semibold tracking-wider">NOIR & BEAN</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-amber-200 border border-white/10">
            <Sparkles size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>LIVE HD Video</span>
          </div>
        </div>

        {/* Left/Right Scene Manual Nav Controls */}
        <div className="relative z-20 flex-1 flex items-center justify-between px-3">
          <button 
            onClick={() => setActiveIdx(prev => (prev - 1 + REEL_SCENES.length) % REEL_SCENES.length)}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/90 hover:text-white hover:scale-110 transition-transform"
          >
            <ChevronLeft size={22} />
          </button>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-xl"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>

          <button 
            onClick={() => setActiveIdx(prev => (prev + 1) % REEL_SCENES.length)}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/90 hover:text-white hover:scale-110 transition-transform"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Right Action Bar */}
        <div className="absolute right-4 bottom-28 z-20 flex flex-col gap-4 items-center">
          <button onClick={toggleLike} className="flex flex-col items-center gap-1 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${liked ? 'bg-rose-500 text-white scale-110' : 'bg-black/50 text-white hover:bg-rose-500/80'}`}>
              <Heart size={20} className={liked ? 'fill-current' : ''} />
            </div>
            <span className="text-[10px] text-white font-medium drop-shadow">{likesCount}</span>
          </button>

          <button onClick={() => setIsMuted(!isMuted)} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-amber-300 animate-pulse" />}
          </button>

          <button onClick={handleShare} className="relative flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-emerald-600 transition-colors">
              {copied ? <Check size={18} className="text-emerald-300" /> : <Share2 size={18} />}
            </div>
            <span className="text-[9px] text-white/80 drop-shadow">{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>

        {/* Footer Caption Overlay */}
        <div className="relative z-20 p-5 text-white bg-gradient-to-t from-black via-black/80 to-transparent pt-8">
          <p className="text-[11px] font-bold text-[#A9834C] uppercase tracking-wider mb-1">{currentScene.title}</p>
          <p className="text-xs text-white/90 leading-relaxed font-light drop-shadow mb-3">
            {currentScene.caption}
          </p>

          <div className="flex items-center gap-2 text-[11px] text-amber-200/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full w-fit border border-white/10">
            <Music size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span className="truncate max-w-[200px]">{currentScene.audio}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeReelModal;
