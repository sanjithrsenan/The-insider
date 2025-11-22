import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface AssignmentScreenProps {
  playerName: string;
  word: string;
  onConfirm: () => void;
}

const AssignmentScreen: React.FC<AssignmentScreenProps> = ({ playerName, word, onConfirm }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleHideAndPass = () => {
    // Trigger exit animation
    setIsExiting(true);
    // Wait for animation to finish before calling parent handler
    setTimeout(() => {
      onConfirm();
    }, 600);
  };

  if (!isRevealed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-fade-in w-full max-w-md">
          <Card title="Classified Info" subtitle="Pass Device To">
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto flex items-center justify-center mb-6 border-2 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                  <Lock size={40} className="text-indigo-400" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">{playerName}</h3>
              <p className="text-slate-400 text-sm px-8">
                Ensure only <strong>{playerName}</strong> can see the screen before proceeding.
              </p>
            </div>
            <Button fullWidth onClick={() => setIsRevealed(true)}>
              <Eye size={20} />
              Reveal Identity
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-indigo-950/20 overflow-hidden">
      <div 
        className={`w-full max-w-md transition-all duration-500 ease-in-out transform ${
          isExiting 
            ? 'opacity-0 translate-y-12 scale-95 blur-sm' 
            : 'opacity-100 translate-y-0 scale-100 animate-scale-in'
        }`}
      >
        <Card title="Top Secret" subtitle="Your Assignment">
          <div className="text-center py-10 space-y-6">
            <div>
              <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Your Word Is</p>
              <div className="bg-slate-950 border border-slate-800 rounded-xl py-6 px-4 shadow-inner relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-400 relative z-10">
                      {word}
                  </h3>
              </div>
            </div>
            
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 text-indigo-200 text-sm">
                Memorize this word. Keep your face neutral. Do not react.
            </div>
          </div>
          <Button fullWidth onClick={handleHideAndPass} variant="secondary">
            <EyeOff size={20} />
            Hide & Pass
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AssignmentScreen;