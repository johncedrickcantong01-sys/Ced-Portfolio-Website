import React, { useState } from 'react';
import { Film, Clock, Award, Clapperboard, Layers, Scissors, PenTool, Sparkles, Zap, Atom, Shapes } from 'lucide-react';
// @ts-ignore
import myPhoto from '../../1760680944153.jpeg_2K_202607030135.jpeg';

// @ts-ignore
import finalcutproIcon from '../../apps-icon/finalcutpro.png';
// @ts-ignore
import appleMotionIcon from '../../apps-icon/applemotion.image.large_2x.png';
// @ts-ignore
import affinityIcon from '../../apps-icon/affinity-studio-icon.png.webp';
// @ts-ignore
import higgsfieldIcon from '../../apps-icon/higgsfield-logo-png_seeklogo-660244.png';
// @ts-ignore
import notionIcon from '../../apps-icon/Notion_app_logo.png';
// @ts-ignore
import hermesIcon from '../../apps-icon/hermesagent.png';
// @ts-ignore
import remotionIcon from '../../apps-icon/Remotion-Video-Logo-Vector.svg-.png';
// @ts-ignore
import freeformIcon from '../../apps-icon/Freeform.png';

const tools = [
  {
    name: 'Final Cut Pro',
    iconSrc: finalcutproIcon,
    description: "My core workspace for high-speed timeline editing, precise cuts, and dialing in the perfect video pacing."
  },
  {
    name: 'Apple Motion',
    iconSrc: appleMotionIcon,
    description: "Where I design custom kinetic typography and subtle visual assets to keep the viewer's eyes locked onto the screen."
  },
  {
    name: 'Canva Affinity',
    iconSrc: affinityIcon,
    description: "My design ecosystem for quickly knocking out frame mockups, styling high-res vector graphics, and building clean visual assets."
  },
  {
    name: 'Higgsfield AI',
    iconSrc: higgsfieldIcon,
    description: "My secret weapon for generating cinematic B-roll ideas and blending hyper-realistic AI effects directly into real footage."
  },
  {
    name: 'Notion',
    iconSrc: notionIcon,
    description: "The ultimate dashboard for mapping concepts, tracking notes, and running production calendars."
  },
  {
    name: 'Hermes Agent',
    iconSrc: hermesIcon,
    description: "My autonomous assistant that learns my editing style and handles routine organization."
  },
  {
    name: 'Remotion',
    iconSrc: remotionIcon,
    description: "A powerful engineering tool that lets me programmatically code, automate, and render complex template layouts at scale."
  },
  {
    name: 'Freeform',
    iconSrc: freeformIcon,
    description: "An infinite digital canvas to brain-dump ideas, map storyboards, and nail down the story arc."
  }
];

export default function About() {
  const [activeDescriptionIndex, setActiveDescriptionIndex] = useState<number | null>(null);

  return (
    <section id="about" className="section-padding container-max bg-surface mt-16 border-y border-border/50">
      
      {/* Intro Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32 items-center">
        
        {/* Image */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative aspect-[3/4] w-full border border-border overflow-hidden group">
            <img 
              src={myPhoto} 
              alt="Editor Portrait" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            {/* ID Badge overlay */}
            <div className="absolute bottom-6 left-6 flex gap-2">
              <span className="bg-surface/90 backdrop-blur border border-border text-text-main px-4 py-2 text-label">
                CED CANTONG
              </span>
              <span className="bg-primary text-background px-4 py-2 text-label font-bold">
                EDITOR
              </span>
            </div>
          </div>
        </div>

        {/* Bio Text */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <h2 className="heading-lg mb-8 uppercase">ENGINEERED POST-PRODUCTION</h2>
          
          <div className="space-y-6 mb-12">
            <p className="font-body text-sm leading-relaxed text-[#E0E0E0] font-light">
              I don't just cut footage; I build reliable content pipelines. I bridge the gap between heavy production and platform-ready distribution.
            </p>
            <p className="font-body text-sm leading-relaxed text-[#E0E0E0] font-light">
              By streamlining the post-production workflow, I help creative leaders and high-volume media teams scale their video output without babysitting the timeline.
            </p>
          </div>

          {/* Software stack */}
          <div className="mt-12">
            <div 
              className="relative w-full max-w-3xl h-[72px] group/dock"
              style={{ clipPath: 'inset(-150px 0px -50px 0px)' }}
            >
              {/* Visual Dock Background (macOS style glass) */}
              <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-3xl shadow-2xl z-0" />
              
              {/* Left and Right Fade Masks inside the dock bounds for smooth entry/exit */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none rounded-l-3xl" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none rounded-r-3xl" />
              
              <div className="absolute inset-0 flex items-center z-20">
                <div className="flex gap-2 animate-marquee-infinite px-12 items-center h-full w-max">
                  {/* 2x duplication for perfect seamless infinite looping */}
                  {[...tools, ...tools].map((tool, index) => (
                    <div 
                      key={index} 
                      className="group relative flex flex-col items-center justify-center h-full px-3 z-10 hover:z-30"
                      onMouseLeave={() => setActiveDescriptionIndex(null)}
                    >
                      {/* Tooltip / Name Banner - macOS style */}
                      <div className={`absolute bottom-[115px] opacity-0 scale-90 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-2 bg-[#2A2A2A]/90 backdrop-blur-md border border-white/10 text-[#E0E0E0] text-[12px] font-sans py-1.5 px-4 rounded-[10px] shadow-2xl z-50 flex flex-col items-center ${activeDescriptionIndex === index ? 'w-[280px] whitespace-normal' : 'whitespace-nowrap tracking-wide'}`}>
                        {activeDescriptionIndex === index ? (
                          <div className="text-center px-1 py-1">
                            <span className="font-bold block mb-1 text-primary tracking-wide">{tool.name}</span>
                            <span className="font-light text-[11px] leading-relaxed text-white/90">{tool.description}</span>
                          </div>
                        ) : (
                          tool.name
                        )}
                        {/* Triangle pointer */}
                        <svg className="absolute top-[98%] text-[#2A2A2A]/90 w-3 h-2 drop-shadow-md" viewBox="0 0 10 5" fill="currentColor">
                          <polygon points="0,0 5,5 10,0" />
                        </svg>
                      </div>
                      
                      {/* Tool Icon wrapper */}
                      <div 
                        className="relative w-14 h-14 flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-[1.6] group-hover:-translate-y-4 cursor-pointer origin-bottom"
                        onClick={() => setActiveDescriptionIndex(activeDescriptionIndex === index ? null : index)}
                      >
                        <img 
                          src={tool.iconSrc} 
                          alt={tool.name}
                          className="w-full h-full object-contain drop-shadow-xl"
                        />
                      </div>
                      
                      {/* macOS dock dot (optional dot below app) */}
                      <div className="absolute bottom-1 w-1 h-1 rounded-full bg-white/40 transition-all duration-300 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Brutalist Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        {[
          { icon: <Film size={32} />, number: '700+', label: 'Videos Delivered', subtext: null },
          { icon: <Clock size={32} />, number: '24h', label: 'Standard Turnaround', subtext: null },
          { 
            icon: <Award size={32} />, 
            number: '2+ Years', 
            label: 'Experience', 
            subtext: (
              <p className="text-xs text-text-muted mt-3">
                trusted by{' '}
                <a 
                  href="https://www.linkedin.com/company/socialsharings/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline font-medium hover:text-primary-light transition-colors"
                >
                  SocialSharings
                </a>
              </p>
            )
          },
        ].map((stat, i) => (
          <div key={i} className="bg-background border border-border p-10 flex flex-col justify-between min-h-[240px] hover:border-primary transition-colors group">
            <div className="text-primary mb-8 transform group-hover:scale-110 transition-transform origin-left">
              {stat.icon}
            </div>
            <div>
              <h3 className="heading-lg mb-2">{stat.number}</h3>
              <p className="text-label text-text-muted !opacity-70">{stat.label}</p>
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Process Section */}
      <div>
        <h2 className="heading-md mb-16 pb-6 border-b border-border uppercase tracking-wide">The Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="relative">
            <span className="text-primary text-label mb-6 block">01 | ASSET INGESTION</span>
            <h3 className="heading-md mb-4">Smart & Fast Prep.</h3>
            <p className="text-body-lg text-text-muted !opacity-80">
              I use AI tools to instantly transcribe and organize your footage the second it lands. Skipping the boring manual sorting means we get straight to the actual strategy without wasting a single day.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="relative">
            <span className="text-primary text-label mb-6 block">02 | PIPELINE EXECUTION</span>
            <h3 className="heading-md mb-4">Editing with Focus.</h3>
            <p className="text-body-lg text-text-muted !opacity-80">
              I let AI tackle the tedious grunt work—like rough assembly cuts and tracking. Offloading those repetitive steps completely frees up my brain, giving me way more time to perfect the pacing, storytelling, and scroll-stopping hooks.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="relative">
            <span className="text-primary text-label mb-6 block">03 | FINAL QA & DELIVERY</span>
            <h3 className="heading-md mb-4">Polished & Out the Door.</h3>
            <p className="text-body-lg text-text-muted !opacity-80">
              Every video gets a strict final check for flawless audio, clean color, and exact platform specs. You get premium, ready-to-post content delivered directly to your team right on schedule.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
