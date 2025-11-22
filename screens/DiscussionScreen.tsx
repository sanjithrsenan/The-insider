import React, { useState, useEffect } from 'react';
import { Clock, SkipForward } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface DiscussionScreenProps {
  initialTimeSeconds: number;
  onTimeUp: () => void;
}

const DiscussionScreen: React.FC<DiscussionScreenProps> = ({ initialTimeSeconds, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = (timeLeft / initialTimeSeconds) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card title="Debate" subtitle="Find The Insider">
        <div className="flex flex-col items-center py-8 space-y-8">
            
            {/* Timer Circle */}
            <div className="relative flex items-center justify-center w-64 h-64">
                 {/* Background Ring */}
                <svg className="absolute w-full h-full transform -rotate-90">
                    <circle
                        cx="128"
                        cy="128"
                        r="110"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-800"
                    />
                    <circle
                        cx="128"
                        cy="128"
                        r="110"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 110}
                        strokeDashoffset={2 * Math.PI * 110 * ((100 - progress) / 100)}
                        className={`text-indigo-500 transition-all duration-1000 ease-linear ${timeLeft < 10 ? 'text-red-500' : ''}`}
                    />
                </svg>
                
                <div className="text-center z-10">
                    <Clock size={32} className={`mx-auto mb-2 ${timeLeft < 10 ? 'text-red-400 animate-pulse' : 'text-indigo-400'}`} />
                    <span className={`text-6xl font-mono font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>
                        {formatTime(timeLeft)}
                    </span>
                </div>
            </div>

            <p className="text-center text-slate-400 max-w-xs">
                Discuss who gave suspicious clues. The Insider knows the general category but not the specific word.
            </p>
        </div>

        <Button fullWidth variant="secondary" onClick={onTimeUp}>
          <SkipForward size={20} />
          Vote Now
        </Button>
      </Card>
    </div>
  );
};

export default DiscussionScreen;