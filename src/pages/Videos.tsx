import React, { useState } from 'react';
import { Play } from 'lucide-react';
import BottomNav from '../components/BottomNav';

// Vimeo 视频 ID 数组
const videoIds = [
  '1054848172/864d119fd0',
  '1054848188/08ebdc2868',
  '1054848193/2e47ea989d',
  '1054848209/e705167548',
  '1054848219/22ec4246ed',
  '1054848232/5194683afb',
  '1054848248/ccae2c6ca5',
  '1054848255/5ad28fb76c',
  '1054848261/43da8c2ffb',
  '1054848276/491f885121',
  '1054848296/1a07be9e3c',
  '1054848316/36ea7e9282',
  '1054848333/8a745e4f17',
  '1054848348/1cce4e0cc8',
  '1054848366/75fb41ea57',
  '1054848377/f3accf2201',
  '1054848386/b4c8ddeb2f',
   // 添加更多的视频 ID...
];

// 生成视频数据，使用从 videoIds 数组中获取的 ID
const generateVideos = () => {
  return videoIds.map((id, index) => ({
    id: index + 1,  // 为每个视频分配一个 ID
    title: `인기 최고 비디오 ${index + 1}`,  // 视频标题
    thumbnail: `/images/thumbnail-${index + 1}.jpg`,  // 缩略图
    url: `https://vimeo.com/${id}`,  // 使用 Vimeo 视频 ID 生成 URL
  }));
};

const VIDEOS_PER_PAGE = 12;
const ALL_VIDEOS = generateVideos();  // 生成所有的视频数据

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
          <iframe //使用 iframe 元素嵌入 Vimeo 视频
            title="온라인으로 시청 중..."
            src={selectedVideo}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}

      {/* 视频列表 */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {currentVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative">
              <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
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
            className={`w-8 h-8 rounded-full ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
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

