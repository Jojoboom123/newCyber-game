import React from 'react';

function HomePage({ onGoToCreateRoom, onGoToJoinRoom }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-5xl font-extrabold text-[#007BFF] mb-8 animate-fade-in-down">
        Cyber Wars: Admin Console
      </h1>
      <p className="text-xl text-gray-700 mb-12 text-center max-w-md animate-fade-in">
        จัดการห้องเกมและควบคุมประสบการณ์ Cyber Wars ของผู้เล่น
      </p>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
        {/* ปุ่มสร้างห้อง */}
        <button
          onClick={onGoToCreateRoom}
          className="bg-[#28A745] hover:bg-[#218838] text-white font-bold py-4 px-10 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95 animate-fade-in-left"
        >
          <span className="text-3xl block mb-2">➕</span>
          สร้างห้องใหม่
        </button>

        {/* ปุ่มเข้าร่วมห้อง */}
        <button
          onClick={onGoToJoinRoom}
          className="bg-[#007BFF] hover:bg-[#0056b3] text-white font-bold py-4 px-10 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95 animate-fade-in-right"
        >
          <span className="text-3xl block mb-2">🤝</span>
          เข้าร่วมห้องที่มีอยู่
        </button>
      </div>
    </div>
  );
}

export default HomePage;
