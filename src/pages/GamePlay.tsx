import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUp, ArrowDown, ArrowLeft as ArrowLeftJump, ArrowRight, X } from 'lucide-react';
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
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

function JumpDialog({ isOpen, onClose, onConfirm, direction }: JumpDialogProps) {
  const [steps, setSteps] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stepsNum = parseInt(steps);
    if (isNaN(stepsNum) || stepsNum < 1) {
      setError('步数必须为大于零的正整数');
      return;
    }
    onConfirm(stepsNum);
    setSteps('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">输入{direction}步数</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="关闭">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-4"
            placeholder="输入步数"
            autoFocus
            min="1"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors"
          >
            确定
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
    // 生成 0 到 steps 之间的随机数
    const result = Math.floor(Math.random() * (steps + 1));
    const newJump: Jump = {
      direction: currentDirection,
      steps,
      result: `${result}步`,
      timestamp: Date.now(),
    };

    console.log('New jump:', newJump);
    setJumps((prevJumps) => {
      const newJumps = [...prevJumps, newJump];
      console.log('Updated jumps:', newJumps);
      return newJumps.slice(-15); // 保留最近 15 条记录
    });
  };

  const getDirectionLabel = (direction: string) => {
    switch (direction) {
      case '前': return '前跳';
      case '后': return '后跳';
      case '左': return '左跳';
      case '右': return '右跳';
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
            返回
          </button>
          <h1 className="text-xl font-bold">{location.state?.mode || `${mode}模式`}</h1>
          <div className="bg-blue-700 px-4 py-2 rounded-lg">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <button
            onClick={() => handleJumpClick('前')}
            className="bg-white bg-opacity-90 p-6 rounded-lg flex flex-col items-center gap-2 hover:bg-opacity-100 transition-all transform hover:scale-105"
          >
            <ArrowUp className="w-8 h-8" />
            <span>前跳</span>
          </button>
          <button
            onClick={() => handleJumpClick('后')}
            className="bg-white bg-opacity-90 p-6 rounded-lg flex flex-col items-center gap-2 hover:bg-opacity-100 transition-all transform hover:scale-105"
          >
            <ArrowDown className="w-8 h-8" />
            <span>后跳</span>
          </button>
          <button
            onClick={() => handleJumpClick('左')}
            className="bg-white bg-opacity-90 p-6 rounded-lg flex flex-col items-center gap-2 hover:bg-opacity-100 transition-all transform hover:scale-105"
          >
            <ArrowLeftJump className="w-8 h-8" />
            <span>左跳</span>
          </button>
          <button
            onClick={() => handleJumpClick('右')}
            className="bg-white bg-opacity-90 p-6 rounded-lg flex flex-col items-center gap-2 hover:bg-opacity-100 transition-all transform hover:scale-105"
          >
            <ArrowRight className="w-8 h-8" />
            <span>右跳</span>
          </button>
        </div>

        {/* Jump History */}
        {jumps.length > 0 && (
          <div className="mt-8 bg-white bg-opacity-90 rounded-lg p-4 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">跳跃记录</h2>
            <div className="space-y-2">
              {jumps.map((jump, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded transition-opacity animate-fade-in"
                >
                  <span>{getDirectionLabel(jump.direction)}</span>
                  <div className="flex gap-4">
                    <span>输入：{jump.steps}步</span>
                    <span className="font-semibold">结果：{jump.result}</span>
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
