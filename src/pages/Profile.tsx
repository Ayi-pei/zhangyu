import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, RefreshCw, History, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

function Profile() {
  const navigate = useNavigate();

  // 读取 localStorage 中的 jumpHistory（假设存储为 JSON 数组），获取记录数量（最多保留 15 条记录）
  const jumpHistory = JSON.parse(localStorage.getItem('jumpHistory') || '[]');
  const gamesPlayed = jumpHistory.length; // 用记录数量表示参与次数

  // 模拟的玩家信息
  const playerStats = {
    steps: 1000,
    health: 100,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    nickname: '플레이어:001',
  };

  // 定义菜单项，其中：
  // - “이력 참여 횟수”显示参与记录的数量
  // - “충전 보충”点击后弹出提示框
  // - “고객 지원”点击后跳转到客服聊天页面（路径 '/customer-support'，需自行配置该路由并实现返回功能）
  // - “종료 후퇴”点击后返回首页
  const menuItems = [
    { icon: <History className="w-6 h-6" />, label: '이력 참여 횟수', value: gamesPlayed },
    { icon: <RefreshCw className="w-6 h-6" />, label: '충전 보충', action: () => setShowRechargeDialog(true) },
    { icon: <MessageCircle className="w-6 h-6" />, label: '고객 지원', action: () => navigate('/customer-support') },
    { icon: <LogOut className="w-6 h-6" />, label: '종료 후퇴', action: () => navigate('/') },
  ];

  const [error, setError] = useState('');
  const [showRechargeDialog, setShowRechargeDialog] = useState(false);

  const handleAction = (action?: () => void) => {
    if (action) {
      try {
        action();
      } catch {
        setError('작업을 처리하는 동안 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8c52ff] to-[#ff914d] pb-16 relative">
      {/* Header */}
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

      {/* 菜单列表 */}
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
            {item.value !== undefined && <span className="text-gray-600">{item.value}</span>}
          </button>
        ))}
      </div>

      {/* 弹出充值提示框 */}
      {showRechargeDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">충전 보충 안내</h3>
              <button
                onClick={() => setShowRechargeDialog(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-4">충전 보충 관련 안내 메시지입니다. 아래 링크를 클릭하시면 충전 페이지로 이동합니다。</p>
            <a
              href="https://example.com/recharge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              충전 페이지 바로가기
            </a>
          </div>
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-md">
          <span>{error}</span>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default Profile;
