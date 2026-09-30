import React, { useState, useRef } from 'react';
import { DESIGNER_INFO } from '../data/portfolioData';
import { ArrowUpRight, Mail, Instagram, Linkedin, Sparkles, Send, Check } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Collection Inquiry', message: '' });

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setMagneticOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(DESIGNER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24 px-6 sm:px-12 max-w-6xl mx-auto flex flex-col justify-between relative z-10 text-[#36242B]">
      <div>
        {/* Page Tag */}
        <div className="inline-flex items-center space-x-2 text-[10.5px] tracking-[0.3em] uppercase text-[#4D2E3C] font-semibold mb-6">
          <Sparkles size={12} className="text-[#007BA7]" />
          <span>ATELIER COMMISSIONS & INQUIRIES</span>
        </div>

        {/* Big Editorial Heading */}
        <div className="border-b border-[#36242B]/15 pb-12 mb-16">
          <h1 className="font-serif-luxury text-6xl sm:text-8xl lg:text-9xl text-[#36242B] font-light leading-[0.9] tracking-tight">
            LET’S CREATE<br />
            <span className="italic font-light text-[#007BA7]">TOGETHER</span>
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <p className="font-serif-luxury text-2xl sm:text-3xl text-[#36242B] font-normal tracking-wide">
                POUSHALI MAJI
              </p>
              <p className="text-xs tracking-[0.3em] uppercase text-[#4D2E3C] font-semibold">
                FASHION DESIGNER · INDUS UNIVERSITY
              </p>
            </div>
            <p className="text-xs text-[#36242B]/75 max-w-sm font-light">
              Available for bespoke runway tailoring, creative direction, artisanal textile collaborations, and couture consultations.
            </p>
          </div>
        </div>

        {/* Contact Links & Magnetic Interaction Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Links & Magnetic Button */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#007BA7] font-semibold block">
                DIRECT CHANNELS
              </span>

              {/* Email Copier */}
              <div
                onClick={copyEmail}
                className="group cursor-pointer p-6 bg-[#FAF5E8]/90 hover:bg-[#FAF5E8] border border-[#36242B]/15 hover:border-[#4D2E3C] rounded-sm shadow-[0_8px_24px_rgba(54,36,43,0.05)] hover:shadow-[0_12px_32px_rgba(54,36,43,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between relative overflow-hidden"
              >
                <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#4D2E3C]/40 pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#4D2E3C]/40 pointer-events-none" />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[10px] tracking-widest uppercase text-[#007BA7] font-medium">
                    <Mail size={12} className="text-[#4D2E3C]" />
                    <span>DIRECT INBOX</span>
                  </div>
                  <p className="font-serif-luxury text-xl sm:text-2xl text-[#36242B] group-hover:text-[#007BA7] transition-colors">
                    {DESIGNER_INFO.email}
                  </p>
                </div>
                <div className="p-2 rounded-full border border-[#36242B]/20 group-hover:border-[#007BA7] text-[#007BA7]">
                  {copiedEmail ? <Check size={16} className="text-emerald-700" /> : <ArrowUpRight size={16} />}
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`https://${DESIGNER_INFO.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-[#FAF5E8]/90 border border-[#36242B]/15 hover:border-[#4D2E3C] rounded-sm shadow-xs hover:shadow-sm hover:-translate-y-0.5 group transition-all duration-300"
              >
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-[#4D2E3C] font-semibold mb-1">
                  <span>INSTAGRAM</span>
                  <Instagram size={12} />
                </div>
                <p className="text-xs text-[#36242B] font-medium truncate">@poushali.maji</p>
              </a>

              <a
                href={`https://${DESIGNER_INFO.behance}`}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-[#FAF5E8]/90 border border-[#36242B]/15 hover:border-[#4D2E3C] rounded-sm shadow-xs hover:shadow-sm hover:-translate-y-0.5 group transition-all duration-300"
              >
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-[#4D2E3C] font-semibold mb-1">
                  <span>BEHANCE</span>
                  <ArrowUpRight size={12} />
                </div>
                <p className="text-xs text-[#36242B] font-medium truncate">poushalimaji</p>
              </a>

              <a
                href={`https://${DESIGNER_INFO.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-[#FAF5E8]/90 border border-[#36242B]/15 hover:border-[#4D2E3C] rounded-sm shadow-xs hover:shadow-sm hover:-translate-y-0.5 group transition-all duration-300"
              >
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-[#4D2E3C] font-semibold mb-1">
                  <span>LINKEDIN</span>
                  <Linkedin size={12} />
                </div>
                <p className="text-xs text-[#36242B] font-medium truncate">poushali-maji</p>
              </a>
            </div>

            {/* MAGNETIC INTERACTIVE CONTACT BUTTON */}
            <div className="pt-4 flex items-center">
              <button
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={copyEmail}
                className="relative group p-8 rounded-full bg-[#007BA7] text-[#FAF5E8] border-2 border-[#4D2E3C] shadow-xl flex flex-col items-center justify-center text-center transition-all duration-150 ease-out focus:outline-hidden cursor-pointer"
                style={{
                  transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
                  boxShadow: isHovered
                    ? '0 0 30px rgba(0, 123, 167, 0.4), 0 20px 30px rgba(77, 46, 60, 0.4)'
                    : '0 10px 25px rgba(77, 46, 60, 0.25)',
                }}
              >
                {/* Glow aura */}
                <div
                  className={`absolute -inset-4 rounded-full bg-radial from-[#007BA7]/30 via-[#4D2E3C]/20 to-transparent blur-lg transition-opacity duration-300 pointer-events-none ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <Sparkles size={16} className="text-[#FAF5E8] mb-1 animate-pulse" />
                <span className="font-serif-luxury text-lg tracking-[0.15em] uppercase font-light">
                  {copiedEmail ? 'EMAIL COPIED!' : 'INITIATE DIALOGUE'}
                </span>
                <span className="text-[9px] tracking-widest text-[#FAF5E8]/80 uppercase mt-0.5">
                  CLICK TO COPY CONTACT
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Atelier Inquiry Form */}
          <div className="lg:col-span-6 bg-[#FAF5E8]/90 backdrop-blur-[2px] p-8 sm:p-10 rounded-sm border border-[#36242B]/15 shadow-[0_16px_40px_rgba(54,36,43,0.06)] relative overflow-hidden">
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#4D2E3C]/40 pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#4D2E3C]/40 pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#4D2E3C]/40 pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#4D2E3C]/40 pointer-events-none" />

            <span className="text-[10px] tracking-[0.3em] uppercase text-[#007BA7] font-semibold block mb-2">
              SEND AN ATELIER DISPATCH
            </span>
            <h3 className="font-serif-luxury text-3xl text-[#36242B] font-light mb-6">
              Studio Inquiry Form
            </h3>

            {formSent ? (
              <div className="p-8 bg-[#FAF5E8]/50 border border-[#36242B]/20 rounded-xs text-center space-y-3">
                <Check size={28} className="mx-auto text-[#007BA7]" />
                <h4 className="font-serif-luxury text-2xl text-[#36242B]">Inquiry Recorded</h4>
                <p className="text-xs text-[#36242B]/75 font-light leading-relaxed">
                  Thank you for reaching out to Poushali Maji. Your dispatch has been prepared and your email recorded. We will respond promptly.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="text-[10px] tracking-widest uppercase text-[#007BA7] underline cursor-pointer"
                >
                  SEND ANOTHER DISPATCH
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest uppercase text-[#36242B]/75">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full p-3 bg-[#FAF5E8] border border-[#36242B]/20 focus:border-[#007BA7] rounded-xs outline-hidden text-[#36242B] placeholder-[#36242B]/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest uppercase text-[#36242B]/75">YOUR EMAIL</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@atelier.com"
                      className="w-full p-3 bg-[#FAF5E8] border border-[#36242B]/20 focus:border-[#007BA7] rounded-xs outline-hidden text-[#36242B] placeholder-[#36242B]/40"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest uppercase text-[#36242B]/75">NATURE OF INQUIRY</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 bg-[#FAF5E8] border border-[#36242B]/20 focus:border-[#007BA7] rounded-xs outline-hidden text-[#36242B]"
                  >
                    <option value="Collection Inquiry">Runway & Collection Inquiry</option>
                    <option value="Bespoke Commission">Bespoke Couture Commission</option>
                    <option value="Textile Collaboration">Textile & Artisanal Collaboration</option>
                    <option value="Press / Editorial">Press, Styling & Editorial Loan</option>
                    <option value="Academic / Lecture">Academic & Workshop Engagement</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest uppercase text-[#36242B]/75">MESSAGE / BRIEF</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your silhouette ideas, project scope, or timeline..."
                    className="w-full p-3 bg-[#FAF5E8] border border-[#36242B]/20 focus:border-[#007BA7] rounded-xs outline-hidden text-[#36242B] placeholder-[#36242B]/40"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#007BA7] hover:bg-[#4D2E3C] text-[#FAF5E8] rounded-xs tracking-[0.25em] uppercase text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                >
                  <span>TRANSMIT INQUIRY</span>
                  <Send size={12} className="text-[#FAF5E8]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
