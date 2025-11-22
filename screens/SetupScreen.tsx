import React, { useState } from 'react';
import { Plus, Users, Play, X, Languages } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface SetupScreenProps {
  onStartGame: (names: string[], language: 'ENGLISH' | 'MALAYALAM') => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame }) => {
  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [language, setLanguage] = useState<'ENGLISH' | 'MALAYALAM'>('ENGLISH');

  const addName = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !names.includes(trimmed)) {
      setNames([...names, trimmed]);
      setInputValue('');
    }
  };

  const removeName = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addName();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 tracking-tighter">
          INSIDER
        </h1>
        <p className="text-slate-400 font-medium">Deceive. Deduce. Survive.</p>
      </div>

      <Card title="Assemble Crew" subtitle="Minimum 3 Players">
        
        {/* Language Selection */}
        <div className="mb-6 p-1 bg-slate-900/50 rounded-xl flex">
            <button 
                onClick={() => setLanguage('ENGLISH')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${language === 'ENGLISH' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
                English
            </button>
            <button 
                onClick={() => setLanguage('MALAYALAM')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${language === 'MALAYALAM' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
                മലയാളം
            </button>
        </div>

        <div className="space-y-4">
          <div className="relative flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'MALAYALAM' ? "പേര് നൽകുക" : "Enter player name"}
              className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600"
            />
            <button 
              onClick={addName}
              disabled={!inputValue.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl disabled:opacity-50 transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[100px] max-h-[250px] overflow-y-auto content-start bg-slate-950/30 rounded-xl p-3 border border-slate-800/50">
            {names.length === 0 && (
              <p className="w-full text-center text-slate-600 italic py-8">
                {language === 'MALAYALAM' ? "കളിക്കാരെ ചേർത്തിട്ടില്ല..." : "No players added yet..."}
              </p>
            )}
            {names.map((name, index) => (
              <div key={index} className="flex items-center bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium animate-scale-in group">
                <Users size={14} className="mr-2 text-indigo-400" />
                {name}
                <button 
                  onClick={() => removeName(index)}
                  className="ml-2 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Button 
            fullWidth 
            onClick={() => onStartGame(names, language)}
            disabled={names.length < 3}
          >
            <Play size={20} className="fill-current" />
            {language === 'MALAYALAM' ? "ഗെയിം തുടങ്ങുക" : "Start Mission"}
          </Button>
          {names.length < 3 && names.length > 0 && (
            <p className="text-center text-red-400 text-xs mt-3 font-medium">
               Need {3 - names.length} more player{3 - names.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SetupScreen;