import React from 'react';

function GameScreenPage({ selectedCards, moneyLeft, onSelectCard }) {
  // สมมติการ์ดมีข้อมูล id, name, price, imageUrl (คุณเปลี่ยนตามของจริง)
  const allCards = [
    { id: 'c1', name: 'Card 1', price: 110, image: '/cards/Cards1.png' },
    { id: 'c2', name: 'Card 2', price: 150, image: '/cards/Cards2.png' },
    { id: 'c3', name: 'Card 3', price: 200, image: '/cards/Cards3.png' },
    { id: 'card4', name: 'Card 4', price: 40, image: '/cards/Cards4.png' },
    { id: 'card5', name: 'Card 5', price: 25, image: '/cards/Cards5.png' },
    { id: 'card6', name: 'Card 6', price: 30, image: '/cards/Cards6.png' },
    { id: 'card7', name: 'Card 7', price: 30, image: '/cards/Cards7.png' },
    { id: 'card8', name: 'Card 8', price: 35, image: '/cards/Cards8.png' },
    { id: 'card9', name: 'Card 9', price: 20, image: '/cards/Cards9.png' },
    { id: 'card10', name: 'Card 10', price: 20, image: '/cards/Cards10.png' },
    { id: 'card11', name: 'Card 11', price: 15, image: '/cards/Cards11.png' },
    { id: 'card12', name: 'Card 12', price: 0, image: '/cards/Cards12.png' },
    { id: 'card13', name: 'Card 13', price: 15, image: '/cards/Cards13.png' },
  ];

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
