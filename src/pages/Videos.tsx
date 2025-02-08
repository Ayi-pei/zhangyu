import React, { useState } from 'react';
import { Play } from 'lucide-react';
import BottomNav from '../components/BottomNav';

// 生成视频数据，视频和缩略图均为本地文件
const generateVideos = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `인기 최고 비디오 ${i + 1}`,
    thumbnail: `/images/thumbnail-${i + 1}.jpg`, // public/images/thumbnail-?.jpg
    url: `/videos/video-${i + 1}.mp4` // public/videos/video-?.mp4
  }));
};

const VIDEOS_PER_PAGE = 12;
const ALL_VIDEOS = generateVideos(36); // 生成36个视频数据

function Videos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const totalPages = Math.ceil(ALL_VIDEOS.length / VIDEOS_PER_PAGE);
  const currentVideos = ALL_VIDEOS.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">비디오 목록</h1>
      </div>

      {/* 当选中视频时，显示视频播放器 */}
      {selectedVideo && (
        <div className="aspect-video bg-black" aria-label="视频播放器">
          <video src={selectedVideo} className="w-full h-full" controls autoPlay />
        </div>
      )}

      {/* 视频列表 */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {currentVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full aspect-video object-cover"
              />
              <button
                onClick={() => setSelectedVideo(video.url)}
                aria-label={`비디오 재생：${video.title}`}
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                <Play className="w-12 h-12 text-white" />
              </button>
            </div>
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-800">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex justify-center gap-2 my-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded-full ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

export default Videos;
