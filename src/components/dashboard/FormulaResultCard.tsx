"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { ExcelIcon } from '@/components/icons/ExcelIcon';
import { FormulaResult, Complexity } from '@/types';
import { SheetsIcon } from '../icons/SheetIcon';
import { useToast } from '@/app/hooks/use-toast';

interface FormulaResultCardProps {
    result: FormulaResult;
}

const complexityColors: Record<Complexity, { bg: string; text: string }> = {
    simple: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    intermediate: { bg: 'bg-amber-100', text: 'text-amber-700' },
    advanced: { bg: 'bg-rose-100', text: 'text-rose-700' },
};

export const FormulaResultCard: React.FC<FormulaResultCardProps> = ({ result }) => {
    const { toast } = useToast();
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast({
            title: 'Copied!',
            description: 'Formula copied to clipboard.',
        });
        setTimeout(() => setCopiedId(null), 2000);
    };

    const { bg, text } = complexityColors[result.complexity];

    return (
        <Card className="shadow-lg border-0 animate-scale-in">
            <CardContent className="p-6 space-y-6">
                {/* Sheets formula */}
                {result.sheetsFormula && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <SheetsIcon size={20} />
                            <span className="font-medium">Google Sheets</span>
                        </div>
                        <div className="relative group">
                            <pre className="bg-secondary rounded-lg p-4 font-mono text-sm overflow-x-auto pr-12">
                                {result.sheetsFormula}
                            </pre>
                            <button
                                onClick={() => handleCopy('sheets', result.sheetsFormula!)}
                                className="absolute top-3 right-3 p-2 rounded-md bg-background/80 opacity-0 group-hover:opacity-100 hover:bg-background transition-all"
                            >
                                {copiedId === 'sheets' ? (
                                    <Check className="w-4 h-4 text-primary" />
                                ) : (
                                    <Copy className="w-4 h-4 text-muted-foreground" />
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Excel formula */}
                {result.excelFormula && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <ExcelIcon size={20} />
                            <span className="font-medium">Excel</span>
                        </div>
                        <div className="relative group">
                            <pre className="bg-secondary rounded-lg p-4 font-mono text-sm overflow-x-auto pr-12">
                                {result.excelFormula}
                            </pre>
                            <button
                                onClick={() => handleCopy('excel', result.excelFormula!)}
                                className="absolute top-3 right-3 p-2 rounded-md bg-background/80 opacity-0 group-hover:opacity-100 hover:bg-background transition-all"
                            >
                                {copiedId === 'excel' ? (
                                    <Check className="w-4 h-4 text-primary" />
                                ) : (
                                    <Copy className="w-4 h-4 text-muted-foreground" />
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Explanation */}
                <div className="p-4 rounded-lg gradient-bg-subtle border border-primary/20">
                    <p className="text-sm font-medium text-primary mb-1">Explanation</p>
                    <p className="text-muted-foreground">{result.explanation}</p>
                </div>

                {/* Complexity badge */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Complexity:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${bg} ${text}`}>
                        {result.complexity}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};
