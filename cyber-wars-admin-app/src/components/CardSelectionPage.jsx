import React, { useState, useEffect } from 'react';
import allCards from './allCards';

function CardSelectionPage({ startingMoney = 1000, onReady }) {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [selectedCards, setSelectedCards] = useState([]);
  const [moneyLeft, setMoneyLeft] = useState(startingMoney);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleCard = (card) => {
    const isSelected = selectedCards.find((c) => c.id === card.id);
    if (isSelected) {
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
      setMoneyLeft(moneyLeft + card.price);
    } else if (moneyLeft >= card.price) {
      setSelectedCards([...selectedCards, card]);
      setMoneyLeft(moneyLeft - card.price);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      {/* เวลาถอยหลัง */}
      <div className="absolute top-4 right-4 text-xl font-bold text-red-600">
        ⏳ {formatTime(timeLeft)}
      </div>

      {/* เงินคงเหลือ */}
      <div className="mb-4 text-lg font-semibold text-green-700">
        💰 เงินคงเหลือ: {moneyLeft} บาท
      </div>

      {/* ตารางการ์ด 5x2 */}
      <div className="grid grid-cols-5 gap-4">
        {CARD_DATA.map((card) => {
          const isSelected = selectedCards.find((c) => c.id === card.id);
          return (
            <div
              key={card.id}
              onClick={() => toggleCard(card)}
              className={`border-4 rounded-lg p-2 cursor-pointer flex flex-col items-center ${
                isSelected ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
              }`}
            >
              <img src={card.image} alt={card.name} className="w-24 h-36 object-cover mb-2" />
              <div className="text-sm">{card.name}</div>
              <div className="text-sm text-gray-700">ราคา: {card.price} ฿</div>
            </div>
          );
        })}
      </div>

      {/* ถาดใส่การ์ด */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="font-bold mb-2">🧺 ถาดของฉัน</h3>
        <div className="flex gap-2 overflow-x-auto">
          {selectedCards.map((card) => (
            <img
              key={card.id}
              src={card.image}
              alt={card.name}
              onClick={() => toggleCard(card)}
              className="w-16 h-24 object-cover cursor-pointer border border-gray-400"
              title="คลิกเพื่อคืนการ์ด"
            />
          ))}
        </div>
      </div>

      {/* ปุ่มพร้อม */}
      <button
        className="fixed bottom-8 right-8 px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 shadow-lg"
        onClick={() => onReady(selectedCards)}
      >
        ✅ พร้อมแล้ว
      </button>
    </div>
  );
}

export default CardSelectionPage;
