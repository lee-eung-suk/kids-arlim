import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Share2, ArrowLeft, Check } from 'lucide-react';
import { ActivityData } from '../types';

interface PosterPreviewProps {
  data: ActivityData;
  onReset: () => void;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({ data, onReset }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleDownload = async () => {
    if (!posterRef.current) return;

    try {
      setIsSaving(true);
      
      // Generate Canvas
      const canvas = await html2canvas(posterRef.current, {
        scale: 2, // Higher resolution
        useCORS: true,
        backgroundColor: '#fff7ed', // Ensure background color matches
      });

      // Generate PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Simulate Drive Upload delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      pdf.save(`${data.childName}_알림장.pdf`);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('저장에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto pb-12">
      {/* Action Bar */}
      <div className="flex justify-between items-center mb-4 px-2">
        <button 
          onClick={onReset}
          className="text-orange-600 hover:text-orange-800 flex items-center gap-1 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          처음으로
        </button>
        <span className="text-orange-400 text-xs font-hand">미리보기</span>
      </div>

      {/* Poster Area - This is what gets captured */}
      <div className="relative shadow-2xl rounded-sm overflow-hidden" ref={posterRef}>
        {/* Background Paper Texture Effect */}
        <div className="absolute inset-0 bg-[#fffdf5] opacity-100 z-0"></div>
        
        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center h-full min-h-[600px] border-[12px] border-orange-200">
          
          {/* Header Decoration */}
          <div className="w-full flex justify-center mb-6">
            <div className="bg-orange-400 text-white px-6 py-1 rounded-full text-sm font-bold shadow-sm">
              키즈 유치원 알림장 ☀️
            </div>
          </div>

          {/* Photo Frame */}
          <div className="w-full aspect-[4/3] bg-white p-2 shadow-lg rotate-1 mb-6 rounded-sm">
            <div className="w-full h-full bg-gray-100 overflow-hidden relative">
               {data.photoDataUrl && (
                <img 
                  src={data.photoDataUrl} 
                  alt="Activity" 
                  className="w-full h-full object-cover"
                />
               )}
            </div>
            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-orange-200/50 backdrop-blur-sm -rotate-2"></div>
          </div>

          {/* Content Text */}
          <div className="w-full space-y-4">
            <h1 className="text-3xl font-hand font-bold text-gray-800 break-keep leading-tight">
              {data.result?.title || '즐거운 하루!'}
            </h1>
            
            <div className="w-12 h-1 bg-orange-300 mx-auto rounded-full my-4"></div>
            
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-left font-medium">
                {data.result?.message}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-8 w-full flex justify-between items-end">
            <div className="text-left">
              <p className="text-xs text-orange-400">담임교사</p>
              <p className="font-hand text-lg text-orange-600">김선생님 🌸</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-orange-300">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-0 right-0 px-4 flex justify-center gap-4 z-50">
        <button
          onClick={handleDownload}
          disabled={isSaving}
          className={`
            flex-1 max-w-xs flex items-center justify-center gap-2 py-3 px-6 rounded-full shadow-xl 
            font-bold text-white transition-all transform hover:scale-105 active:scale-95
            ${saveSuccess ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-600'}
          `}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : saveSuccess ? (
            <>
              <Check className="w-5 h-5" />
              저장 완료!
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              구글 드라이브(PDF) 저장
            </>
          )}
        </button>
      </div>
    </div>
  );
};