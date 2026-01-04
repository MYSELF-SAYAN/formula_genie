import { AppSidebar } from '@/components/dashboard/sidebar';
import React from 'react';

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return (
        <div className="min-h-screen flex bg-secondary/20">
            {/* Add your protected navigation or sidebar components here */}
            <AppSidebar />
            {children}

        </div>
    );
}
