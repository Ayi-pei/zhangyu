import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, RefreshCw, History, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

function Profile() {
  const navigate = useNavigate();
  const playerStats = {
    steps: 1000,
    health: 100,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    nickname: '플레이어:001',
    gamesPlayed: 42
  };

  const menuItems = [
    { icon: <History className="w-6 h-6" />, label: '이력 참여 횟수', value: playerStats.gamesPlayed },
    { icon: <RefreshCw className="w-6 h-6" />, label: '충전 보충', action: () => {} },
    { icon: <MessageCircle className="w-6 h-6" />, label: '고객 지원', action: () => {} },
    { icon: <LogOut className="w-6 h-6" />, label: '종료 후퇴', action: () => navigate('/') }
  ];

  const [error, setError] = useState('');

  const handleAction = (action?: () => void) => {
    if (action) {
      try {
        // 调用 action
        action();
      } catch {
        setError('작업을 처리하는 동안 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8c52ff] to-[#ff914d] pb-16">
      <div className="bg-blue-600 text-white p-4 rounded-b-lg">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-4 hover:text-blue-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          뒤로 가기
        </button>

        <div className="flex items-center gap-4 mt-4">
          <img
            src={playerStats.avatar}
            alt="Avatar"
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div>
            <h2 className="text-xl font-bold">{playerStats.nickname}</h2>
            <div className="flex gap-4 mt-2 text-sm">
              <span>현재 잔액：{playerStats.steps}</span>
              <span>신용점수：{playerStats.health}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleAction(item.action)}
            className="w-full bg-white rounded-lg p-4 flex items-center justify-between shadow-sm transition-all hover:bg-gray-200 transform hover:scale-105"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-gray-800">{item.label}</span>
            </div>
            {item.value && (
              <span className="text-gray-600">{item.value}</span>
            )}
          </button>
        ))}
      </div>

      {error && (
        <div className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-md animate-fade-in">
          <span>{error}</span>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default Profile;
