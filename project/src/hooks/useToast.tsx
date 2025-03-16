import { useState } from 'react';

type ToastVariant = 'default' | 'destructive';

interface Toast {
    id: string;
    title: string;
    description?: string;
    variant?: ToastVariant;
}

interface ToastOptions {
    title: string;
    description?: string;
    variant?: ToastVariant;
}

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = ({ title, description, variant = 'default' }: ToastOptions) => {
        const id = Math.random().toString(36).slice(2);
        setToasts((prevToasts) => [...prevToasts, { id, title, description, variant }]);

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        }, 5000);
    };

    return { toasts, toast };
}