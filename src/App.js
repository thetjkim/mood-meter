import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function App() {
  const [mood, setMood] = useState(null);

  const moodData = {
    happy: { color: 'bg-yellow-200', emoji: '😊' },
    angry: { color: 'bg-red-300', emoji: '😡' },
    sad: { color: 'bg-blue-300', emoji: '😢' },
    excited: { color: 'bg-green-300', emoji: '🤩' },
  };

  const handleClick = async (m) => {
    setMood(m);
    await addDoc(collection(db, "moods"), {
      mood: m,
      timestamp: new Date(),
    });
  };

  const current = mood ? moodData[mood] : null;

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center transition-all ${current?.color || 'bg-gray-100'}`}>
      <h1 className="text-3xl font-bold mb-6">How are you feeling?</h1>
      <div className="space-x-4">
        {Object.keys(moodData).map((m) => (
          <button
            key={m}
            className="px-4 py-2 rounded bg-white shadow hover:bg-gray-200 font-medium"
            onClick={() => handleClick(m)}
          >
            {m}
          </button>
        ))}
      </div>
      {mood && (
        <div className="mt-10 text-6xl">
          {current.emoji}
        </div>
      )}
    </div>
  );
}

export default App;