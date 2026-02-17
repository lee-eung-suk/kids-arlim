import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 bg-orange-200 rounded-full opacity-30 animate-ping"></div>
        <div className="relative bg-white p-6 rounded-full shadow-xl border-4 border-orange-100 flex items-center justify-center">
          <span className="text-4xl animate-bounce">🎨</span>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-orange-800 mb-2 font-hand">
        지수의 이야기를 쓰고 있어요...
      </h3>
      <p className="text-orange-600 animate-pulse">
        사진을 보며 어떤 활동인지 생각하는 중이에요!
      </p>
    </div>
  );
};