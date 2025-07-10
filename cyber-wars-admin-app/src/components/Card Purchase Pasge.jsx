import React, { useEffect, useState } from 'react';
import allCards from './allCards';

function CardPurchasePage({ startingMoney = 1000, onReady }) {
  const [money, setMoney] = useState(startingMoney);
  const [selectedCards, setSelectedCards] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 นาที

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCardClick = (card) => {
    const alreadySelected = selectedCards.find((c) => c.id === card.id);

    if (alreadySelected) {
      // ยกเลิกการเลือก
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
      setMoney(money + card.price);
    } else {
      if (money >= card.price) {
        setSelectedCards([...selectedCards, card]);
        setMoney(money - card.price);
      } else {
        alert('เงินของคุณไม่พอ!');
      }
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-4 items-center">
        <div className="text-lg font-bold">💰 เงินคงเหลือ: {money}</div>
        <div className="text-red-600 font-bold text-lg">⏱ เหลือเวลา: {formatTime(timeLeft)}</div>
        <button
          onClick={() => onReady(selectedCards)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ✅ พร้อมแล้ว
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {cardData.map((card) => {
          const isSelected = selectedCards.find((c) => c.id === card.id);
          return (
            <div
              key={card.id}
              className={`border rounded-lg p-2 cursor-pointer text-center transition duration-200 hover:shadow-lg ${isSelected ? 'border-green-500' : 'border-gray-300'}`}
              onClick={() => handleCardClick(card)}
            >
              <img src={card.image} alt={card.name} className="w-full h-24 object-cover rounded" />
              <div className="mt-2 text-sm font-semibold">{card.name}</div>
              <div className="text-xs text-gray-600">ราคา {card.price}</div>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4">
        <h3 className="font-bold mb-2">🧺 ถาดการ์ดที่เลือก</h3>
        <div className="flex flex-wrap gap-2">
          {selectedCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="w-20 h-28 border rounded p-1 cursor-pointer bg-white hover:opacity-80"
            >
              <img src={card.image} alt={card.name} className="w-full h-full object-cover rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardPurchasePage;
