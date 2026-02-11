
import React, { useState } from 'react';
import { Flashcard } from '../types';

interface FlashcardItemProps {
  card: Flashcard;
  index: number;
}

const FlashcardItem: React.FC<FlashcardItemProps> = ({ card, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective-1000 w-full h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 preserve-3d shadow-xl rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-zinc-900 border-2 border-orange-600/30 group-hover:border-orange-500 rounded-2xl transition-colors">
          <span className="text-zinc-500 text-xs font-mono mb-4 uppercase tracking-widest">Term #{index + 1}</span>
          <h3 className="text-2xl font-bold text-center text-white group-hover:text-orange-400 transition-colors">
            {card.term}
          </h3>
          <div className="mt-8 flex items-center text-orange-500/50 group-hover:text-orange-500 transition-colors">
            <span className="text-sm font-medium">Click to flip</span>
            <i className="fa-solid fa-repeat ml-2 text-xs"></i>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 bg-orange-600 border-2 border-orange-500 rounded-2xl overflow-y-auto scrollbar-hide">
          <span className="text-orange-200 text-xs font-mono mb-4 uppercase tracking-widest">Introduction</span>
          <p className="text-lg leading-relaxed text-zinc-950 font-medium text-center">
            {card.definition}
          </p>
          <div className="mt-6 flex items-center text-zinc-950/60">
            <span className="text-sm font-medium">Click to see term</span>
            <i className="fa-solid fa-repeat ml-2 text-xs"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardItem;
