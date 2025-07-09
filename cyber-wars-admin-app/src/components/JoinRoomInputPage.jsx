import React, { useState } from 'react';

function JoinRoomInputPage({ onBackToHome, onRoomIdSubmit }) {
  const [roomId, setRoomId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
      onRoomIdSubmit(roomId.trim());
    } else {
      alert('กรุณาใส่เลขห้อง');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 p-4 text-white">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md animate-fade-in-up">
        <h2 className="text-4xl font-extrabold text-[#E83E8C] mb-6 text-center">
          เข้าร่วมห้อง
        </h2>
        <p className="text-gray-600 text-center mb-8">
          กรุณาใส่เลขห้อง Cyber Wars
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="roomId" className="block text-gray-700 text-sm font-bold mb-2">
              เลขห้อง:
            </label>
            <input
              type="text"
              id="roomId"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 uppercase"
              placeholder="เช่น ABCDEF"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              maxLength={6} // จำกัดความยาวตาม Room ID ที่เราสร้าง
              required
            />
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={onBackToHome}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105 active:scale-95"
            >
              ย้อนกลับ
            </button>
            <button
              type="submit"
              className="bg-[#E83E8C] hover:bg-[#c6287c] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105 active:scale-95"
            >
              ตกลง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinRoomInputPage;
