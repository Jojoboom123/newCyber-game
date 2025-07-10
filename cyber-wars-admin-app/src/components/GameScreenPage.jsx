import React from 'react';
import allCards from './allCards';

function GameScreenPage({ selectedCards, moneyLeft, onSelectCard }) {
  // ฟังก์ชันเช็คว่าการ์ดถูกเลือกแล้วหรือยัง
  const isSelected = (cardId) => selectedCards.some(c => c.id === cardId);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <strong>เงินที่เหลือ: {moneyLeft} บาท</strong>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '600px' }}>
        {allCards.map(card => (
          <div
            key={card.id}
            onClick={() => onSelectCard(card)}
            style={{
              border: isSelected(card.id) ? '3px solid green' : '1px solid gray',
              borderRadius: '5px',
              padding: '5px',
              width: '100px',
              cursor: moneyLeft >= card.price || isSelected(card.id) ? 'pointer' : 'not-allowed',
              opacity: moneyLeft >= card.price || isSelected(card.id) ? 1 : 0.5,
              userSelect: 'none',
            }}
            title={`${card.name} - ราคา ${card.price} บาท`}
          >
            <img src={card.image} alt={card.name} style={{ width: '100%', height: 'auto' }} />
            <div style={{ textAlign: 'center' }}>{card.name}</div>
            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{card.price} ฿</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <strong>ถาดการ์ดที่เลือก (คลิกการ์ดในนี้เพื่อลบ):</strong>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', maxWidth: '600px', flexWrap: 'wrap' }}>
          {selectedCards.length === 0 && <div>ยังไม่มีการ์ดที่เลือก</div>}
          {selectedCards.map(card => (
            <div
              key={card.id}
              onClick={() => onSelectCard(card)}
              style={{
                border: '2px solid blue',
                borderRadius: '5px',
                padding: '5px',
                width: '100px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
              title={`ลบ ${card.name}`}
            >
              <img src={card.image} alt={card.name} style={{ width: '100%', height: 'auto' }} />
              <div style={{ textAlign: 'center' }}>{card.name}</div>
              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{card.price} ฿</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameScreenPage;
