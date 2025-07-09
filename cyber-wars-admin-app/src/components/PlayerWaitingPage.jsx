// src/components/PlayerWaitingPage.jsx
import React from 'react';

function PlayerWaitingPage({ roomDetails }) {
  if (!roomDetails) {
    return (
      <div className="text-white text-center min-h-screen bg-gray-900 flex items-center justify-center">
        Loading room details...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-5xl font-bold mb-8 text-blue-400">รอ Admin เริ่มเกม...</h1>
      <p className="text-2xl mb-4">
        ห้อง: <span className="font-bold">{roomDetails.roomName}</span>
      </p>
      <p className="text-xl text-gray-400 mb-8">
        รหัสห้อง: <span className="font-mono text-green-400">{roomDetails.roomId}</span>
      </p>
      <p className="text-lg text-gray-500 animate-pulse">
        เตรียมตัวให้พร้อม! เกมกำลังจะเริ่มขึ้นในไม่ช้า...
      </p>
      <div className="mt-10">
        {/* คุณสามารถเพิ่มโลโก้เกม, อนิเมชั่นโหลด, หรือคำแนะนำสั้นๆ ได้ที่นี่ */}
        <div className="w-24 h-24 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default PlayerWaitingPage;