import React, { useState } from 'react';
import { ArrowLeft, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const YOUTUBE_PROJECTS = [
  {
    id: 1,
    title: 'Podcast Episode 1',
    category: 'Podcast',
    youtubeId: 'R2ns15O_xPc',
    tags: ['Podcast Editing', 'Multi-Cam'],
    aspect: 'horizontal',
  },
  {
    id: 2,
    title: 'Podcast Episode 2',
    category: 'Podcast',
    youtubeId: 'LKFcsR3KR8k',
    tags: ['Color Grading', 'Sound Design'],
    aspect: 'horizontal',
  },
  {
    id: 3,
    title: 'Showcase Reel',
    category: 'Shorts/Reels',
    youtubeId: '-RS_g1B8mZU',
    tags: ['Motion Graphics', 'Sound Design'],
    aspect: 'vertical',
  },
  {
    id: 4,
    title: 'Shorts 2',
    category: 'Shorts/Reels',
    youtubeId: 'mxnKBjNArO4',
    tags: ['Hook Editing', 'Fast Cut'],
    aspect: 'vertical',
  },
  {
    id: 5,
    title: 'Shorts 1',
    category: 'Shorts/Reels',
    youtubeId: 'T9X9hjdNemE',
    tags: ['Transitions', 'Engagement'],
    aspect: 'vertical',
  },
  {
    id: 6,
    title: 'High-Converting VSL 1',
    category: 'Commercial / VSL',
    youtubeId: 'u3WDNYKcncQ',
    tags: ['Commercial', 'Corporate'],
    aspect: 'horizontal',
  },
  {
    id: 7,
    title: 'High-Converting VSL 2',
    category: 'Commercial / VSL',
    youtubeId: 'g_592Gu9--I',
    tags: ['Storytelling', 'Sales'],
    aspect: 'horizontal',
  },
  {
    id: 8,
    title: 'AI Content 1',
    category: 'AI Contents',
    youtubeId: '7wGegxBwwSE',
    tags: ['AI Generation', 'Digital Art'],
    aspect: 'vertical',
  },
  {
    id: 9,
    title: 'AI Content 2',
    category: 'AI Contents',
    youtubeId: '5TCuzOWfAh8',
    tags: ['Transitions', 'AI Editing'],
    aspect: 'vertical',
  },
  {
    id: 10,
    title: 'High-Converting VSL 3',
    category: 'Commercial / VSL',
    youtubeId: 'VjDJv2vqHKc',
    tags: ['Color Grading', 'Cinematic Flow'],
    aspect: 'horizontal',
  },
];

const FILTERS = ['All', 'Shorts/Reels', 'Commercial / VSL', 'Podcast', 'AI Contents'];

export default function YouTubeFallback() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);
  const [activeVideoCategory, setActiveVideoCategory] = useState<string | null>(null);

  const filteredProjects = activeFilter === 'All' 
    ? YOUTUBE_PROJECTS 
    : YOUTUBE_PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col">
      <div className="p-4 md:p-8 flex items-center justify-between border-b border-white/5">
        <Link to="/" className="flex items-center gap-2 text-text-muted hover:text-white transition-colors">
          <ArrowLeft size={20} />
          <span className="font-sans font-medium uppercase tracking-widest text-xs">Back to Main Site</span>
        </Link>
        <span className="font-sans font-medium uppercase tracking-widest text-[10px] text-white/40">
          YouTube Embedded Fallback
        </span>
      </div>

      <main className="flex-grow container-max section-padding">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="heading-lg mb-4 italic">
              YOUTUBE <span className="font-medium italic opacity-80">FALLBACK</span>
            </h1>
            <p className="text-body-lg text-text-muted max-w-xl">
              Having trouble viewing the high-quality source files on the main site? Browse the YouTube embedded versions of the portfolio here.
            </p>
          </div>

          <div className="flex gap-8 text-[11px] tracking-widest uppercase font-semibold opacity-60">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`hover:opacity-100 transition-opacity ${
                  activeFilter === filter ? 'border-b border-primary pb-1 text-primary opacity-100' : 'pb-1 text-text-main'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredProjects.map((project) => (
            <article 
              key={project.id} 
              onClick={() => {
                setActiveYoutubeId(project.youtubeId);
                setActiveVideoCategory(project.category);
              }}
              className={`group cursor-pointer flex flex-col gap-4 ${
                project.aspect === 'vertical' ? 'md:col-span-4' : 'md:col-span-6'
              }`} 
            >
              <div className={`relative w-full overflow-hidden bg-neutral-900 transition-transform duration-500 ease-out ${
                project.aspect === 'vertical' ? 'aspect-square md:aspect-[4/5]' : 'aspect-[16/9]'
              }`}>
                <img 
                  src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                  alt={project.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out"
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
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 flex items-center justify-center text-white bg-black/40 backdrop-blur-sm rounded-full">
                    <Play className="w-4 h-4 ml-1" fill="currentColor" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10 pointer-events-none">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-sans font-bold uppercase tracking-widest bg-black/70 backdrop-blur-md text-white/90 px-3 py-1.5 rounded-sm border border-white/10 shadow-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-medium tracking-wide text-white group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Video Player Modal */}
      {activeYoutubeId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background/95 backdrop-blur-sm transition-opacity duration-300">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => {
              setActiveYoutubeId(null);
              setActiveVideoCategory(null);
            }} 
          />
          <div className={`relative w-full flex items-center justify-center bg-black shadow-2xl transition-all duration-300 mx-auto ${
            activeVideoCategory === 'Shorts/Reels' || activeVideoCategory === 'AI Contents'
              ? 'max-w-[400px] max-h-[85vh] aspect-[9/16]' 
              : 'max-w-5xl max-h-[85vh] aspect-video'
          }`}>
            <button 
              className="absolute -top-10 right-0 md:-right-10 md:top-0 z-10 p-2 text-text-muted hover:text-white transition-colors"
              onClick={() => {
                setActiveYoutubeId(null);
                setActiveVideoCategory(null);
              }}
            >
              <X size={28} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&cc_load_policy=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
