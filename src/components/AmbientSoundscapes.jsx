import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, CloudRain, Coffee, Waves, Music, Sparkles } from "lucide-react";

const SOUNDSCAPES = [
  { id: "rain", name: "Rain on Glass", icon: CloudRain, color: "text-blue-400" },
  { id: "roastery", name: "Roastery Espresso Beats", icon: Coffee, color: "text-amber-500" },
  { id: "fountain", name: "Courtyard Fountain Waters", icon: Waves, color: "text-emerald-400" },
  { id: "lofi", name: "Lofi Cafe Ambient", icon: Music, color: "text-purple-400" }
];

const AmbientSoundscapes = () => {
  const [activeSound, setActiveSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleSound = (soundId) => {
    if (activeSound === soundId && isPlaying) {
      setIsPlaying(false);
      setActiveSound(null);
    } else {
      setActiveSound(soundId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      {expanded ? (
        <div className="nb-bg-ink nb-text-cream p-4 rounded-2xl shadow-2xl border border-white/20 w-64 nb-fade-up">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <span className="text-xs font-bold tracking-wider flex items-center gap-1.5 text-amber-300">
              <Sparkles size={14} /> Ambient Soundscapes
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
                  onClick={() => toggleSound(s.id)}
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
