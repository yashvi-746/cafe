import React, { useState, useEffect, useRef } from "react";
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

  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timerRef = useRef(null);

  const stopAudio = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (noiseNodeRef.current) {
      try { noiseNodeRef.current.stop(); } catch (e) {}
      noiseNodeRef.current.disconnect();
      noiseNodeRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try { audioCtxRef.current.suspend(); } catch (e) {}
    }
  };

  const startAudio = (type) => {
    stopAudio();

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === "rain") {
        // Pink noise filter for rain effect
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      } else if (type === "fountain") {
        // Soft brown noise for stream / water effect
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      } else if (type === "roastery") {
        // Espresso warm white noise rhythm
        output[i] = (lastOut + (0.01 * white)) / 1.01;
        lastOut = output[i];
        output[i] *= 2.2;
      } else {
        // Lofi warmth
        b0 = 0.99 * b0 + white * 0.05;
        output[i] = b0 * 0.4;
      }
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = type === "rain" ? "lowpass" : type === "fountain" ? "bandpass" : "lowpass";
    filter.frequency.value = type === "rain" ? 1000 : type === "fountain" ? 800 : type === "roastery" ? 600 : 400;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start();
    noiseNodeRef.current = whiteNoise;
    gainNodeRef.current = gainNode;

    // Gentle modulation to make ambient sound organic
    timerRef.current = setInterval(() => {
      if (gainNodeRef.current && ctx) {
        const mod = 0.12 + (Math.random() * 0.06);
        gainNodeRef.current.gain.setTargetAtTime(mod, ctx.currentTime, 0.5);
      }
    }, 1500);
  };

  const toggleSound = (soundId) => {
    if (activeSound === soundId && isPlaying) {
      setIsPlaying(false);
      setActiveSound(null);
      stopAudio();
    } else {
      setActiveSound(soundId);
      setIsPlaying(true);
      startAudio(soundId);
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
