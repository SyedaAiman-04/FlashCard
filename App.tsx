
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FlashcardItem from './components/FlashcardItem';
import { Flashcard, AppState } from './types';
import { generateFlashcards } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    topic: '',
    cardCount: 6,
    isGenerating: false,
    cards: [],
    error: null,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.topic.trim()) return;

    setState(prev => ({ ...prev, isGenerating: true, error: null, cards: [] }));

    try {
      const generatedCards = await generateFlashcards(state.topic, state.cardCount);
      setState(prev => ({
        ...prev,
        cards: generatedCards,
        isGenerating: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: (err as Error).message,
      }));
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Header />

      <main>
        {/* Intro Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Master Any Topic with <span className="text-orange-600">AI Flashcards</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Type in a subject and choose how many key terms you want to learn. Our AI will curate the most important concepts for you instantly.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto mb-16">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="topic" className="block text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                Enter Topic
              </label>
              <input
                id="topic"
                type="text"
                placeholder="e.g. Quantum Physics, Baroque Art, React Hooks..."
                value={state.topic}
                onChange={(e) => setState(prev => ({ ...prev, topic: e.target.value }))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-600/50 focus:border-orange-600 transition-all text-lg"
                disabled={state.isGenerating}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="count" className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                    Number of Cards
                  </label>
                  <span className="bg-orange-600/20 text-orange-500 px-3 py-1 rounded-full text-sm font-bold border border-orange-600/30">
                    {state.cardCount} Cards
                  </span>
                </div>
                <input
                  id="count"
                  type="range"
                  min="3"
                  max="20"
                  step="1"
                  value={state.cardCount}
                  onChange={(e) => setState(prev => ({ ...prev, cardCount: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  disabled={state.isGenerating}
                />
              </div>

              <button
                type="submit"
                disabled={state.isGenerating || !state.topic.trim()}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  state.isGenerating || !state.topic.trim()
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                    : 'bg-orange-600 hover:bg-orange-500 text-zinc-950 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] transform hover:-translate-y-1 active:translate-y-0'
                }`}
              >
                {state.isGenerating ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    Generating Deck...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    Generate Cards
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Status Messages */}
        {state.error && (
          <div className="max-w-3xl mx-auto bg-red-900/20 border border-red-500/50 text-red-500 p-4 rounded-xl mb-10 flex items-center gap-3">
            <i className="fa-solid fa-circle-exclamation text-lg"></i>
            <p>{state.error}</p>
          </div>
        )}

        {/* Loading Skeleton */}
        {state.isGenerating && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(state.cardCount)].map((_, i) => (
              <div key={i} className="bg-zinc-900/50 h-64 rounded-2xl border-2 border-zinc-800/50"></div>
            ))}
          </div>
        )}

        {/* Flashcard Grid */}
        {!state.isGenerating && state.cards.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-orange-600"></i>
                Deck for: <span className="text-orange-500 italic">"{state.topic}"</span>
              </h3>
              <p className="text-zinc-500 text-sm font-medium">{state.cards.length} Flashcards</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {state.cards.map((card, index) => (
                <FlashcardItem key={card.id} card={card} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!state.isGenerating && state.cards.length === 0 && !state.error && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-600 border-2 border-dashed border-zinc-800 rounded-3xl">
            <i className="fa-solid fa-box-open text-6xl mb-6 opacity-20"></i>
            <p className="text-xl font-medium">Ready to start learning?</p>
            <p className="text-sm">Input a topic above and hit generate!</p>
          </div>
        )}
      </main>

      <footer className="mt-20 pt-10 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        <p>&copy; {new Date().getFullYear()} AmberCards AI. Powering curious minds with Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
