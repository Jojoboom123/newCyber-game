// src/components/RoomLobbyPage.jsx
import React from 'react';

// ตรวจสอบว่ารับ onOpenObserverView เป็น prop
function RoomLobbyPage({ roomDetails, onOpenObserverView, onOpenSettings, isAdmin, connectedPlayers, playerName, onBack, onStartGame }) {
  if (!roomDetails) {
    return (
      <div className="text-white text-center min-h-screen bg-gray-900 flex items-center justify-center">
        Loading room details...
      </div>
    );
  }

  const playersInRoom = connectedPlayers.filter(player => player.room === roomDetails.roomId);
  const currentPlayer = playersInRoom.find(player => player.username === playerName);

  const handleOpenObserverTab = () => {
    // สร้าง URL สำหรับ Observer View
    // ในที่นี้ เราจะเปิดไปที่ URL เดียวกันกับหน้าปัจจุบัน แต่มี query parameter เพิ่มเติม
    // เช่น http://localhost:5173/?view=observer&roomId=YOUR_ROOM_ID
    // หรือถ้าต้องการหน้าเปล่าๆ เลย ก็เปิดแค่ http://localhost:5173/observer (ซึ่งต้องมี Route สำหรับ /observer ใน App.jsx)
    
    // สำหรับการเปิดหน้าเปล่าๆ หรือหน้า Observer แยกออกมาอย่างง่าย:
    // คุณสามารถเปลี่ยน '/observer-view-placeholder' เป็น Path ที่คุณต้องการได้
    // ถ้าคุณต้องการให้เป็นหน้าว่างๆ ที่สามารถใส่เนื้อหา Observer ในอนาคต
    const observerUrl = `${window.location.origin}/observer-view-placeholder?roomId=${roomDetails.roomId}`;
    window.open(observerUrl, '_blank'); // '_blank' คือการเปิดในแท็บใหม่
    onOpenObserverView(); // เรียก prop เพื่อ log หรือ trigger event ใน App.jsx (ถ้ามี)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">ห้อง: {roomDetails.roomName}</h1>
      <p className="text-xl mb-4">รหัสห้อง: <span className="font-bold text-green-400">{roomDetails.roomId}</span></p>

      {isAdmin && (
        <p className="text-lg text-yellow-400 mb-4">คุณคือผู้ดูแลห้องนี้</p>
      )}

      {!isAdmin && (
        <p className="text-lg text-gray-300 mb-4">คุณได้เข้าร่วมห้องแล้ว โปรดรอ Admin เริ่มเกม...</p>
      )}

      <div className="mt-6 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">ผู้เข้าร่วม ({playersInRoom.length}/{roomDetails.maxPlayers})</h3>
        <ul className="list-disc list-inside space-y-2">
          {playersInRoom.length === 0 ? (
            <p className="text-gray-400">ยังไม่มีผู้เล่นเข้าร่วม...</p>
          ) : (
            playersInRoom.map(player => (
              <li key={player.id} className="text-lg">
                {player.username} {player.id === currentPlayer?.id ? '(คุณ)' : ''}
                {player.isAdmin && ' (Admin)'}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mt-8 flex space-x-4">
        {isAdmin && (
          <>
            <button
              onClick={onStartGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 text-xl"
            >
              ▶️ เริ่มเกม
            </button>
            <button
              onClick={handleOpenObserverTab} // <<< เปลี่ยนมาเรียกฟังก์ชันนี้
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 text-xl"
            >
              👁️ เปิด Observer View
            </button>
            <button
              onClick={onOpenSettings}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 text-xl"
            >
              ⚙️ ตั้งค่า
            </button>
          </>
        )}
        <button
          onClick={onBack}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 text-xl"
        >
          ⬅️ กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
}

export default RoomLobbyPage;