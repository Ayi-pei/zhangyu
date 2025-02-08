import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop as Octopus, Clock3, Clock5, Clock12 } from 'lucide-react';
import BottomNav from '../components/BottomNav';

interface GameMode {
  name: string;
  duration: number;
  icon: React.ReactNode;
  path: string;
}

const gameModes: GameMode[] = [
  { name: "정식-3분", duration: 3, icon: <Clock3 className="w-6 h-6" />, path: "3min" },
  { name: "고급-5분", duration: 5, icon: <Clock5 className="w-6 h-6" />, path: "5min" },
  { name: "일반-12분", duration: 12, icon: <Clock12 className="w-6 h-6" />, path: "12min" },
];

const carouselImages = [
  "/images/carousel-1.jpg",
  "/images/carousel-2.jpg",
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleModeSelect = (mode: GameMode) => {
    navigate(`/play/${mode.path}`, {
      state: {
        mode: mode.name,
        duration: mode.duration
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 pb-16">
      {/* Carousel */}
      <div className="relative h-64 overflow-hidden">
        {carouselImages.map((img, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Game Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Game Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
            <Octopus className="w-10 h-10" />
            만남
          </h1>
        </div>

        {/* Game Modes */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {gameModes.map((mode) => (
            <button
              key={mode.name}
              onClick={() => handleModeSelect(mode)}
              className="p-6 rounded-lg text-white text-center transition-all bg-blue-700 hover:bg-blue-600 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-2">
                {mode.icon}
                <span className="font-semibold">{mode.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Home;