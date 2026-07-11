import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Template data for projects with interactive video URLs
const PROJECTS = [
  // Podcast
  {
    id: 1,
    title: 'Cases 4 Causes S3E1',
    category: 'Podcast',
    image: '',
    youtubeId: '',
    tags: ['Podcast Editing', 'Multi-Cam'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/16x9%20C4C%20Podcast%20S3E1%200001-HD%201080p.mp4',
    aspect: 'horizontal',
    highlight: true,
  },
  {
    id: 2,
    title: 'Cases 4 Causes Trailer',
    category: 'Podcast',
    image: '',
    youtubeId: '',
    tags: ['Trailer', 'Sound Design'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/Trailer%20Landon%20-%20Cases%204%20Causes%20Podcast%20E2-HD%201080p.mp4',
    aspect: 'horizontal',
    highlight: false,
  },
  
  // Shorts/Reels
  {
    id: 11,
    title: 'Cases 4 Causes Podcast Clip',
    category: 'Shorts/Reels',
    image: '',
    youtubeId: '',
    tags: ['Podcast Clip', 'Talking Head'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/9x16%20C4C%20Podcast%20S3E1%200001-HD%201080p.mov',
    aspect: 'vertical',
    highlight: false,
  },
  {
    id: 10,
    title: 'Talking Head Clean Edit',
    category: 'Shorts/Reels',
    image: '',
    youtubeId: '',
    tags: ['Talking Head', 'Clean Edit'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/TT%20sample%20edit%204(1).mp4',
    aspect: 'vertical',
    highlight: false,
  },
  {
    id: 3,
    title: 'Ced Showcase Reel',
    category: 'Shorts/Reels',
    image: '',
    youtubeId: '',
    tags: ['3D Graphics', 'Animation'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/Sample%20Edit%20%231-HD%201080p.mp4',
    aspect: 'vertical',
    highlight: true,
  },
  {
    id: 4,
    title: 'AI Talking Head',
    category: 'Shorts/Reels',
    image: '',
    youtubeId: '',
    tags: ['AI Gen', 'Talking Head'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/AI%20Talking%20Head-HD%201080p.mp4',
    aspect: 'vertical',
    highlight: true,
  },
  {
    id: 5,
    title: 'MMA Action Cut',
    category: 'Shorts/Reels',
    image: '',
    youtubeId: '',
    tags: ['Action', 'B-Rolls'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/MMA-HD%201080p.mp4',
    aspect: 'vertical',
    highlight: false,
  },

  // Commercial / VSL
  {
    id: 6,
    title: 'Sophie Feb Ad',
    category: 'Commercial / VSL',
    image: '',
    youtubeId: '',
    tags: ['Commercial', 'Corporate'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/16x9%20Sophie%20Feb.%202025%20AD%235-HD%201080p.mp4',
    aspect: 'horizontal',
    highlight: true,
  },
  {
    id: 7,
    title: 'Shane Test Ad',
    category: 'Commercial / VSL',
    image: '',
    youtubeId: '',
    tags: ['Storytelling', 'Sales'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/Shane%20Ads%20(TEST%20AD%201_Video%232)-HD%201080p.mp4',
    aspect: 'horizontal',
    highlight: false,
  },

  // AI Contents
  {
    id: 8,
    title: 'AI Talking Head Demo',
    category: 'AI Content',
    image: '',
    youtubeId: '',
    tags: ['AI', 'Talking Head'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/AI%20Talking%20Head-HD%201080p.mp4',
    aspect: 'vertical',
    highlight: true,
  },
  {
    id: 9,
    title: 'Speedramp C2',
    category: 'AI Content',
    image: '',
    youtubeId: '',
    tags: ['Speedramp', 'VFX'],
    videoUrl: 'https://pub-8f59952f7b104dadbca9bf6c3003b9d6.r2.dev/C2%20Speedramp-HD%201080p.mp4',
    aspect: 'vertical',
    highlight: false,
  }
];

// Helper to check if the video URL is a direct media file (e.g., Backblaze B2, MP4, WebM)
const isDirectVideo = (url: string | null): boolean => {
  if (!url) return false;
  const lowercase = url.toLowerCase();
  return (
    lowercase.endsWith('.mp4') || 
    lowercase.endsWith('.webm') || 
    lowercase.endsWith('.mp4') || 
    lowercase.endsWith('.m4v') ||
    lowercase.includes('backblazeb2.com') ||
    (!lowercase.includes('youtube.com') && !lowercase.includes('youtu.be') && !lowercase.includes('embed'))
  );
};

const FILTERS = ['Featured', 'Shorts/Reels', 'Commercial / VSL', 'Podcast', 'AI Content'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Featured');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoCategory, setActiveVideoCategory] = useState<string | null>(null);

  let filteredProjects = PROJECTS;
  if (activeFilter === 'Featured') {
    const featuredOrder = [4, 3, 5, 2, 6];
    filteredProjects = featuredOrder.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean) as typeof PROJECTS;
  } else {
    filteredProjects = PROJECTS.filter(p => p.category === activeFilter);
  }

  return (
    <section id="projects" className="section-padding container-max">
      
      {/* Header & Filters in Stacked Layout */}
      <div className="flex flex-col items-start gap-8 mb-16">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-semibold mb-2 block">Portfolio Index</span>
          <h2 className="heading-lg mb-4 italic">
            SELECTED <span className="font-medium italic opacity-80">WORKS</span>
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl">
            A curated collection of recent edits, commercial spots, podcasts, short-form reels, and AI content. Precision cut for maximum impact.
          </p>
        </div>

        {/* Filter Buttons - Stacked & Left Aligned with Flex Wrap for mobile safety */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] tracking-widest uppercase font-semibold opacity-70">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`hover:opacity-100 transition-opacity whitespace-nowrap ${
                activeFilter === filter ? 'border-b border-primary pb-1 text-primary opacity-100' : 'pb-1 text-text-main hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-12 w-full ${activeFilter === 'Featured' ? 'gap-3 md:gap-4' : 'gap-6 md:gap-8'}`}>
        {filteredProjects.map((project, index) => {
          // Dynamic collage layout column spans
          let gridClasses = "col-span-12";
          
          if (activeFilter === 'Featured') {
            // Replicate the masonry/grid pattern from the screenshot:
            // Row 1: 3 items (4 cols each)
            // Row 2: 2 items (6 cols each)
            // Row 3: 3 items (4 cols each)
            // Row 4: 2 items (6 cols each)
            // ...and so on
            const patternIndex = index % 5;
            if (patternIndex === 0 || patternIndex === 1 || patternIndex === 2) {
              gridClasses = "col-span-12 md:col-span-4";
            } else {
              gridClasses = "col-span-12 md:col-span-6";
            }
          } else {
            // Default layout for other tabs
            if (project.aspect === 'horizontal') {
              gridClasses = "col-span-12 sm:col-span-6";
            } else {
              gridClasses = "col-span-12 sm:col-span-4";
            }
          }

          return (
            <article 
              key={project.id} 
              onClick={() => {
                if (project.videoUrl) {
                  setActiveVideoUrl(project.videoUrl);
                  setActiveVideoCategory(project.category);
                }
              }}
              className={`group cursor-pointer flex flex-col gap-4 ${gridClasses}`} 
            >
              {/* Image Container */}
              <div className={`relative w-full overflow-hidden bg-neutral-900 transition-transform duration-500 ease-out ${
                project.aspect === 'vertical' ? 'aspect-[9/16]' : 'aspect-[16/9]'
              }`}>
                {isDirectVideo(project.videoUrl) ? (
                  <video 
                    src={`${project.videoUrl}#t=0.001`} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out"
                    preload="metadata"
                    muted
                    playsInline
                    loop
                    onMouseEnter={(e) => {
                      e.currentTarget.play().catch(() => {});
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                    }}
                  />
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('maxresdefault.jpg')) {
                        target.src = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
                      } else if (target.src.includes('hqdefault.jpg')) {
                        target.src = `https://img.youtube.com/vi/${project.youtubeId}/0.jpg`;
                      }
                    }}
                  />
                )}
                
                {/* Play Overlay (Center) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 flex items-center justify-center text-white bg-black/40 backdrop-blur-sm rounded-full">
                    <Play className="w-4 h-4 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Tags Overlay */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10 pointer-events-none">
                  {project.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-sans font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md text-white/90 px-3 py-1.5 rounded-sm border border-white/10 shadow-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <p className="text-text-muted text-sm mb-4 max-w-md mx-auto">
          Videos not playing on your mobile device? 
        </p>
        <Link 
          to="/fallback" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all border border-white/10 hover:border-white/20"
        >
          View YouTube Version
        </Link>
      </div>

      {/* Video Player Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background/95 backdrop-blur-sm transition-opacity duration-300">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => {
              setActiveVideoUrl(null);
              setActiveVideoCategory(null);
            }} 
          />
          <div className={`relative w-full flex items-center justify-center bg-black shadow-2xl transition-all duration-300 mx-auto ${
            activeVideoCategory === 'Shorts/Reels' || activeVideoCategory === 'AI Content'
              ? 'max-w-[400px] max-h-[85vh] aspect-[9/16]' 
              : 'max-w-5xl max-h-[85vh] aspect-video'
          }`}>
            <button 
              className="absolute -top-10 right-0 md:-right-10 md:top-0 z-10 p-2 text-text-muted hover:text-white transition-colors"
              onClick={() => {
                setActiveVideoUrl(null);
                setActiveVideoCategory(null);
              }}
            >
              <X size={28} />
            </button>
            {isDirectVideo(activeVideoUrl) ? (
              <video
                ref={(el) => {
                  if (el && el.paused) {
                    const p = el.play();
                    if (p !== undefined) {
                      p.catch(() => {});
                    }
                  }
                }}
                src={activeVideoUrl}
                autoPlay
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={`${activeVideoUrl}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&cc_load_policy=0`}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        </div>
      )}

    </section>
  );
}
