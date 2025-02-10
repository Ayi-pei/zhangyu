import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import BottomNav from '../components/BottomNav';

interface JumpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (steps: number) => void;
  direction: string;
}

interface Jump {
  direction: string;
  steps: number;
  result: string;
  timestamp: number;
  pointsEarned: number;
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

function JumpDialog({ isOpen, onClose, onConfirm, direction }: JumpDialogProps) {
  const [steps, setSteps] = useState('');
  const [error, setError] = useState('');
  const currentBalance = parseInt(localStorage.getItem('playerBalance') || '1000');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stepsNum = parseInt(steps);
    if (isNaN(stepsNum) || stepsNum < 1) {
      setError('숫자는 0보다 큰 양의 정수여야 합니다');
      return;
    }
    if (stepsNum > currentBalance) {
      setError('잔액이 부족합니다');
      return;
    }
    onConfirm(stepsNum);
    setSteps('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">전송{direction}포인트</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="关闭">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-4 text-sm text-gray-600">
          현재 잔액: {currentBalance} 포인트
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-4"
            placeholder="포인트 입력"
            autoFocus
            min="1"
            max={currentBalance}
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors"
          >
            오케이
          </button>
        </form>
      </div>
    </div>
  );
}

function GamePlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = useParams();
  const [timeLeft, setTimeLeft] = useState<number>((location.state?.duration || 3) * 60);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDirection, setCurrentDirection] = useState('');
  const [jumps, setJumps] = useState<Jump[]>(() => {
    const savedJumps = localStorage.getItem('jumpHistory');
    return savedJumps ? JSON.parse(savedJumps) : [];
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('jumpHistory', JSON.stringify(jumps.slice(-15)));
  }, [jumps]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJumpClick = (direction: string) => {
    setCurrentDirection(direction);
    setIsDialogOpen(true);
  };

  const handleJumpConfirm = (steps: number) => {
    const possibleResults = ['귀엽', '순수하', '직설적이', '섹시하'];
    const resultIndex = Math.floor(Math.random() * possibleResults.length);
    const resultText = possibleResults[resultIndex];
    const currentBalance = parseInt(localStorage.getItem('playerBalance') || '1000');
    
    let pointsEarned = 0;
    if (resultText === getDirectionLabel(currentDirection)) {
      // If the result matches the selected direction, earn 200% of the bet
      pointsEarned = steps * 2;
    } else {
      // If no match, lose the bet amount
      pointsEarned = -steps;
    }

    // Update player balance
    const newBalance = currentBalance + pointsEarned;
    localStorage.setItem('playerBalance', newBalance.toString());

    const newJump: Jump = {
      direction: currentDirection,
      steps,
      result: resultText,
      timestamp: Date.now(),
      pointsEarned
    };

    setJumps((prevJumps) => {
      const newJumps = [...prevJumps, newJump];
      return newJumps.slice(-15);
    });
  };

  const getDirectionLabel = (direction: string) => {
    switch (direction) {
      case '前': return '귀엽';
      case '后': return '순수하';
      case '左': return '직설적이';
      case '右': return '섹시하';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8c52ff] to-[#ff914d] pb-16">
      {/* Header */}
      <div className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            반환
          </button>
          <h1 className="text-xl font-bold">{location.state?.mode || `${mode}모드`}</h1>
          <div className="bg-blue-700 px-4 py-2 rounded-lg">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          <button
            onClick={() => handleJumpClick('前')}
            className="group relative bg-gradient-to-br from-pink-500 to-rose-500 p-8 rounded-2xl 
                     flex items-center justify-center transition-all transform hover:scale-105 
                     hover:shadow-lg active:scale-95 active:shadow-inner"
          >
            <span className="font-bold text-2xl text-white">귀엽</span>
          </button>
          <button
            onClick={() => handleJumpClick('后')}
            className="group relative bg-gradient-to-br from-purple-500 to-indigo-500 p-8 rounded-2xl 
                     flex items-center justify-center transition-all transform hover:scale-105 
                     hover:shadow-lg active:scale-95 active:shadow-inner"
          >
            <span className="font-bold text-2xl text-white">순수하</span>
          </button>
          <button
            onClick={() => handleJumpClick('左')}
            className="group relative bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-2xl 
                     flex items-center justify-center transition-all transform hover:scale-105 
                     hover:shadow-lg active:scale-95 active:shadow-inner"
          >
            <span className="font-bold text-2xl text-white">직설적이</span>
          </button>
          <button
            onClick={() => handleJumpClick('右')}
            className="group relative bg-gradient-to-br from-orange-500 to-amber-500 p-8 rounded-2xl 
                     flex items-center justify-center transition-all transform hover:scale-105 
                     hover:shadow-lg active:scale-95 active:shadow-inner"
          >
            <span className="font-bold text-2xl text-white">섹시하</span>
          </button>
        </div>

        {/* Jump History */}
        {jumps.length > 0 && (
          <div className="mt-8 bg-white bg-opacity-90 rounded-lg p-4 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">선택 기록</h2>
            <div className="space-y-2">
              {jumps.map((jump, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded transition-opacity animate-fade-in"
                >
                  <span>{getDirectionLabel(jump.direction)}</span>
                  <div className="flex gap-4">
                    <span>전송：{jump.steps}포인트</span>
                    <span className="font-semibold">결론：{jump.result}</span>
                    <span className={`font-semibold ${jump.pointsEarned >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {jump.pointsEarned >= 0 ? '+' : ''}{jump.pointsEarned}
                    </span>
                    <span className="text-sm text-gray-500">{formatTimestamp(jump.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <JumpDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleJumpConfirm}
        direction={getDirectionLabel(currentDirection)}
      />

      <BottomNav />
    </div>
  );
}

export default GamePlay;
