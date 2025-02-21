import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, CreditCard, Wallet2, MessageCircle, LogOut, Star, ArrowLeft } from 'lucide-react';
import './Profile.css';
import BottomNav from '../components/BottomNav';

const Profile = () => {
  const [showSupportDialog, setShowSupportDialog] = useState(false);

  // 用户信息
  const playerStats = {
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    nickname: '플레이어:001',
    balance: 1000,
    reputation: 100,
    vipLevel: 1,
  };

  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="back-btn"
        aria-label="返回首页"
      >
        <ArrowLeft className="w-4 h-4 inline-block mr-2" />
        返回首页
      </button>

      <div className="user-info">
        <div className="flex items-center gap-4">
          <img
            src={playerStats.avatar}
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">{playerStats.nickname}</h2>
            <div className="vip-badge">
              <Star className="w-4 h-4" />
              <span>VIP {playerStats.vipLevel}</span>
            </div>
          </div>
        </div>
        
        <div className="stats-container">
          <div className="stat-item">
            현재 잔액: {playerStats.balance}
          </div>
          <div className="stat-item">
            신용점수: {playerStats.reputation}
          </div>
        </div>
      </div>

      <div className="functions">
        <button
          type="button"
          onClick={() => navigate('/history')}
          className="function-btn history"
        >
          <History className="w-5 h-5" />
          历史记录
        </button>
        <button
          type="button"
          onClick={() => navigate('/bindingform')}
          className="function-btn binding"
        >
          <CreditCard className="w-5 h-5" />
          绑定银行卡
        </button>
        <button
          type="button"
          onClick={() => navigate('/rechargeform')}
          className="function-btn recharge"
        >
          <Wallet2 className="w-5 h-5" />
          积分充值
        </button>
        <button
          type="button"
          onClick={() => navigate('/supportdialog')}
          className="function-btn support"
        >
          <MessageCircle className="w-5 h-5" />
          联系客服
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="function-btn exit col-span-full"
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </button>
      </div>

      {showSupportDialog && (
        <div className={`support-dialog ${showSupportDialog ? 'show' : ''}`}>
          <div className="support-dialog-content">
            <h3 className="text-xl font-bold mb-4">联系客服</h3>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => setShowSupportDialog(false)}
            >
              关闭
            </button>
          </div>
        </div>
      )}

      <BottomNav className="fixed bottom-0 left-0 w-full" />
    </div>
  );
};

export default Profile;
