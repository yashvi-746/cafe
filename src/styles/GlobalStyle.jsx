const GlobalStyle = () => (
  <style>{`
    :root{
      --ink:#211C17; --ink-soft:#3A322A;
      --paper:#F2ECDD; --paper-2:#E7DFC9; --paper-3:#DCD2B6;
      --espresso:#48301F; --mocha:#8C6E52; --olive:#5B6146; --olive-soft:#7C8264;
      --brass:#A9834C; --brass-soft:#C9A876;
      --cream:#F8F4E9; --line:rgba(33,28,23,0.14);
      --ok:#5B6146; --warn:#A9834C; --err:#8B4A3B;
    }
    .nb-root{ font-family:'Manrope',sans-serif; color:var(--ink); background:var(--paper); }
    .nb-display{ font-family:'Fraunces',serif; }
    .nb-bg-paper{ background:var(--paper); } .nb-bg-paper2{ background:var(--paper-2); } .nb-bg-paper3{ background:var(--paper-3); }
    .nb-bg-ink{ background:var(--ink); } .nb-bg-espresso{ background:var(--espresso); } .nb-bg-cream{ background:var(--cream); }
    .nb-bg-olive{ background:var(--olive); } .nb-bg-brass{ background:var(--brass); }
    .nb-text-ink{ color:var(--ink); } .nb-text-soft{ color:var(--ink-soft); } .nb-text-mocha{ color:var(--mocha); }
    .nb-text-cream{ color:var(--cream); } .nb-text-brass{ color:var(--brass); } .nb-text-olive{ color:var(--olive); }
    .nb-text-fade{ color:rgba(33,28,23,0.58); }
    .nb-border{ border-color:var(--line); }
    .nb-btn{ font-family:'Manrope',sans-serif; font-weight:600; letter-spacing:.01em; transition:all .25s cubic-bezier(.4,0,.2,1); cursor:pointer; }
    .nb-btn-primary{ background:var(--ink); color:var(--cream); }
    .nb-btn-primary:hover{ background:var(--espresso); transform:translateY(-1px); }
    .nb-btn-outline{ background:transparent; border:1px solid var(--ink); color:var(--ink); }
    .nb-btn-outline:hover{ background:var(--ink); color:var(--cream); }
    .nb-btn-brass{ background:var(--brass); color:var(--cream); }
    .nb-btn-brass:hover{ background:var(--espresso); }
    .nb-card{ background:var(--cream); border:1px solid var(--line); }
    .nb-card-hover{ transition:transform .35s cubic-bezier(.4,0,.2,1), box-shadow .35s; }
    .nb-card-hover:hover{ transform:translateY(-4px); box-shadow:0 18px 40px -18px rgba(33,28,23,0.35); }
    .nb-underline{ position:relative; }
    .nb-underline::after{ content:''; position:absolute; left:0; bottom:-3px; width:0; height:1px; background:currentColor; transition:width .3s ease; }
    .nb-underline:hover::after{ width:100%; }
    .nb-fade-up{ animation:nbFadeUp .8s cubic-bezier(.2,.7,.2,1) both; }
    @keyframes nbFadeUp{ from{ opacity:0; transform:translateY(18px);} to{opacity:1; transform:translateY(0);} }
    .nb-fade{ animation:nbFade .6s ease both; }
    @keyframes nbFade{ from{opacity:0;} to{opacity:1;} }
    .nb-scale-in{ animation:nbScaleIn .35s cubic-bezier(.2,.8,.2,1) both; }
    @keyframes nbScaleIn{ from{opacity:0; transform:scale(.96);} to{opacity:1; transform:scale(1);} }
    .nb-slide-left{ animation:nbSlideLeft .4s cubic-bezier(.2,.8,.2,1) both; }
    @keyframes nbSlideLeft{ from{transform:translateX(100%);} to{transform:translateX(0);} }
    .nb-grain{ position:relative; }
    .nb-grain::before{ content:''; position:absolute; inset:0; pointer-events:none; opacity:.05;
      background-image:radial-gradient(circle, #000 1px, transparent 1px); background-size:3px 3px; }
    .nb-scroll::-webkit-scrollbar{ width:5px; height:5px; }
    .nb-scroll::-webkit-scrollbar-thumb{ background:var(--paper-3); border-radius:4px; }
    .nb-hero-photo{ background:
        radial-gradient(ellipse at 30% 20%, rgba(169,131,76,0.35), transparent 55%),
        radial-gradient(ellipse at 75% 80%, rgba(91,97,70,0.35), transparent 55%),
        linear-gradient(160deg, #2A2019 0%, #48301F 45%, #1E1913 100%);
      animation:nbPan 22s ease-in-out infinite alternate;
    }
    @keyframes nbPan{ from{ background-position:0% 0%, 0% 0%, 0% 0%; } to{ background-position:8% 6%, -6% -4%, 0% 0%; } }
    .nb-photo{ background-size:cover; background-position:center; position:relative; overflow:hidden; }
    .nb-photo-1{ background:linear-gradient(135deg,#5B6146,#3A3D2B); }
    .nb-photo-2{ background:linear-gradient(135deg,#8C6E52,#48301F); }
    .nb-photo-3{ background:linear-gradient(135deg,#A9834C,#6B5230); }
    .nb-photo-4{ background:linear-gradient(135deg,#3A322A,#211C17); }
    .nb-photo-5{ background:linear-gradient(135deg,#C9A876,#8C6E52); }
    .nb-photo-6{ background:linear-gradient(135deg,#7C8264,#48301F); }
    .nb-ring{ transition:stroke-dashoffset .6s ease; }
    input[type=range].nb-range{ -webkit-appearance:none; height:2px; background:var(--paper-3); border-radius:2px; }
    input[type=range].nb-range::-webkit-slider-thumb{ -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:var(--ink); cursor:pointer; margin-top:-7px; }
    .nb-toast{ animation:nbToast .35s cubic-bezier(.2,.8,.2,1) both; }
    @keyframes nbToast{ from{opacity:0; transform:translateY(-12px) scale(.95);} to{opacity:1; transform:translateY(0) scale(1);} }
    .nb-focus:focus-visible{ outline:2px solid var(--brass); outline-offset:2px; }
    .nb-magnet{ transition: transform .2s ease; }

    /* ---- cinematic hero ---- */
    .nb-hero-zoom{ animation:nbKenBurns 26s ease-in-out infinite alternate; transform-origin:center; will-change:transform; }
    @keyframes nbKenBurns{ from{ transform:scale(1); } to{ transform:scale(1.09); } }

    .nb-word-reveal{ display:inline-block; transform:translateY(115%); opacity:0; animation:nbWordReveal .9s cubic-bezier(.16,.84,.24,1) forwards; }
    @keyframes nbWordReveal{ to{ transform:translateY(0); opacity:1; } }

    .nb-ember{ position:absolute; bottom:-24px; width:4px; height:4px; border-radius:50%;
      background:radial-gradient(circle, rgba(201,168,118,0.95), rgba(201,168,118,0) 72%);
      box-shadow:0 0 8px 2px rgba(201,168,118,0.45);
      animation-name:nbEmberRise; animation-timing-function:ease-in; animation-iteration-count:infinite; }
    @keyframes nbEmberRise{
      0%{ transform:translateY(0) translateX(0); opacity:0; }
      12%{ opacity:.85; }
      80%{ opacity:.35; }
      100%{ transform:translateY(-92vh) translateX(16px); opacity:0; }
    }

    .nb-pulse-dot{ position:absolute; display:inline-flex; height:100%; width:100%; border-radius:9999px;
      background:var(--brass); opacity:.6; animation:nbPing 1.8s cubic-bezier(0,0,.2,1) infinite; }
    .nb-pulse-dot-off{ background:rgba(255,255,255,.45); }
    @keyframes nbPing{ 75%,100%{ transform:scale(2.6); opacity:0; } }

    .nb-scroll-cue{ animation:nbBounce 2.2s ease-in-out infinite; }
    @keyframes nbBounce{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(6px); } }

    @media (prefers-reduced-motion: reduce){
      .nb-fade-up, .nb-fade, .nb-scale-in, .nb-slide-left, .nb-hero-photo, .nb-hero-zoom,
      .nb-ember, .nb-pulse-dot, .nb-scroll-cue, .nb-word-reveal, .nb-toast{ animation:none !important; }
      .nb-word-reveal{ opacity:1 !important; transform:none !important; }
      html{ scroll-behavior:auto !important; }
    }
  `}</style>
);

export default GlobalStyle;
