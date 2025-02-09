import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function CustomerSupport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pink-500 p-4">
      {/* 返回按钮：调用 navigate(-1) 返回上一页，或者指定返回路径 */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 from-[#8657e4] to-[#f38846]"
      >
        <ArrowLeft className="w-5 h-5" />
        返回
      </button>

      <h1 className="text-2xl font-bold mt-4">서비스 센터-다회</h1>
      {/* 这里可以添加客服聊天界面的内容 */}
      <p className="mt-2">여기는 고객 서비스 채팅 페이지입니다. 여기서 고객 서비스와 실시간으로 소통할 수 있습니다. 바쁠 때는 5-10분 정도 기다려야 할 수 있습니다~ 저희는 메시지를 확인하는 즉시 답글을 드리겠습니다.</p>
    </div>
  );
}

export default CustomerSupport;
