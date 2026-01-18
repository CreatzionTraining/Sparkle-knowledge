'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' 
    ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
    : type === 'error'
    ? 'bg-gradient-to-r from-red-500 to-rose-600'
    : 'bg-gradient-to-r from-blue-500 to-indigo-600';

  const icon = type === 'success' 
    ? '✓' 
    : type === 'error'
    ? '✕'
    : 'ℹ';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] animate-slideDown">
      <div className={`${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px] max-w-[90vw] md:min-w-[400px]`}>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
          {icon}
        </div>
        <p className="font-semibold text-sm md:text-base">{message}</p>
      </div>
    </div>
  );
}

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-red-600 px-6 py-4">
          <h3 className="text-white font-bold text-lg md:text-xl">{title}</h3>
        </div>
        
        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{message}</p>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded-full border-2 border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

interface LoadingModalProps {
  message: string;
}

export function LoadingModal({ message }: LoadingModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl px-8 py-6 flex flex-col items-center gap-4 max-w-sm w-full mx-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-700 font-semibold text-sm md:text-base text-center">{message}</p>
      </div>
    </div>
  );
}
