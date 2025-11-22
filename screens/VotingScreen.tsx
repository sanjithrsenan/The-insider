import React from 'react';
import { UserCheck, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { Player } from '../types';

interface VotingScreenProps {
  voter: Player;
  candidates: Player[];
  onVote: (candidateId: string) => void;
}

const VotingScreen: React.FC<VotingScreenProps> = ({ voter, candidates, onVote }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-950/10">
      {/* Increased max-width of card for voting screen to accommodate grid */}
      <div className="glass-panel rounded-2xl p-6 w-full max-w-2xl mx-auto shadow-2xl">
        <div className="mb-6 text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">Cast Vote</h2>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{voter.name}'s Turn</p>
        </div>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex gap-3 items-start">
            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
            <p className="text-red-200 text-sm">
                Select the player you believe is the <strong>Insider</strong>. This action cannot be undone.
            </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {candidates.map((candidate) => (
                <button
                    key={candidate.id}
                    onClick={() => onVote(candidate.id)}
                    className="flex flex-col items-center justify-center p-4 bg-slate-800 hover:bg-indigo-900/40 border border-slate-700 hover:border-indigo-500 rounded-xl transition-all group aspect-[3/2]"
                >
                    <UserCheck className="text-slate-600 group-hover:text-indigo-400 mb-2" size={24} />
                    <span className="font-bold text-lg text-slate-200 group-hover:text-white truncate w-full text-center">{candidate.name}</span>
                </button>
            ))}
        </div>
        
        <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest">
                Pass device to {voter.name}
            </p>
        </div>
      </div>
    </div>
  );
};

export default VotingScreen;