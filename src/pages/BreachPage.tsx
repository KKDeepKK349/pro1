import React, { useState, useEffect } from 'react';
import { Shield, Skull, AlertTriangle, Lock, Eye, Crosshair, Binary, Target, Terminal } from 'lucide-react';

const BreachPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [showKey, setShowKey] = useState(true);

  // Using only the first 10 keys
  const keys = [
    "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"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextKey = () => {
    setShowKey(false);
    setTimeout(() => {
      setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % keys.length);
      setShowKey(true);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black font-['Share_Tech_Mono'] text-green-500 relative">
      <div className="mysterious-background"></div>
      
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-green-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%`, boxShadow: '0 0 10px #22c55e' }}
      ></div>
      
      {/* Navigation Bar */}
      <nav className="fixed top-1 w-full bg-black bg-opacity-90 border-b border-green-500 p-4 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skull className="w-6 h-6 animate-pulse" />
            <span className="text-xl font-bold glitch-text">ANONYMOUS</span>
          </div>
          <div className="flex items-center gap-4">
            <Shield className="w-5 h-5" />
            <span className="text-sm terminal-text">SECURE CONNECTION ESTABLISHED</span>
            <Eye className="w-4 h-4 animate-ping text-red-500" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto pt-24 px-4 pb-24 relative z-10">
        {/* First Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Crosshair className="w-6 h-6 text-red-500 animate-pulse" />
              <span className="text-sm text-red-500 tracking-widest">TARGET ACQUIRED</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold glitch-text mb-4">
              This is Just the Start
            </h1>
            <div className="flex items-center gap-2 text-xl text-red-500">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
              <span className="font-bold">#OperationSTOPRUG</span>
            </div>
            
            {/* Stats Block */}
            <div className="relative mt-8 group">
              <div className="absolute inset-0 bg-green-500 opacity-20 blur-lg group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-black bg-opacity-90 p-6 rounded-lg border border-green-500 hover:border-green-400 transition-colors">
                <div className="text-4xl font-bold mb-4 glitch-text">500+</div>
                <div className="text-xl mb-2">Scammers Exposed</div>
                <div className="h-1 w-20 bg-green-500 mb-4"></div>
                <p className="opacity-75 mb-4">
                  Popular celebrities and influencers scam their audience with rug coins, 
                  courses, and by selling a dream while profiting themselves.
                </p>
                <p className="opacity-75 border-l-4 border-green-500 pl-4">
                  We have exploited the PCs of over 500 scam celebrities and fraudsters 
                  in the past four months.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden border-2 border-green-500 group">
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
              <div className="text-center p-8">
                <Binary className="w-16 h-16 mx-auto mb-4 animate-pulse group-hover:text-red-500 transition-colors" />
                <p className="text-lg font-bold terminal-text">CLASSIFIED EVIDENCE</p>
                <p className="text-sm opacity-75">Replace this with your image</p>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Divider */}
        <div className="relative h-px my-16">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse opacity-50"></div>
        </div>

        {/* Second Section */}
        <section className="max-w-4xl mx-auto mb-24">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-4xl font-bold glitch-text">
              They Are Just an Example
            </h2>
            <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
          </div>
          <div className="space-y-6 mb-12">
            <p className="text-xl opacity-90 terminal-text">
              These leaked licenses and passports? Just the beginning.
            </p>
            <p className="text-lg opacity-80">
              They won't stop. So neither will we.
            </p>
            <p className="text-lg opacity-80">
              We have everything—their private keys, their money laundering trails, 
              their exact profits. We'll release it piece by piece, turning their 
              stolen wealth into their own nightmare.
            </p>
            <p className="text-xl font-bold text-red-500 glitch-text">
              They scammed thousands. Now it's their turn to run.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-green-500 mb-16 group">
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
              <div className="text-center p-8">
                <Lock className="w-16 h-16 mx-auto mb-4 animate-pulse group-hover:text-red-500 transition-colors" />
                <p className="text-lg font-bold terminal-text">LEAKED DOCUMENTS</p>
                <p className="text-sm opacity-75">Replace this with your image</p>
              </div>
            </div>
          </div>

          {/* Money Puzzle Section */}
          <div className="relative group mb-24">
            <div className="absolute inset-0 bg-green-500 opacity-10 blur-lg group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-black bg-opacity-90 p-8 rounded-lg border border-green-500 hover:border-green-400 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-3xl font-bold glitch-text">The Hunt Begins</h3>
                <Lock className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-6 text-lg">
                <p className="opacity-80 text-xl">
                  We've created a puzzle. Inside it are 50 private keys.
                </p>
                <p className="opacity-90 text-red-500 text-xl font-bold">
                  Three of them? Belong to scammers—holding over $500K in stolen funds.
                </p>
                <p className="opacity-80 text-xl">
                  Solve it. Claim their money.
                </p>
                <p className="opacity-90 text-lg">
                  They scammed thousands, thinking they were untouchable. Now their wealth is up for grabs.
                </p>
                <p className="text-2xl font-bold glitch-text mt-8">
                  The hunt begins. Will you find it before they do?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terminal Section */}
        <section className="max-w-4xl mx-auto mt-16 grid md:grid-cols-2 gap-8">
          {/* Terminal Display */}
          <div className="relative group">
            <div className="absolute inset-0 bg-green-500 opacity-10 blur-lg group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-black bg-opacity-90 p-6 rounded-lg border border-green-500 font-mono">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5" />
                <span className="text-sm opacity-70">TERMINAL ACCESS</span>
              </div>
              <div className="h-[400px] overflow-y-auto scrollbar">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">{`>`}</span>
                  <div className="flex-1">
                    <span className="typing-animation">Solve this one</span>
                    <div className={`mt-4 p-6 bg-black bg-opacity-50 border border-green-500 rounded transition-opacity duration-300 ${showKey ? 'opacity-100' : 'opacity-0'}`}>
                      <code className="text-sm break-all font-mono">{keys[currentKeyIndex]}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="relative group">
            <div className="absolute inset-0 bg-green-500 opacity-10 blur-lg group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-black bg-opacity-90 p-6 rounded-lg border border-green-500">
              <h3 className="text-2xl font-bold mb-4 glitch-text">Decrypt the Keys</h3>
              <p className="text-lg mb-6 opacity-80">
                Each key might be the one holding their stolen fortune. Try them all.
              </p>
              <button
                onClick={handleNextKey}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded transition-all duration-300 flex items-center justify-center gap-3 border border-green-400 shadow-lg group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via- green-400 to-transparent opacity-30 group-hover:opacity-50 animate-[shimmer_2s_infinite] transform -translate-x-full"></span>
                <Lock className="w-5 h-5" />
                <span className="tracking-wider">NEXT KEY</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BreachPage;
