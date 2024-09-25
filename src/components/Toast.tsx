import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className=" animate-bounce animate-fade-in fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-md shadow-lg">
      <p>{message}</p>
    </div>
  );
};

export default Toast;