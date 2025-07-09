import React, { useState } from 'react';

function CreateRoomPage({ onCreateRoom }) {
  const [roomName, setRoomName] = useState('');
  const [startingMoney, setStartingMoney] = useState(1000); // เงินเริ่มต้น
  const [questionTimeLimit, setQuestionTimeLimit] = useState(180); // default 3 นาที

  const handleSubmit = (e) => {
    e.preventDefault();

    const preparationEndTime = Date.now() + 5 * 60 * 1000; // ฟิกซ์ไว้ที่ 5 นาที

    onCreateRoom({
      roomName,
      preparationEndTime,
      startingMoney,
      questionTimeLimit,
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">สร้างห้อง</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="ชื่อห้อง"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="number"
          placeholder="จำนวนเงินเริ่มต้น"
          value={startingMoney}
          onChange={(e) => setStartingMoney(parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <select
          value={questionTimeLimit}
          onChange={(e) => setQuestionTimeLimit(parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded"
        >
          <option value={60}>1 นาที</option>
          <option value={120}>2 นาที</option>
          <option value={180}>3 นาที</option>
          <option value={300}>5 นาที</option>
          <option value={600}>10 นาที</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ✅ สร้างห้อง
        </button>
      </form>
    </div>
  );
}

export default CreateRoomPage;
