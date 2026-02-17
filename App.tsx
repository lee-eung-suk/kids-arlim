import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { InputScreen } from './components/InputScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { PosterPreview } from './components/PosterPreview';
import { AppStep, UserState, ActivityData } from './types';
import { generateActivityContent } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LOGIN);
  const [user, setUser] = useState<UserState>({ 
    isLoggedIn: false, 
    teacherName: '',
    folderId: '' 
  });
  const [activityData, setActivityData] = useState<ActivityData>({
    childName: '',
    photoDataUrl: null,
    result: null,
  });

  const handleStart = (name: string, folderId: string) => {
    setUser({ isLoggedIn: true, teacherName: name, folderId });
    setStep(AppStep.INPUT);
  };

  const handleInputSubmit = async (name: string, photo: string) => {
    setActivityData(prev => ({ ...prev, childName: name, photoDataUrl: photo }));
    setStep(AppStep.LOADING);

    try {
      const result = await generateActivityContent(name, photo);
      setActivityData(prev => ({ ...prev, result }));
      setStep(AppStep.RESULT);
    } catch (error) {
      console.error(error);
      alert('AI가 응답하지 못했습니다. 다시 시도해주세요.');
      setStep(AppStep.INPUT);
    }
  };

  const handleReset = () => {
    setActivityData({ childName: '', photoDataUrl: null, result: null });
    setStep(AppStep.INPUT);
  };

  return (
    <div className="min-h-screen bg-orange-50 text-gray-800 font-sans selection:bg-orange-200">
      <main className="max-w-screen-md mx-auto p-4 md:p-6 min-h-screen flex flex-col">
        {step === AppStep.LOGIN && (
          <LoginScreen onStart={handleStart} />
        )}

        {step === AppStep.INPUT && (
          <div className="flex-1 flex flex-col justify-center">
            <InputScreen 
              onSubmit={handleInputSubmit} 
              teacherName={user.teacherName} 
            />
          </div>
        )}

        {step === AppStep.LOADING && (
          <div className="flex-1 flex flex-col justify-center">
            <LoadingScreen />
          </div>
        )}

        {step === AppStep.RESULT && (
          <PosterPreview 
            data={activityData} 
            teacherName={user.teacherName}
            folderId={user.folderId}
            onReset={handleReset} 
          />
        )}
      </main>
    </div>
  );
};

export default App;