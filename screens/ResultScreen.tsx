import React from 'react';
import { Skull, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { Player, Role } from '../types';

interface ResultScreenProps {
  eliminatedPlayer: Player;
  isSpy: boolean;
  onContinue: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ eliminatedPlayer, isSpy, onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card>
        <div className="text-center py-6 space-y-6">
           <div className="space-y-2">
               <h2 className="text-slate-400 font-medium uppercase tracking-wider">The Tribe Has Spoken</h2>
               <h1 className="text-4xl font-black text-white">{eliminatedPlayer.name}</h1>
               <p className="text-slate-500">has been eliminated.</p>
           </div>

           <div className={`py-8 rounded-2xl border-2 ${isSpy ? 'bg-red-500/10 border-red-500/50' : 'bg-emerald-500/10 border-emerald-500/50'}`}>
               {isSpy ? (
                   <div className="flex flex-col items-center text-red-400 space-y-3">
                       <ShieldAlert size={48} />
                       <span className="text-2xl font-bold uppercase">The Insider</span>
                   </div>
               ) : (
                   <div className="flex flex-col items-center text-emerald-400 space-y-3">
                       <CheckCircle size={48} />
                       <span className="text-2xl font-bold uppercase">Innocent</span>
                   </div>
               )}
           </div>

           <p className="text-slate-300 px-4">
               {isSpy 
                 ? "The Insider has been caught! The village is safe." 
                 : "An innocent player was removed. The Insider remains among you..."}
           </p>
        </div>

        <Button 
            fullWidth 
            onClick={onContinue} 
            variant={isSpy ? "primary" : "secondary"}
        >
            {isSpy ? "View Game Stats" : "Continue Game"}
            <ArrowRight size={20} />
        </Button>
      </Card>
    </div>
  );
};

export default ResultScreen;