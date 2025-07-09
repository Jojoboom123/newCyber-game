import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';

import HomePage from './components/HomePage';
import CreateRoomPage from './components/CreateRoomPage';
import JoinRoomInputPage from './components/JoinRoomInputPage';
import PlayerNameInputPage from './components/PlayerNameInputPage';
import RoomLobbyPage from './components/RoomLobbyPage';
import PreparationCountdownPage from './components/PreparationCountdownPage';
import PlayerWaitingPage from "./components/PlayerWaitingPage";
import GameScreenPage from './components/GameScreenPage';

const socket = io('http://localhost:3001');

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [roomDetails, setRoomDetails] = useState(null);
  const [joinedRoomId, setJoinedRoomId] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [connectedPlayers, setConnectedPlayers] = useState([]);
  const [preparationEndTime, setPreparationEndTime] = useState(null);

  // *** เพิ่ม state เก็บการ์ดที่ผู้เล่นเลือก ***
  const [selectedCards, setSelectedCards] = useState([]);
  const [moneyLeft, setMoneyLeft] = useState(0);

  const handleBack = useCallback(() => {
    switch (currentView) {
      case 'createRoom':
      case 'joinRoomInput':
        setCurrentView('home');
        setIsAdmin(false);
        setRoomDetails(null);
        setJoinedRoomId(null);
        setPlayerName('');
        setPreparationEndTime(null);
        setSelectedCards([]);
        setMoneyLeft(0);
        break;
      case 'playerNameInput':
        setCurrentView('joinRoomInput');
        setPlayerName('');
        break;
      case 'roomLobby':
      case 'preparationPhase':
      case 'gameScreen':
        if (roomDetails && roomDetails.roomId) {
          socket.emit('leave_room', { roomId: roomDetails.roomId, username: playerName });
          console.log(`User ${playerName} leaving room ${roomDetails.roomId}`);
        }
        setCurrentView('home');
        setRoomDetails(null);
        setJoinedRoomId(null);
        setPlayerName('');
        setIsAdmin(false);
        setConnectedPlayers([]);
        setPreparationEndTime(null);
        setSelectedCards([]);
        setMoneyLeft(0);
        break;
      default:
        setCurrentView('home');
        setIsAdmin(false);
        setRoomDetails(null);
        setJoinedRoomId(null);
        setPlayerName('');
        setPreparationEndTime(null);
        setSelectedCards([]);
        setMoneyLeft(0);
    }
  }, [currentView, roomDetails, playerName]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server:', socket.id);
    });

    socket.on('room_created', (roomData) => {
      setRoomDetails(roomData);
      setIsAdmin(true);
      setCurrentView('roomLobby');
    });

    socket.on('room_details_update', (details) => {
      setRoomDetails(details);
      if (!isAdmin && details.roomId) {
        setJoinedRoomId(details.roomId);
      }
      if (details.gameStarted === false && currentView !== 'roomLobby') {
        setCurrentView('roomLobby');
      }
      // อัปเดตเงินเริ่มต้น (ถ้ามี)
      if (details.startingMoney) {
        setMoneyLeft(details.startingMoney);
      }
    });

    socket.on('admin_update_users', (userList) => {
      setConnectedPlayers(userList);
      // หาเงินเหลือของผู้เล่นใน list แล้วอัปเดต (ถ้ามี)
      const me = userList.find(u => u.username === playerName);
      if (me) setMoneyLeft(me.moneyLeft || 0);
    });

    socket.on('preparation_phase_started', (data) => {
      setRoomDetails(data.roomDetails);
      setPreparationEndTime(data.endTime);
      setCurrentView('preparationPhase');
    });

    socket.on('game_started', (updatedRoomDetails) => {
      setRoomDetails(updatedRoomDetails);
      setPreparationEndTime(null);
      setCurrentView('gameScreen');
    });

    socket.on('update_player_cards', ({ username, selectedCards, moneyLeft }) => {
      if (username === playerName) {
        setSelectedCards(selectedCards);
        setMoneyLeft(moneyLeft);
      }
    });

    socket.on('join_error', (message) => {
      alert(`Error joining room: ${message}`);
      setCurrentView('home');
      setJoinedRoomId(null);
      setRoomDetails(null);
      setPlayerName('');
      setIsAdmin(false);
    });

    socket.on('error_message', (message) => {
      alert(`Error: ${message}`);
    });

    socket.on('disconnect', () => {
      setRoomDetails(null);
      setJoinedRoomId(null);
      setPlayerName('');
      setIsAdmin(false);
      setConnectedPlayers([]);
      setPreparationEndTime(null);
      setCurrentView('home');
      setSelectedCards([]);
      setMoneyLeft(0);
    });

    return () => {
      socket.off('connect');
      socket.off('room_created');
      socket.off('room_details_update');
      socket.off('admin_update_users');
      socket.off('preparation_phase_started');
      socket.off('game_started');
      socket.off('update_player_cards');
      socket.off('join_error');
      socket.off('error_message');
      socket.off('disconnect');
    };
  }, [isAdmin, currentView, playerName]);

  const handleCreateRoomClick = () => {
    setIsAdmin(true);
    setCurrentView('createRoom');
  };

  const handleJoinRoomClick = () => {
    setIsAdmin(false);
    setCurrentView('joinRoomInput');
  };

  const handleCreateRoomSubmit = (data) => {
    socket.emit('admin_create_room', data);
  };

  const handleRoomIdSubmit = (id) => {
    setJoinedRoomId(id);
    setCurrentView('playerNameInput');
  };

  const handlePlayerNameSubmit = (name) => {
    setPlayerName(name);
    socket.emit('join_room', { username: name, room: joinedRoomId });
  };

  const handleStartGame = () => {
    if (roomDetails && roomDetails.roomId) {
      socket.emit('start_game', { roomId: roomDetails.roomId });
    }
  };

  const handleSkipPreparation = () => {
    if (roomDetails && roomDetails.roomId) {
      socket.emit('skip_preparation_phase', { roomId: roomDetails.roomId });
    }
  };

  // ฟังก์ชันส่งข้อมูลการ์ดที่ผู้เล่นเลือกไป server
  const handleSelectCard = (card) => {
    if (!roomDetails) return;
    const price = card.price || 0;
    if (moneyLeft < price) return; // เงินไม่พอซื้อการ์ดนี้

    // toggle เลือกการ์ดใน selectedCards
    let newSelectedCards;
    const index = selectedCards.findIndex(c => c.id === card.id);
    if (index === -1) {
      // ยังไม่เลือก ใส่เพิ่ม
      if (selectedCards.length >= 10) return; // จำกัด 10 ใบ
      newSelectedCards = [...selectedCards, card];
    } else {
      // เลือกแล้ว เอาออก
      newSelectedCards = selectedCards.filter(c => c.id !== card.id);
    }

    setSelectedCards(newSelectedCards);

    // ส่งไป server
    socket.emit('player_select_cards', {
      roomId: roomDetails.roomId,
      username: playerName,
      selectedCards: newSelectedCards,
    });
  };

  const handleOpenSettings = () => {
    alert('เปิดหน้าตั้งค่า (สามารถกลับไปที่ CreateRoomPage หรือ Modals ได้)');
  };

  return (
    <div className="App">
      {currentView === 'home' && (
        <HomePage
          onGoToCreateRoom={handleCreateRoomClick}
          onGoToJoinRoom={handleJoinRoomClick}
        />
      )}

      {currentView === 'createRoom' && (
        <CreateRoomPage
          onBack={handleBack}
          onCreateRoom={handleCreateRoomSubmit}
        />
      )}

      {currentView === 'joinRoomInput' && (
        <JoinRoomInputPage
          onBackToHome={handleBack}
          onRoomIdSubmit={handleRoomIdSubmit}
        />
      )}

      {currentView === 'playerNameInput' && (
        <PlayerNameInputPage
          onBack={handleBack}
          onPlayerNameSubmit={handlePlayerNameSubmit}
          roomId={joinedRoomId}
        />
      )}

      {currentView === 'roomLobby' && roomDetails && (
        <RoomLobbyPage
          roomDetails={roomDetails}
          onOpenObserverView={() => console.log('Open OB View')}
          onOpenSettings={handleOpenSettings}
          isAdmin={isAdmin}
          connectedPlayers={connectedPlayers}
          playerName={playerName}
          onBack={handleBack}
          onStartGame={handleStartGame}
        />
      )}

      {currentView === 'preparationPhase' && roomDetails && (
        isAdmin ? (
          <PreparationCountdownPage
            roomDetails={roomDetails}
            isAdmin={isAdmin}
            preparationEndTime={preparationEndTime}
            onSkipPreparation={handleSkipPreparation}
          />
        ) : (
          <PlayerWaitingPage
            roomDetails={roomDetails}
          />
        )
      )}

      {currentView === 'gameScreen' && roomDetails && (
        <GameScreenPage
          roomDetails={roomDetails}
          connectedPlayers={connectedPlayers.filter(p => p.room === roomDetails.roomId)}
          playerName={playerName}
          isAdmin={isAdmin}
          currentSocketId={socket.id}

          // เพิ่ม prop สำหรับ card selection และฟังก์ชันจัดการเลือกการ์ด
          selectedCards={selectedCards}
          moneyLeft={moneyLeft}
          onSelectCard={handleSelectCard}
        />
      )}
    </div>
  );
}

export default App;
