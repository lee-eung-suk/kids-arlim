import React, { useState } from 'react';
import { User, Settings, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onStart: (name: string, folderId: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [folderId, setFolderId] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      onStart(name.trim(), folderId.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 px-4">
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <User className="w-10 h-10 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-orange-800 font-hand">알림장 톡톡</h1>
        <p className="text-orange-600">선생님의 정보를 입력하고 시작해주세요</p>
      </div>

      <div className="w-full max-w-xs space-y-4">
        {/* Teacher Name Input */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-orange-700 ml-1">선생님 성함 (필수)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 김선생님"
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none bg-white text-orange-900 placeholder-orange-300"
          />
        </div>

        {/* Folder ID Input */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-orange-700 ml-1">구글 드라이브 폴더 ID (선택)</label>
          <input
            type="text"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            placeholder="폴더 ID 입력 시 해당 경로로 저장"
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:outline-none bg-white text-orange-900 placeholder-orange-300 font-mono text-sm"
          />
          <p className="text-[10px] text-orange-400 ml-1">
            * 미입력 시 PDF가 내 컴퓨터에 다운로드됩니다.
          </p>
        </div>

        <button
          onClick={handleStart}
          disabled={!name.trim()}
          className={`
            w-full mt-4 py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 font-bold transition-all duration-200
            ${!name.trim() 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-orange-500 hover:bg-orange-600 text-white transform hover:scale-105'}
          `}
        >
          <span>시작하기</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};