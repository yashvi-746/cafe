import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, CloudRain, Coffee, Waves, Music, Sparkles } from "lucide-react";

const SOUNDSCAPES = [
  { 
    id: "jazz", 
    name: "Midnight Jazz & Espresso", 
    icon: Coffee, 
    color: "text-amber-500",
    url: "/audio/jazz_cafe.mp3"
  },
  { 
    id: "rain", 
    name: "Rain on Cafe Glass", 
    icon: CloudRain, 
    color: "text-blue-400",
    url: "/audio/rain.mp3"
  },
  { 
    id: "acoustic", 
    name: "Acoustic Sunset Chill", 
    icon: Sparkles, 
    color: "text-emerald-400",
    url: "/audio/acoustic_vibes.mp3"
  },
  { 
    id: "ambience", 
    name: "Parisian Coffee Shop", 
    icon: Music, 
    color: "text-purple-400",
    url: "/audio/cafe_ambience.ogg"
  }
];

const AmbientSoundscapes = () => {
  const [activeSound, setActiveSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const audioRef = useRef(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const toggleSound = (sound) => {
    if (activeSound === sound.id && isPlaying) {
      setIsPlaying(false);
      setActiveSound(null);
      stopAudio();
    } else {
      stopAudio();
      const newAudio = new Audio(sound.url);
      newAudio.loop = true;
      newAudio.volume = 0.6;
      newAudio.play().catch(e => console.log("Audio play allowed on user click:", e));
      audioRef.current = newAudio;
      setActiveSound(sound.id);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  return (
    <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-[55]">
      {expanded ? (
        <div className="nb-bg-ink nb-text-cream p-4 rounded-2xl shadow-2xl border border-white/20 w-64 nb-fade-up">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <span className="text-xs font-bold tracking-wider flex items-center gap-1.5 text-amber-300">
              <Sparkles size={14} /> Aesthetic Cafe Music
            </span>
            <button onClick={() => setExpanded(false)} className="text-xs text-white/60 hover:text-white">
              ✕
            </button>
          </div>
          
          <div className="space-y-1.5">
            {SOUNDSCAPES.map(s => {
              const Icon = s.icon;
              const active = activeSound === s.id && isPlaying;
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSound(s)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all ${active ? 'bg-white/20 border border-white/30 text-white font-semibold' : 'hover:bg-white/10 text-white/80'}`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} className={s.color} /> {s.name}
                  </span>
                  {active ? (
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-0.5 h-3 bg-amber-400 animate-pulse" />
                      <span className="w-0.5 h-2 bg-amber-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="w-0.5 h-3.5 bg-amber-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </span>
                  ) : (
                    <VolumeX size={12} className="opacity-40" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl backdrop-blur-md border border-white/20 transition-all text-xs font-semibold ${isPlaying ? 'nb-bg-ink nb-text-cream border-amber-400/50 scale-105' : 'bg-black/80 text-white hover:bg-black'}`}
        >
          <Volume2 size={15} className={isPlaying ? "text-amber-400 animate-pulse" : "text-white/60"} />
          <span>{isPlaying ? "Playing Ambiance" : "Cafe Soundscapes"}</span>
        </button>
      )}
    </div>
  );
};

export default AmbientSoundscapes;
