'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Menu, X } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

interface NavbarProps {
  onOpenTerminal?: () => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['about', 'education', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { number: '01.', name: 'About', href: '#about', id: 'about' },
    { number: '02.', name: 'Education', href: '#education', id: 'education' },
    { number: '03.', name: 'Experience', href: '#experience', id: 'experience' },
    { number: '04.', name: 'Projects', href: '#projects', id: 'projects' },
    { number: '05.', name: 'Skills', href: '#skills', id: 'skills' },
    { number: '06.', name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'h-[70px] bg-navy/95 backdrop-blur-md shadow-lg shadow-navy-dark/50'
            : 'h-[90px] sm:h-[100px] bg-transparent'
        } flex items-center px-6 sm:px-10 md:px-12`}
      >
        <nav className="w-full max-w-6xl mx-auto flex items-center justify-between">
          {/* Monogram Hexagon Logo */}
          <a
            href="#"
            className="group relative flex items-center justify-center w-10 h-10 transition-transform hover:scale-105"
            style={{ width: '40px', height: '40px' }}
            aria-label="Home"
          >
            <svg
              width="40"
              height="40"
              className="w-10 h-10 text-green transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(100,255,218,0.7)]"
              viewBox="0 0 84 96"
              fill="none"
            >
              <polygon
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="42,3 81,24 81,72 42,93 3,72 3,24"
              />
            </svg>
            <span className="absolute font-mono text-sm font-bold text-green group-hover:text-white transition-colors">
              {portfolioData.personal.monogram}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`transition-colors duration-200 py-2 ${
                  activeSection === link.id
                    ? 'text-green font-medium'
                    : 'text-slate-light hover:text-green'
                }`}
              >
                <span className="text-green mr-1">{link.number}</span>
                <span>{link.name}</span>
              </a>
            ))}

            {/* Developer CLI Trigger */}
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                title="Open Developer CLI (Cmd+K)"
                className="flex items-center gap-1.5 text-xs text-slate hover:text-green border border-navy-lightest hover:border-green/50 bg-navy-light/50 px-2.5 py-1.5 rounded transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-green" />
                <span className="text-[11px] text-slate-light">CLI &gt;</span>
              </button>
            )}

            {/* Resume Link */}
            <div className="flex items-center gap-2">
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2 px-4 text-xs font-mono"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 md:hidden">
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="p-2 text-green border border-navy-lightest rounded bg-navy-light"
                aria-label="Open Terminal"
              >
                <Terminal className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-green hover:text-white transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-navy-dark/80 backdrop-blur-sm z-50 md:hidden animate-fade-in transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu (Solid Opaque Container) */}
      <aside
        className={`fixed top-0 bottom-0 right-0 w-[min(80vw,340px)] bg-[#112240] shadow-2xl p-8 flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out md:hidden border-l border-navy-lightest overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile Navigation Drawer"
      >
        {/* Top Header in Drawer */}
        <div className="flex items-center justify-between pb-6 border-b border-navy-lightest/50">
          <span className="font-mono text-xs text-green font-semibold tracking-wider">
            NAVIGATION
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-slate hover:text-green rounded transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center gap-5 font-mono text-sm text-center w-full my-auto py-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-lightest hover:text-green py-2 transition-colors w-full"
            >
              <span className="text-green text-xs block mb-1">{link.number}</span>
              <span className="text-base font-semibold">{link.name}</span>
            </a>
          ))}

          {/* Resume CTA */}
          <div className="mt-4 w-full">
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full py-3.5 text-xs flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Footer in Drawer */}
        <div className="pt-4 border-t border-navy-lightest/50 text-center font-mono text-[11px] text-slate/70">
          <span>{portfolioData.personal.email}</span>
        </div>
      </aside>
    </>
  );
};
