import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Skull, Lock, AlertTriangle, Wifi, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MatrixBackground from './MatrixBackground';

function App() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showAccess, setShowAccess] = useState(false);
  const [ipAddress, setIpAddress] = useState('Loading...');
  const terminalRef = useRef<HTMLDivElement>(null);
  const [locationData, setLocationData] = useState({
    city: 'Scanning...',
    region: 'Scanning...',
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIpAddress(data.ip);
        return fetch(`https://ipapi.co/${data.ip}/json/`);
      })
      .then(response => response.json())
      .then(data => {
        setLocationData({
          city: data.city,
          region: data.region,
          latitude: data.latitude,
          longitude: data.longitude
        });
      })
      .catch(() => {
        setIpAddress('192.168.1.1');
      });
  }, []);

  useEffect(() => {
    let currentLine = 0;
    let currentProgress = 0;
    let isActive = true;

    const messages = [
      { text: 'INITIALIZING SECURE SHELL...', delay: 800 },
      { text: 'ESTABLISHING ENCRYPTED CONNECTION', delay: 1000 },
      { text: 'BYPASSING FIREWALL PROTOCOLS...', delay: 1200 },
      { text: 'ACCESSING MAINFRAME DATABASE...', delay: 1500 },
      { text: 'DECRYPTING SECURITY LAYERS... [32%]', delay: 1800 },
      { text: 'INJECTING CUSTOM EXPLOIT CODE...', delay: 2000 },
      { text: 'DECRYPTION COMPLETE: ACCESS GRANTED', delay: 2300 },
      { text: 'DEPLOYING SYSTEM OVERRIDE...', delay: 2500 },
      { text: 'ESTABLISHING ROOT ACCESS...', delay: 2800 },
      { text: 'SYSTEM COMPROMISED SUCCESSFULLY', delay: 3000 },
      { text: 'MAINTAINING PERSISTENT CONNECTION...', delay: 3300 },
      { text: 'READY FOR SYSTEM BREACH...', delay: 3500 },
    ];

    const typeMessage = async (messageIndex: number) => {
      if (!isActive || messageIndex >= messages.length) return;

      const message = messages[messageIndex];
      let currentText = '> ';

      for (let i = 0; i < message.text.length; i++) {
        if (!isActive) return;
        
        await new Promise(resolve => setTimeout(resolve, 25));
        currentText += message.text[i];
        setTerminalLines(prev => [...prev.slice(0, -1), currentText]);
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (isActive) {
        setTerminalLines(prev => [...prev, currentText]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        typeMessage(messageIndex + 1);
      }
    };

    setTerminalLines(['']);
    typeMessage(0);

    const progressInterval = setInterval(() => {
      if (!isActive) return;

      if (currentProgress < 100) {
        currentProgress += 1;
        setProgress(currentProgress);
      } else {
        clearInterval(progressInterval);
        setShowAccess(true);
      }
    }, 50);

    return () => {
      isActive = false;
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center font-['Share_Tech_Mono']">
      <MatrixBackground />
      <div className="w-full max-w-2xl p-8 bg-black bg-opacity-90 rounded-lg shadow-2xl border border-green-500 relative z-10 backdrop-blur-sm">
        {/* IP Address Display */}
        <div className="mb-6 p-3 bg-red-500 bg-opacity-20 rounded border border-red-500 text-red-500">
          <div className="flex items-center gap-2 mb-2">
            <Wifi className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-bold">EXPOSED NETWORK DETECTED</span>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="opacity-70">Your IP:</span>
              <span className="font-bold">{ipAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="opacity-70">Location:</span>
              <span className="font-bold">{locationData.city}, {locationData.region}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="opacity-70">Coordinates:</span>
              <span className="font-bold">{locationData.latitude}, {locationData.longitude}</span>
            </div>
            <div className="text-xs opacity-70 mt-2">
              ⚠️ Warning: There is a high chance of you getting rekt too mf
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-green-500">
          <Skull className="w-6 h-6 animate-pulse" />
          <h2 className="text-2xl font-bold glitch-text">ANONYMOUS TERMINAL v2.0</h2>
          <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />
        </div>
        
        <div 
          ref={terminalRef}
          className="bg-black bg-opacity-75 p-4 rounded border border-green-500 mb-4 h-64 overflow-y-auto font-mono text-green-500"
          style={{ scrollBehavior: 'smooth' }}
        >
          {terminalLines.map((line, index) => (
            <div key={index} className="mb-2">
              <span className="terminal-text whitespace-pre">{line}</span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1 text-green-500 terminal-text">
            <span>SYSTEM INFILTRATION PROGRESS</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-black bg-opacity-75 rounded-full h-2.5 border border-green-500">
            <div 
              className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 10px #22c55e, 0 0 20px #22c55e'
              }}
            ></div>
          </div>
        </div>

        {showAccess && (
          <button 
            className="access-button w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-all duration-300 flex items-center justify-center gap-3 border border-green-400 shadow-lg"
            onClick={() => navigate('/breach')}
            style={{ textShadow: '0 0 5px #22c55e' }}
          >
            <Lock className="w-6 h-6" />
            <span className="tracking-[0.2em]">BREACH SYSTEM</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default App;