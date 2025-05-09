import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const moodData = {
  happy: { color: 'bg-yellow-200', emoji: '😊', bar: 'bg-yellow-400' },
  angry: { color: 'bg-red-200', emoji: '😡', bar: 'bg-red-400' },
  sad: { color: 'bg-blue-200', emoji: '😢', bar: 'bg-blue-400' },
  excited: { color: 'bg-green-200', emoji: '🤩', bar: 'bg-green-400' },
};

function App() {
  const [mood, setMood] = useState(null);
  const [counts, setCounts] = useState({ happy: 0, sad: 0, angry: 0, excited: 0 });

  const handleClick = async (m) => {
    setMood(m);
    await addDoc(collection(db, 'moods'), {
      mood: m,
      timestamp: new Date(),
    });
    fetchData(); // update if clicked
  };

  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, 'moods'));
    const data = snapshot.docs.map((doc) => doc.data());
    const stats = { happy: 0, sad: 0, angry: 0, excited: 0 };
    data.forEach((entry) => {
      if (entry.mood in stats) stats[entry.mood]++;
    });
    setCounts(stats);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const current = mood ? moodData[mood] : null;
  const max = Math.max(...Object.values(counts));

  return (
    <div className={`min-h-screen flex flex-col items-center p-10 transition-all ${current?.color || 'bg-gray-100'}`}>
      <h1 className="text-3xl font-bold mb-6">How are you feeling?</h1>
      <div className="space-x-4 mb-10">
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
        <div className="text-6xl mb-8">
          {current.emoji}
        </div>
      )}

      {/* Histogram Section */}
      <div className="w-full max-w-xl space-y-4 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Mood Histogram</h2>
        {Object.entries(counts).map(([m, count]) => {
          const percent = max > 0 ? (count / max) * 100 : 0;
          return (
            <div key={m}>
              <div className="flex justify-between mb-1">
                <span className="capitalize font-medium">{m}</span>
                <span className="text-sm text-gray-500">{count}</span>
              </div>
              <div className="bg-gray-200 h-5 rounded">
                <div
                  className={`h-5 rounded ${moodData[m].bar}`}
                  style={{ width: `${percent}%`, transition: 'width 0.3s ease' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
