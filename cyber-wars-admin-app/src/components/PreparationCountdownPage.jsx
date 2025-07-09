// src/components/PreparationCountdownPage.jsx
import React, { useState, useEffect } from 'react';

function PreparationCountdownPage({ roomDetails, isAdmin, preparationEndTime, onSkipPreparation }) {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (preparationEndTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        const timeDiff = preparationEndTime - now;
        setRemainingTime(Math.max(0, Math.floor(timeDiff / 1000))); // แสดงเป็นวินาที

        if (timeDiff <= 0) {
          clearInterval(interval);
          // ไม่ต้องเปลี่ยนหน้าตรงนี้ เพราะ App.jsx จะรับ 'game_started' event แล้วเปลี่ยนหน้าเอง
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [preparationEndTime]);

  if (!roomDetails) {
    return (
      <div className="text-white text-center min-h-screen bg-gray-900 flex items-center justify-center">
        Loading preparation details...
      </div>
    );
  }

  const minutes = Math.floor(remainingTime / 60
  );
  const seconds = remainingTime % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-5xl font-bold mb-8 text-yellow-400">เตรียมตัวให้พร้อม!</h1>
      <p className="text-2xl mb-4">เกมจะเริ่มใน...</p>
      <div className="text-8xl font-bold text-red-500 mb-10">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>

      <p className="text-xl text-gray-300 mb-6">
        ห้อง: <span className="font-bold">{roomDetails.roomName}</span> ({roomDetails.roomId})
      </p>

      {isAdmin && (
        <button
          onClick={onSkipPreparation} // ปุ่มข้ามสำหรับ Admin
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 text-xl"
        >
          ➡️ ข้ามการเตรียมตัว (Admin Only)
        </button>
      )}

      <p className="mt-8 text-lg text-gray-500">รอผู้เล่นคนอื่นๆ</p>
    </div>
  );
}

export default PreparationCountdownPage;