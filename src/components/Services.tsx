import React from 'react';
import { Scissors, Video, Palette } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="section-padding container-max border-b border-border/50">
      
      {/* Services Header */}
      <div className="flex flex-col items-center text-center mb-24">
        <span className="text-label text-primary mb-4 block">Capabilities</span>
        <h2 className="heading-lg max-w-[1100px] mx-auto leading-[1.15]">
          Turnkey post-production for episodic shows, direct-response video sales letters, and retention-optimized social clips. Built for consistency and scale.
        </h2>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Episodic Shows / Podcasts */}
        <div className="bg-white/5 border border-white/10 p-10 flex flex-col hover:border-white/40 transition-colors group">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-8 text-text-main group-hover:bg-primary group-hover:text-background transition-colors">
            <Video size={28} />
          </div>
          <h3 className="heading-md mb-4">Episodic Shows / Podcasts</h3>
          <p className="text-body-lg text-text-muted mb-8 flex-grow">
            Multi-camera switching, professional audio leveling, and dynamic master delivery for video podcasts. Built for absolute consistency and scale.
          </p>
        </div>

        {/* Column 2: Direct-Response VSLs */}
        <div className="bg-white/5 border border-white/10 p-10 flex flex-col hover:border-white/40 transition-colors group">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-8 text-text-main group-hover:bg-primary group-hover:text-background transition-colors">
            <Palette size={28} />
          </div>
          <h3 className="heading-md mb-4">Direct-Response VSLs</h3>
          <p className="text-body-lg text-text-muted mb-8 flex-grow">
            High-converting Video Sales Letters and commercials. Meticulously structured around proven direct-response scripts to maximize audience action.
          </p>
        </div>

        {/* Column 3: Short-Form Social Assets */}
        <div className="bg-white/5 border border-white/10 p-10 flex flex-col hover:border-white/40 transition-colors group">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-8 text-text-main group-hover:bg-primary group-hover:text-background transition-colors">
            <Scissors size={28} />
          </div>
          <h3 className="heading-md mb-4">Short-Form Social Assets</h3>
          <p className="text-body-lg text-text-muted mb-8 flex-grow">
            Punchy, high-retention clips optimized for TikTok, Instagram Reels, and YouTube Shorts. Designed with visual hooks and dynamic captions to keep eyes on screen.
          </p>
        </div>
      </div>
    </section>
  );
}
