import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16 bg-background">
      <div className="container-max py-12 flex flex-col md:flex-row justify-between items-end gap-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase opacity-40 mb-1 font-sans font-semibold tracking-widest">Availability</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-[10px] font-medium tracking-wide uppercase text-text-main">Open for Projects</span>
            </div>
          </div>
          <div className="hidden md:block h-8 w-px bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase opacity-40 mb-1 font-sans font-semibold tracking-widest">Brand</span>
            <span className="text-[10px] font-medium uppercase text-text-main">CED CANTONG</span>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-8 items-center">
          <div className="flex gap-4 text-[11px] font-medium uppercase text-text-main font-sans tracking-widest">
            <a href="https://www.instagram.com/cedits.media/" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">IG</a>
            <a href="https://www.linkedin.com/in/john-cedrick-cantong-3284392a4/" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">LI</a>
            <a href="https://www.tiktok.com/@ceditsmedia/" target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">TK</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
