
export enum GamePhase {
  INTRO = 'INTRO',
  SETUP = 'SETUP',
  ASSIGNMENT = 'ASSIGNMENT',
  GAMEPLAY = 'GAMEPLAY',
  DISCUSSION = 'DISCUSSION',
  VOTING = 'VOTING',
  REVEAL = 'REVEAL',
  GAME_OVER = 'GAME_OVER'
}

export enum Role {
  INNOCENT = 'INNOCENT',
  INSIDER = 'INSIDER'
}

export interface WordPair {
  general: string;
  specific: string;
}

export interface Player {
  id: string;
  name: string;
  role: Role;
  word: string;
  isEliminated: boolean;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  wordPair: WordPair | null;
  turnOrder: number[]; // Array of player indices determining the order for the current phase
  currentPlayerIndex: number; // Index within turnOrder, not players array directly
  roundNumber: number;
  votes: Record<string, string>; // voterId -> votedForId
  eliminatedPlayerId: string | null;
  winner: Role | null; // Who won the game
}
