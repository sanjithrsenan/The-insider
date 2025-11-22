
import React, { useState } from 'react';
import { WORD_LISTS } from './constants';
import { GamePhase, GameState, Player, Role } from './types';
import SetupScreen from './screens/SetupScreen';
import AssignmentScreen from './screens/AssignmentScreen';
import GameplayScreen from './screens/GameplayScreen';
import DiscussionScreen from './screens/DiscussionScreen';
import VotingScreen from './screens/VotingScreen';
import ResultScreen from './screens/ResultScreen';
import GameOverScreen from './screens/GameOverScreen';
import IntroScreen from './screens/IntroScreen';

// Helper to shuffle array (Fisher-Yates)
const shuffleArray = (array: number[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Helper to get sequential order [0, 1, 2, ...]
const getSequentialOrder = (length: number) => Array.from({ length }, (_, i) => i);

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<'ENGLISH' | 'MALAYALAM'>('ENGLISH');
  const [gameState, setGameState] = useState<GameState>({
    phase: GamePhase.INTRO,
    players: [],
    wordPair: null,
    turnOrder: [],
    currentPlayerIndex: 0,
    roundNumber: 1,
    votes: {},
    eliminatedPlayerId: null,
    winner: null
  });

  // --- Actions ---

  const handleIntroStart = () => {
    setGameState(prev => ({ ...prev, phase: GamePhase.SETUP }));
  };

  const startGame = (names: string[], language: 'ENGLISH' | 'MALAYALAM') => {
    setCurrentLanguage(language);
    const selectedList = WORD_LISTS[language];
    const randomWordPair = selectedList[Math.floor(Math.random() * selectedList.length)];
    const spyIndex = Math.floor(Math.random() * names.length);
    
    const players: Player[] = names.map((name, index) => ({
      id: `p-${index}`,
      name,
      role: index === spyIndex ? Role.INSIDER : Role.INNOCENT,
      word: index === spyIndex ? randomWordPair.general : randomWordPair.specific,
      isEliminated: false
    }));

    setGameState({
      phase: GamePhase.ASSIGNMENT,
      players,
      wordPair: randomWordPair,
      turnOrder: getSequentialOrder(players.length), // Assignment is strictly sequential (seating order)
      currentPlayerIndex: 0,
      roundNumber: 1,
      votes: {},
      eliminatedPlayerId: null,
      winner: null
    });
  };

  const restartSamePlayers = () => {
    if (gameState.players.length === 0) return;
    const names = gameState.players.map(p => p.name);
    startGame(names, currentLanguage);
  };

  const handleAssignmentConfirm = () => {
    const nextIndex = gameState.currentPlayerIndex + 1;
    
    if (nextIndex < gameState.turnOrder.length) {
      setGameState(prev => ({ ...prev, currentPlayerIndex: nextIndex }));
    } else {
      // Transition to Gameplay Round 1
      // Logic: Only active players, shuffled for variety
      const activePlayerIndices = gameState.players
        .map((p, i) => !p.isEliminated ? i : -1)
        .filter(i => i !== -1);
      
      const shuffledOrder = shuffleArray(activePlayerIndices);

      setGameState(prev => ({ 
        ...prev, 
        phase: GamePhase.GAMEPLAY,
        currentPlayerIndex: 0,
        turnOrder: shuffledOrder,
        roundNumber: 1
      }));
    }
  };

  const handleNextTurn = () => {
    const nextIndex = gameState.currentPlayerIndex + 1;
    
    if (nextIndex < gameState.turnOrder.length) {
      setGameState(prev => ({ ...prev, currentPlayerIndex: nextIndex }));
    } else {
      // End of Round
      const nextRound = gameState.roundNumber + 1;
      
      // Determine max rounds based on player count (roughly) or fixed
      // Fixed at 2 rounds of clues before voting for better pacing
      if (nextRound > 2) {
        setGameState(prev => ({ ...prev, phase: GamePhase.DISCUSSION }));
      } else {
        // Start Next Round
        // Re-shuffle order for the new round so a different person starts
        const activePlayerIndices = gameState.players
          .map((p, i) => !p.isEliminated ? i : -1)
          .filter(i => i !== -1);
        
        const shuffledOrder = shuffleArray(activePlayerIndices);

        setGameState(prev => ({ 
          ...prev, 
          roundNumber: nextRound,
          currentPlayerIndex: 0,
          turnOrder: shuffledOrder
        }));
      }
    }
  };

  const startVoting = () => {
    // Voting is sequential for passing device
    const activePlayerIndices = gameState.players
        .map((p, i) => !p.isEliminated ? i : -1)
        .filter(i => i !== -1);

    setGameState(prev => ({ 
      ...prev, 
      phase: GamePhase.VOTING,
      turnOrder: activePlayerIndices, // Sequential
      currentPlayerIndex: 0,
      votes: {}
    }));
  };

  const castVote = (candidateId: string) => {
    const currentPlayerId = gameState.players[gameState.turnOrder[gameState.currentPlayerIndex]].id;
    
    const newVotes = { ...gameState.votes, [currentPlayerId]: candidateId };
    
    const nextIndex = gameState.currentPlayerIndex + 1;
    
    if (nextIndex < gameState.turnOrder.length) {
      setGameState(prev => ({ 
        ...prev, 
        votes: newVotes,
        currentPlayerIndex: nextIndex
      }));
    } else {
      // Tally Votes
      calculateResults(newVotes);
    }
  };

  const calculateResults = (votes: Record<string, string>) => {
    const voteCounts: Record<string, number> = {};
    
    Object.values(votes).forEach(votedId => {
      voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
    });

    // Find max votes
    let maxVotes = 0;
    let eliminatedId = null;
    
    // Simple tie-breaker: first found (could be random in future)
    for (const [id, count] of Object.entries(voteCounts)) {
      if (count > maxVotes) {
        maxVotes = count;
        eliminatedId = id;
      }
    }

    // If no votes (shouldn't happen), pick random active
    if (!eliminatedId) {
       const active = gameState.players.filter(p => !p.isEliminated);
       eliminatedId = active[Math.floor(Math.random() * active.length)].id;
    }

    const eliminatedPlayer = gameState.players.find(p => p.id === eliminatedId);
    
    if (eliminatedPlayer) {
       // Mark eliminated
       const updatedPlayers = gameState.players.map(p => 
         p.id === eliminatedId ? { ...p, isEliminated: true } : p
       );

       setGameState(prev => ({
         ...prev,
         players: updatedPlayers,
         eliminatedPlayerId: eliminatedId,
         phase: GamePhase.REVEAL
       }));
    }
  };

  const handleRevealContinue = () => {
    const eliminatedPlayer = gameState.players.find(p => p.id === gameState.eliminatedPlayerId);
    
    if (eliminatedPlayer?.role === Role.INSIDER) {
      // Innocents Win
      setGameState(prev => ({ ...prev, phase: GamePhase.GAME_OVER, winner: Role.INNOCENT }));
    } else {
      // Check remaining players
      const activeCount = gameState.players.filter(p => !p.isEliminated).length;
      if (activeCount <= 2) {
        // Insider Wins (1v1)
        setGameState(prev => ({ ...prev, phase: GamePhase.GAME_OVER, winner: Role.INSIDER }));
      } else {
        // Continue Game - Loop back to clues? Or one final chance?
        // Standard Insider: Usually instant loss if wrong. 
        // Variant: Loop back. Let's loop back to Clue Round 1 for remaining players.
        
        // Shuffle for next round
         const activePlayerIndices = gameState.players
          .map((p, i) => !p.isEliminated ? i : -1)
          .filter(i => i !== -1);
        
        const shuffledOrder = shuffleArray(activePlayerIndices);

        setGameState(prev => ({
          ...prev,
          phase: GamePhase.GAMEPLAY,
          roundNumber: 1, // Reset rounds for new set of players? Or continue? Let's reset to 1 round before discussion.
          turnOrder: shuffledOrder,
          currentPlayerIndex: 0
        }));
      }
    }
  };

  const handlePlayAgain = () => {
    setGameState({
      phase: GamePhase.SETUP,
      players: [],
      wordPair: null,
      turnOrder: [],
      currentPlayerIndex: 0,
      roundNumber: 1,
      votes: {},
      eliminatedPlayerId: null,
      winner: null
    });
  };

  // --- Render ---

  // Safety check for indexing
  const currentPlayerIndex = gameState.turnOrder[gameState.currentPlayerIndex];
  const activePlayer = gameState.players[currentPlayerIndex];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30">
      {gameState.phase === GamePhase.INTRO && (
        <IntroScreen onStart={handleIntroStart} />
      )}

      {gameState.phase === GamePhase.SETUP && (
        <SetupScreen onStartGame={startGame} />
      )}

      {gameState.phase === GamePhase.ASSIGNMENT && activePlayer && (
        <AssignmentScreen 
          key={activePlayer.id} // Important for animation reset
          playerName={activePlayer.name}
          word={activePlayer.word}
          onConfirm={handleAssignmentConfirm}
        />
      )}

      {gameState.phase === GamePhase.GAMEPLAY && activePlayer && (
        <GameplayScreen 
          roundNumber={gameState.roundNumber}
          activePlayerName={activePlayer.name}
          onNextTurn={handleNextTurn}
        />
      )}

      {gameState.phase === GamePhase.DISCUSSION && (
        <DiscussionScreen 
          initialTimeSeconds={120} // 2 minutes
          onTimeUp={startVoting}
        />
      )}

      {gameState.phase === GamePhase.VOTING && activePlayer && (
        <VotingScreen 
          voter={activePlayer}
          candidates={gameState.players.filter(p => !p.isEliminated && p.id !== activePlayer.id)}
          onVote={castVote}
        />
      )}

      {gameState.phase === GamePhase.REVEAL && gameState.eliminatedPlayerId && (
        <ResultScreen 
          eliminatedPlayer={gameState.players.find(p => p.id === gameState.eliminatedPlayerId)!}
          isSpy={gameState.players.find(p => p.id === gameState.eliminatedPlayerId)?.role === Role.INSIDER}
          onContinue={handleRevealContinue}
        />
      )}

      {gameState.phase === GamePhase.GAME_OVER && gameState.wordPair && (
        <GameOverScreen 
          winner={gameState.winner!}
          spyName={gameState.players.find(p => p.role === Role.INSIDER)?.name || "Unknown"}
          wordPair={gameState.wordPair}
          onPlayAgain={handlePlayAgain}
          onSamePlayers={restartSamePlayers}
        />
      )}
    </div>
  );
}

export default App;
