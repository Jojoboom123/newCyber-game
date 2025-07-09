import React, { useState } from 'react';

function PlayerNameInputPage({ onBack, onPlayerNameSubmit, roomId }) {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      onPlayerNameSubmit(playerName.trim(), roomId);
    } else {
      alert('กรุณาใส่ชื่อของคุณ');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-teal-600 p-4 text-white">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md animate-fade-in-up">
        <h2 className="text-4xl font-extrabold text-[#28A745] mb-6 text-center">
          คุณคือใคร?
        </h2>
        <p className="text-gray-600 text-center mb-8">
          กรุณาใส่ชื่อทีมหรือชื่อของคุณเพื่อเข้าร่วมห้อง <span className="font-bold text-blue-500">{roomId}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="playerName" className="block text-gray-700 text-sm font-bold mb-2">
              ชื่อของคุณ / ชื่อทีม:
            </label>
            <input
              type="text"
              id="playerName"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
              placeholder="เช่น ทีม Alpha"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
             
            />
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105 active:scale-95"
            >
              ย้อนกลับ
            </button>
            <button
              type="submit"
              className="bg-[#28A745] hover:bg-[#218838] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105 active:scale-95"
            >
              ตกลง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlayerNameInputPage;