import React from 'react';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-start text-left container-max pt-32 pb-16">
      
      {/* Availability Indicator */}
      <div className="flex items-center gap-3 mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-label text-text-main">Available for Q3 Freelance Projects & Retainers</span>
      </div>

      {/* Main Headline */}
      <h1 className="heading-xl text-text-main max-w-5xl mb-8 leading-[0.85]">
        High-Retention Editing for Multi-Format <br/><span className="text-transparent" style={{ WebkitTextStroke: '1px var(--color-primary)' }}>Video Pipelines</span><span className="text-primary">.</span>
      </h1>

      {/* Subheadline */}
      <p className="text-body-lg text-text-muted !opacity-80 max-w-2xl mb-12" style={{ borderColor: '#ffffff' }}>
        I turn raw footage into polished podcasts, high-converting VSLs, and scroll-stopping social clips. Smooth editing, engaging pacing, and stress-free delivery to keep your content moving.
      </p>

      {/* CTA */}
      <a href="#projects" className="btn-primary group">
        View Showreel
        <Play size={14} className="ml-4 group-hover:translate-x-1 transition-transform" fill="currentColor" />
      </a>

    </section>
  );
}
