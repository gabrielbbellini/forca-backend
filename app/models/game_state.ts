export default class GameState {
  readonly wordsLength: number[];
  readonly charactersUsed: string[];
  readonly remaningAttempts: number;

  constructor(wordsLength: number[], charactersUsed: string[], remaningAttempts: number) {
    this.wordsLength = wordsLength;
    this.charactersUsed = charactersUsed;
    this.remaningAttempts = remaningAttempts;
  }
}