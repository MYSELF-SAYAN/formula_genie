
"use client";
import React from 'react';
import { FormulaGenerator } from '@/components/dashboard/FormulaGenerator';

export default function DashboardPage() {
    return (
        <div className="flex-1 md:p-8 p-4 pt-20 md:pt-8 bg-secondary/20 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold">Formula Generator</h1>
                    <p className="text-muted-foreground mt-1">
                        Describe what you need and get the perfect spreadsheet formula instantly.
                    </p>
                </div>
                <FormulaGenerator />
            </div>
        </div>
    );
}
