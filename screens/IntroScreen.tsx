
import React from 'react';
import { ArrowRight, Info, Users, Brain, UserCheck, Code } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 py-8">
      <div className="text-center space-y-2 animate-fade-in mb-6">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 tracking-tighter">
          THE INSIDER
        </h1>
        <p className="text-slate-400 font-medium tracking-widest uppercase text-sm">Social Deduction Game</p>
      </div>

      <Card className="max-w-xl animate-scale-in">
        <div className="space-y-8">
          
          {/* Rules Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-2">
              <Info size={20} className="text-cyan-400" />
              How to Play
            </h2>
            
            <div className="grid gap-4 text-slate-300 text-sm">
              <div className="flex gap-3">
                <div className="bg-slate-800 p-2 rounded-lg h-fit shrink-0"><Users size={16} className="text-indigo-400"/></div>
                <p><strong className="text-white">Roles:</strong> Everyone gets a specific word (e.g., "Lion"). One person, <span className="text-red-400 font-bold">The Insider</span>, only sees the category (e.g., "Animal").</p>
              </div>

              <div className="flex gap-3">
                <div className="bg-slate-800 p-2 rounded-lg h-fit shrink-0"><Brain size={16} className="text-purple-400"/></div>
                <p><strong className="text-white">Gameplay:</strong> Take turns giving a one-word clue. The Insider must blend in without knowing the specific word.</p>
              </div>

              <div className="flex gap-3">
                <div className="bg-slate-800 p-2 rounded-lg h-fit shrink-0"><UserCheck size={16} className="text-emerald-400"/></div>
                <p><strong className="text-white">Objective:</strong> Innocents must identify the Insider. The Insider must survive the vote.</p>
              </div>
            </div>
          </div>

          {/* Credits Section */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50 space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Code size={14} />
              Credits
            </h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Developer</span>
              <span className="text-white font-semibold">Sanjith</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">AI Assistance</span>
              <span className="text-white font-semibold">Gemini</span>
            </div>
          </div>

          <Button fullWidth onClick={onStart}>
            Start Setup
            <ArrowRight size={20} />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default IntroScreen;
