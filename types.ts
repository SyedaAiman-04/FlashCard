
export interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

export interface AppState {
  topic: string;
  cardCount: number;
  isGenerating: boolean;
  cards: Flashcard[];
  error: string | null;
}
