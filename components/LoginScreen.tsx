import React from 'react';
import { User, LogIn } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const handleLogin = () => {
    // Simulating Google Auth for the demo since we don't have a backend/Client ID
    onLogin("김선생님");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 px-4">
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <User className="w-10 h-10 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-orange-800 font-hand">알림장 톡톡</h1>
        <p className="text-orange-600">학부모님께 보낼 따뜻한 이야기를 만들어보세요</p>
      </div>

      <button
        onClick={handleLogin}
        className="w-full max-w-xs bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-105"
      >
        <LogIn className="w-5 h-5 text-blue-500" />
        <span>구글 계정으로 시작하기</span>
      </button>

      <p className="text-xs text-orange-400 mt-8 text-center max-w-xs">
        * 실제 서비스에서는 Google Workspace 계정과 연동되어 드라이브에 자동 저장됩니다.
      </p>
    </div>
  );
};