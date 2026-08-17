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

  // Lock mobile body scroll when full-screen menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
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
            ? 'h-[70px] bg-[#0a192f]/95 backdrop-blur-md shadow-lg shadow-navy-dark/50'
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

      {/* Full-Screen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto"
          style={{ backgroundColor: '#0a192f' }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Top Bar: Monogram Logo & Close Button */}
          <div className="flex items-center justify-between w-full pb-4 border-b border-[#233554]/60">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-green">
                {portfolioData.personal.monogram}
              </span>
              <span className="font-mono text-xs text-slate-light">/ navigation</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-light hover:text-green rounded-lg transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-7 h-7 text-green" />
            </button>
          </div>

          {/* Centered Navigation Links with Large Touch Targets */}
          <div className="flex flex-col items-center justify-center gap-5 my-auto py-6 w-full">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center py-2 w-full max-w-xs transition-transform active:scale-95 group"
              >
                <span className="font-mono text-green text-xs tracking-widest mb-0.5">
                  {link.number}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-slate-lightest group-hover:text-green transition-colors">
                  {link.name}
                </span>
              </a>
            ))}

            {/* Resume Button */}
            <div className="mt-4 w-full max-w-xs">
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full py-3.5 text-sm font-mono flex items-center justify-center gap-2 shadow-xl"
              >
                <FileText className="w-4 h-4" />
                <span>Resume (Google Drive)</span>
              </a>
            </div>
          </div>

          {/* Bottom Footer: Direct Email Link */}
          <div className="pt-4 border-t border-[#233554]/60 text-center font-mono text-xs text-slate">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green transition-colors"
            >
              {portfolioData.personal.email}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
