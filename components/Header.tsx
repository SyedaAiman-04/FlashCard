
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-6 border-b border-zinc-800 mb-10">
      <div className="flex items-center gap-3">
        <div className="bg-orange-600 p-2 rounded-lg">
          <i className="fa-solid fa-bolt-lightning text-zinc-950 text-xl"></i>
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
          Amber<span className="text-orange-600">Cards</span>
        </h1>
      </div>
      <div className="hidden md:flex gap-6 items-center text-sm font-medium text-zinc-400">
        <span className="hover:text-orange-500 cursor-pointer transition-colors">Library</span>
        <span className="hover:text-orange-500 cursor-pointer transition-colors">History</span>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full transition-colors border border-zinc-700">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
