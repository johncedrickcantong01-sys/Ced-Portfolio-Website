import React from 'react';
import { ArrowRight, Mail, MapPin, Instagram, Linkedin, Video } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-padding container-max">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Col: Header & Form */}
        <div className="lg:col-span-8 pr-0 lg:pr-12">
          <div className="mb-16">
            <h2 className="heading-lg mb-6">
              Let's streamline your <br/>
              <span className="text-primary">video pipeline.</span>
            </h2>
            <p className="text-body-lg text-text-muted max-w-xl !opacity-80">
              Let's look at your current workflow and see how we can scale your asset output without babysitting the timeline.
            </p>
          </div>

          <div className="pt-4 pb-12 lg:pb-0">
            <a href="https://calendly.com/johncedrickcantong01/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-black font-sans text-[11px] font-bold tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:bg-gray-200 group w-full md:w-auto max-w-md">
              Check Availability
              <ArrowRight size={14} className="ml-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Col: Info Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-16 lg:pl-12 lg:border-l border-border/50">
          
          <div>
            <h3 className="text-label text-text-muted mb-6">Direct Contact</h3>
            <a href="mailto:johncedrickcantong01@gmail.com" className="heading-md hover:text-primary transition-colors break-all block mb-4">
              johncedrick<wbr/>cantong01<br/>@gmail.com
            </a>
            <p className="flex items-center gap-3 text-body-lg text-text-muted">
              <MapPin size={20} className="text-primary flex-shrink-0" />
              Metro Manila, Philippines
            </p>
          </div>

          <div>
            <h3 className="text-label text-text-muted mb-6">Socials</h3>
            <div className="flex flex-col gap-6">
              <a href="https://www.tiktok.com/@ceditsmedia/" target="_blank" rel="noopener noreferrer" className="heading-md flex items-center justify-between group hover:text-primary transition-colors">
                TikTok
                <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
              </a>
              <a href="https://www.instagram.com/cedits.media/" target="_blank" rel="noopener noreferrer" className="heading-md flex items-center justify-between group hover:text-primary transition-colors">
                Instagram
                <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
              </a>
              <a href="https://www.linkedin.com/in/john-cedrick-cantong-3284392a4/" target="_blank" rel="noopener noreferrer" className="heading-md flex items-center justify-between group hover:text-primary transition-colors">
                LinkedIn
                <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
