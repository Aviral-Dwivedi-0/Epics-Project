import React from 'react';
import { useToast } from '../../hooks/useToast';
import { motion, AnimatePresence } from 'framer-motion';

interface ToasterProps {
  message?: string;
}

export const Toaster: React.FC<ToasterProps> = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${toast.variant === 'destructive' ? 'bg-red-500' : 'bg-emerald-500'
              } text-white p-4 rounded-lg shadow-lg max-w-md`}
          >
            <div className="font-semibold">{toast.title}</div>
            {toast.description && (
              <div className="text-sm opacity-90">{toast.description}</div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};