import React, { useState, useRef,useEffect } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'
import { fetchPrizes, startLottery } from './services/lotteryService';

export default function App() {
  const [blocks] = useState([
    { padding: '10px', background: '#869cfa' }
  ])
  const [activityId] = useState(100001); // Replace with your actual activity ID
  const [userId] = useState("2"); // Replace with your actual user ID
  const [setPrizes] = useState([]);

  const [selectedPrize, setSelectedPrize] = useState({ id: null, name: '' });

  const [prizes] = useState([
    { background: '#e9e8fe', fonts: [{ text: '0' }] },
    { background: '#b8c5f2', fonts: [{ text: '1' }] },
    { background: '#e9e8fe', fonts: [{ text: '2' }] },
    { background: '#b8c5f2', fonts: [{ text: '3' }] },
    { background: '#e9e8fe', fonts: [{ text: '4' }] },
    { background: '#b8c5f2', fonts: [{ text: '5' }] },
  ]);
  const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '30%', background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始', top: '-10px' }]
    }
  ]);
  const myLucky = useRef();

  useEffect(() => {
    const initializePrizes = async () => {
      try {
        const prizesData = await fetchPrizes(activityId);
        setPrizes(prizesData);
      } catch (error) {
        console.error('Error fetching prizes:', error);
      }
    };

    // initializePrizes();
  }, [activityId]);


  const handleStart = async (myLucky) => {
    try {
      const result = await startLottery("bs8", 100002);
      setTimeout(() => {
        myLucky.current.stop(result.prizeId);
        setSelectedPrize({ id: result.prizeId, name: result.prizeName });
      }, 2500);
    } catch (error) {
      console.error('Error fetching lottery result:', error);
    }
  };

  const handleEnd = (prize) => {
    console.log(prize.fonts);
    alert(`恭喜你抽到 ${prize.fonts[0].text} 号奖品${selectedPrize.name}`);
  };

  return (
    <div>
      <LuckyWheel
        ref={myLucky}
        width="300px"
        height="300px"
        blocks={blocks}
        prizes={prizes}
        buttons={buttons}
        onStart={() => {
          myLucky.current.play();
          handleStart(myLucky);
        }}
        onEnd={handleEnd}
      />
    </div>
  );
};