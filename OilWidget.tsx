/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield } from 'lucide-react';
import MaritimeTraffic from './components/MaritimeTraffic';
import ConflictIntelligence from './components/ConflictIntelligence';
import KineticEvents from './components/KineticEvents';
import OilWidget from './components/OilWidget';
import StrategicRisk from './components/StrategicRisk';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import { motion } from 'motion/react';
import { Coffee } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="fixed inset-0 bg-radial-gradient(circle_at_50%_50%,rgba(15,23,42,0)_0%,rgba(2,6,23,0.8)_100%) pointer-events-none"></div>

      {/* AdSense Leaderboard Placeholder */}
      <div className="max-w-[1800px] mx-auto px-6 pt-4">
        <div className="adsbygoogle bg-slate-900/20 border border-slate-800/50 h-[90px] flex items-center justify-center text-[10px] text-slate-600 uppercase tracking-widest" 
             style={{ display: 'block' }} 
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
             data-ad-slot="XXXXXXXXXX" 
             data-ad-format="horizontal">
          Leaderboard Advertisement
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 px-6 py-4">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-amber-500" />
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 bg-amber-500 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tighter text-white uppercase flex items-center gap-2">
                  Hormuz Strategic Monitor
                  <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[10px] text-red-500 font-mono">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                    LIVE
                  </span>
                </h1>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">
                  Regional Security & Energy Intelligence Network
                </p>
              </div>
            </div>
          </div>

          <aside className="hidden xl:flex items-center flex-1 justify-center px-8" aria-label="Live Energy Benchmarks">
            <OilWidget />
          </aside>

          <div className="hidden md:flex items-center gap-8">
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto p-6 lg:p-8 space-y-8">
        {/* Row 1: Conflict Intelligence */}
        <section className="h-[400px]">
          <ConflictIntelligence />
        </section>

        {/* AdSense Rectangle Placeholder */}
        <div className="adsbygoogle bg-slate-900/20 border border-slate-800/50 h-[250px] flex items-center justify-center text-[10px] text-slate-600 uppercase tracking-widest" 
             style={{ display: 'block' }} 
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
             data-ad-slot="XXXXXXXXXX" 
             data-ad-format="rectangle">
          Strategic Intelligence Sponsor
        </div>

        {/* Row 2: Maritime Traffic (Horizontal) */}
        <section className="h-[500px]">
          <MaritimeTraffic />
        </section>

        {/* Row 3: Kinetic Events (Horizontal) */}
        <section className="h-[500px]">
          <KineticEvents />
        </section>

        {/* Row 4: Strategic Risk Indicators (Horizontal) */}
        <section className="h-[300px]">
          <StrategicRisk />
        </section>

        {/* Blog & Analysis Section */}
        <BlogSection />
      </main>

      {/* Footer with Glossary */}
      <Footer />

      {/* Buy Me a Coffee Floating Widget */}
      <a 
        href="https://www.buymeacoffee.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black px-5 py-3 rounded-full font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 group"
      >
        <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="text-sm">Buy me a coffee</span>
      </a>
    </div>
  );
}

