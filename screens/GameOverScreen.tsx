import React from 'react';
import { Trophy, RotateCcw, Users } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { Role, WordPair } from '../types';

interface GameOverScreenProps {
  winner: Role;
  spyName: string;
  wordPair: WordPair;
  onPlayAgain: () => void;
  onSamePlayers: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ winner, spyName, wordPair, onPlayAgain, onSamePlayers }) => {
  const isSpyWin = winner === Role.INSIDER;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="border-t-4 border-t-indigo-500">
        <div className="text-center py-6 space-y-8">
            <div className="relative inline-block">
                 <Trophy size={64} className={isSpyWin ? "text-red-400" : "text-indigo-400"} />
                 <div className={`absolute inset-0 blur-2xl opacity-50 ${isSpyWin ? "bg-red-500" : "bg-indigo-500"}`}></div>
            </div>

            <div>
                <h1 className="text-4xl font-black text-white mb-2">
                    {isSpyWin ? "THE INSIDER WINS" : "INNOCENTS WIN"}
                </h1>
                <p className="text-slate-400">Game Over</p>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 space-y-4 border border-slate-800">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-slate-400">The Insider</span>
                    <span className="font-bold text-red-400">{spyName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-slate-400">Specific Word</span>
                    <span className="font-bold text-emerald-400">{wordPair.specific}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">General Word</span>
                    <span className="font-bold text-indigo-400">{wordPair.general}</span>
                </div>
            </div>
        </div>

        <div className="space-y-3">
            <Button fullWidth onClick={onSamePlayers} variant="primary">
                <Users size={20} />
                Same Players
            </Button>
            
            <Button fullWidth onClick={onPlayAgain} variant="secondary">
                <RotateCcw size={20} />
                New Game
            </Button>
        </div>
      </Card>
    </div>
  );
};

export default GameOverScreen;