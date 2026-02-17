import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';

interface InputScreenProps {
  onSubmit: (name: string, photo: string) => void;
  teacherName: string;
}

export const InputScreen: React.FC<InputScreenProps> = ({ onSubmit, teacherName }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (name && photo) {
      onSubmit(name, photo);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-orange-800 font-hand">
          {teacherName}, 누구의 이야기를 쓸까요?
        </h2>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg space-y-6 border-2 border-orange-100">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-orange-700">학생 이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 지수"
            className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 focus:border-orange-400 focus:outline-none bg-orange-50/50 text-orange-900 placeholder-orange-300 transition-colors"
          />
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-orange-700">활동 사진</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative w-full aspect-[4/3] rounded-2xl border-4 border-dashed 
              flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all
              ${photo ? 'border-orange-300' : 'border-orange-200 hover:border-orange-400 bg-orange-50'}
            `}
          >
            {photo ? (
              <img src={photo} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <div className="bg-white p-3 rounded-full inline-block mb-2 shadow-sm">
                  <Camera className="w-8 h-8 text-orange-400" />
                </div>
                <p className="text-sm text-orange-600 font-medium">터치해서 사진 찍기</p>
                <p className="text-xs text-orange-400 mt-1">또는 앨범에서 선택</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!name || !photo}
          className={`
            w-full py-4 rounded-xl font-bold text-lg shadow-md flex items-center justify-center gap-2
            transition-all duration-200
            ${(!name || !photo) 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-orange-400 hover:bg-orange-500 text-white transform hover:scale-[1.02]'}
          `}
        >
          <Sparkles className="w-5 h-5" />
          <span>AI로 알림장 만들기</span>
        </button>
      </div>
    </div>
  );
};