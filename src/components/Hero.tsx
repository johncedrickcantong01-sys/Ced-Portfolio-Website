import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Monitor, Smartphone, Sparkles, Film } from 'lucide-react';

const PREVIEW_CLIPS = [
  {
    id: 'shorts',
    label: 'Shorts/Reels',
    icon: <Smartphone size={14} />,
    title: 'Ced Showcase (Vertical)',
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/Sample%20Edit%20%231-HD%201080p.mp4',
    aspect: 'vertical',
  },
  {
    id: 'podcast',
    label: 'Podcast',
    icon: <Monitor size={14} />,
    title: 'Cases 4 Causes (Multi-Cam)',
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/Trailer%20Landon%20-%20Cases%204%20Causes%20Podcast%20E2-HD%201080p.mp4',
    aspect: 'horizontal',
  },
  {
    id: 'commercial',
    label: 'Commercial/VSL',
    icon: <Sparkles size={14} />,
    title: 'Sophie Feb Ad (Promo)',
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/16x9%20Sophie%20Feb.%202025%20AD%235-HD%201080p.mp4',
    aspect: 'horizontal',
  }
];

export default function Hero() {
  const [activeClip, setActiveClip] = useState(PREVIEW_CLIPS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync state when clip changes
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented on mount/clip-change:", error);
        });
      }
    }
  }, [activeClip]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch((error) => {
          console.log("Play call failed:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newPercentage = clickX / width;
      videoRef.current.currentTime = newPercentage * duration;
      setProgress(newPercentage * 100);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[85vh] flex items-center container-max pt-28 pb-16">
      
      {/* Ambient Glow & Grid Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Soft radial glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[45%] rounded-full bg-primary/5 blur-[100px] opacity-40" />
        
        {/* Softened background grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full z-10">
        
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Availability Indicator */}
          <div className="flex items-center gap-3 mb-6 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-white/80">Available for Q3 Projects & Retainers</span>
          </div>

          {/* Main Headline */}
          <h1 className="heading-xl text-text-main max-w-2xl mb-6 leading-[1.0] tracking-tight">
            High-Retention Editing for Multi-Format <br className="hidden md:block" />
            <span className="text-primary font-bold">Video Pipelines</span>
            <span className="text-primary">.</span>
          </h1>

          {/* Subheadline (Brighter, thicker, highly readable) */}
          <p className="text-body-lg text-white/95 max-w-xl mb-10 leading-relaxed font-normal">
            I turn raw footage into polished podcasts, high-converting VSLs, and scroll-stopping social clips. Smooth editing, engaging pacing, and stress-free delivery to keep your content moving.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <a href="#projects" className="btn-primary group">
              Explore My Work
              <Play size={14} className="ml-4 group-hover:translate-x-1 transition-transform" fill="currentColor" />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-white font-sans text-[11px] font-semibold tracking-widest uppercase px-6 py-3 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-primary">
              Let's Collaborate
            </a>
          </div>
          
        </div>

        {/* Right Column: Interactive Multi-Format Preview Player */}
        <div className="lg:col-span-5 w-full flex flex-col items-center lg:items-end justify-center">
          
          {/* Format Selection Tab Pills */}
          <div className="flex items-center gap-1.5 mb-4 bg-white/5 p-1 rounded-lg border border-white/10 w-fit backdrop-blur-md">
            {PREVIEW_CLIPS.map(clip => (
              <button
                key={clip.id}
                onClick={() => setActiveClip(clip)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeClip.id === clip.id
                    ? 'bg-primary text-black shadow-md shadow-primary/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {clip.icon}
                {clip.label}
              </button>
            ))}
          </div>

          {/* Dynamic Video Player Frame */}
          <div className="relative w-full flex justify-center items-center">
            
            {/* Ambient Backglow behind Player */}
            <div className="absolute inset-0 bg-primary/5 blur-[60px] rounded-full pointer-events-none -z-10" />

            <div 
              onClick={() => togglePlay()}
              className={`group relative w-full cursor-pointer overflow-hidden border border-white/10 bg-black shadow-2xl transition-all duration-500 ease-out flex items-center justify-center ${
                activeClip.aspect === 'vertical' 
                  ? 'max-w-[280px] aspect-[9/16] rounded-[2rem] border-4 border-neutral-800 ring-1 ring-white/10' 
                  : 'max-w-xl aspect-video rounded-xl'
              }`}
            >
              <video
                ref={videoRef}
                src={activeClip.videoUrl}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                playsInline
                autoPlay
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />

              {/* Status Header Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/5 pointer-events-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
                <span className="font-mono text-[9px] text-white/90 uppercase tracking-widest font-semibold">
                  FEATURED
                </span>
              </div>

              {/* Top Right Action Overlay (Mute Toggle) */}
              <button 
                onClick={toggleMute} 
                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/90 border border-white/10 p-2 rounded-full text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-105"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX size={14} className="text-white/80" /> : <Volume2 size={14} className="text-primary" />}
              </button>

              {/* Center Playback Indicator (Shows briefly when paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300">
                  <div className="w-14 h-14 flex items-center justify-center text-black bg-primary rounded-full shadow-lg scale-100 hover:scale-105 transition-transform">
                    <Play className="w-5 h-5 ml-1" fill="currentColor" />
                  </div>
                </div>
              )}

              {/* Sleek Interactive Video Controller Bar (Hover or Mobile Tap) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-10 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                
                {/* Custom Progress Scrubber */}
                <div 
                  className="w-full h-1 bg-white/20 rounded-full cursor-pointer relative group/timeline"
                  onClick={handleProgressBarClick}
                >
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Scrub head */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover/timeline:opacity-100 transition-opacity duration-200 shadow-md"
                    style={{ left: `calc(${progress}% - 5px)` }}
                  />
                </div>

                {/* Left & Right Controls */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={togglePlay} 
                      className="hover:text-primary transition-colors p-1"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                    </button>
                    <span className="font-mono text-[10px] opacity-90 tracking-wider">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-primary/80 font-bold hidden sm:inline">
                      {activeClip.title}
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
