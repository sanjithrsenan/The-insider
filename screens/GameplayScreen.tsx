import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface GameplayScreenProps {
  roundNumber: number;
  activePlayerName: string;
  onNextTurn: () => void;
}

const GameplayScreen: React.FC<GameplayScreenProps> = ({ roundNumber, activePlayerName, onNextTurn }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="absolute top-8 left-0 w-full text-center">
         <span className="px-4 py-1 bg-slate-800 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400 border border-slate-700">
             Round {roundNumber}
         </span>
      </div>

      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="text-center py-8 space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/50 mb-4">
                <MessageSquare size={36} />
            </div>
            
            <div>
                <h2 className="text-2xl font-bold text-slate-300 mb-1">Current Turn</h2>
                <h1 className="text-5xl font-black text-white tracking-tight">{activePlayerName}</h1>
            </div>
            
            <div className="space-y-4">
                <p className="text-slate-400">
                    Give a one-word clue related to your secret word.
                </p>
                <div className="h-1 w-24 bg-slate-800 mx-auto rounded-full"></div>
                <p className="text-slate-500 text-sm italic">
                    "Try not to be too obvious..."
                </p>
            </div>
        </div>

        <Button fullWidth onClick={onNextTurn}>
          <span>Next Player</span>
          <ArrowRight size={20} />
        </Button>
      </Card>
    </div>
  );
};

export default GameplayScreen;