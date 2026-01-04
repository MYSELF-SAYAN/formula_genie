"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';
import { ExcelIcon } from '@/components/icons/ExcelIcon';
import { useAuth } from '@clerk/nextjs';
import { Platform, FormulaResult } from '@/types';
import { FormulaResultCard } from './FormulaResultCard';
import { SheetsIcon } from '../icons/SheetIcon';
import { useToast } from '@/app/hooks/use-toast';

export const FormulaGenerator: React.FC = () => {
    const { userId } = useAuth();
    const { toast } = useToast();
    const [prompt, setPrompt] = useState('');
    const [platform, setPlatform] = useState<Platform>('both');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<FormulaResult | null>(null);

    const handleGenerate = async () => {
        if (!userId) {
            toast({
                title: 'Authentication required',
                description: 'Please sign in to generate formulas.',
                variant: 'destructive',
            });
            return;
        }

        if (!prompt.trim()) {
            toast({
                title: 'Empty prompt',
                description: 'Please describe what you want the formula to do.',
                variant: 'destructive',
            });
            return;
        }

        setIsGenerating(true);
        setResult(null);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    platform,
                    userId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate formula');
            }

            const formulaResult = await response.json();

            // Adapt API response to frontend FormulaResult type if necessary
            // The API returns { formula, explanation }
            // Our FormulaResult expects { sheetsFormula?, excelFormula?, explanation, complexity }

            const formattedResult: FormulaResult = {
                explanation: formulaResult.explanation,
                complexity: 'simple', // API doesn't return complexity yet, defaulting to simple
            };

            if (platform === 'google-sheets') {
                formattedResult.sheetsFormula = formulaResult.formula;
            } else if (platform === 'excel') {
                formattedResult.excelFormula = formulaResult.formula;
            } else {
                // For 'both', the AI might return one formula that works for both or a specific one.
                // Given the prompt in gemini.ts, it returns one formula. 
                // We'll set it to both fields for now.
                formattedResult.sheetsFormula = formulaResult.formula;
                formattedResult.excelFormula = formulaResult.formula;
            }

            setResult(formattedResult);

            toast({
                title: 'Formula generated!',
                description: 'Your formula is ready to use.',
            });
        } catch (error) {
            toast({
                title: 'Generation failed',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Input Card */}
            <Card className="shadow-lg border-0">
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Describe what you want the formula to do
                        </label>
                        <Textarea
                            placeholder='E.g., "Sum all values in column B where column C is Paid" or "Find the average of column A excluding zeros"'
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="min-h-[120px] resize-none text-base"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="space-y-2 flex-1">
                            <label className="text-sm font-medium">Target platform</label>
                            <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                                <SelectTrigger className="h-11">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="both">
                                        <div className="flex items-center gap-2">
                                            <SheetsIcon size={18} />
                                            <ExcelIcon size={18} />
                                            <span>Both</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="google-sheets">
                                        <div className="flex items-center gap-2">
                                            <SheetsIcon size={18} />
                                            <span>Google Sheets</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="excel">
                                        <div className="flex items-center gap-2">
                                            <ExcelIcon size={18} />
                                            <span>Excel</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-end">
                            <Button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                size="lg"
                                className="w-full sm:w-auto min-w-[160px]"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        Generate formula
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Loading skeleton */}
            {isGenerating && (
                <Card className="shadow-lg border-0 overflow-hidden">
                    <CardContent className="p-6">
                        <div className="space-y-6 animate-pulse">
                            <div className="space-y-3">
                                <div className="h-5 w-32 bg-secondary rounded" />
                                <div className="h-16 bg-secondary rounded-lg" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-5 w-24 bg-secondary rounded" />
                                <div className="h-16 bg-secondary rounded-lg" />
                            </div>
                            <div className="h-20 bg-secondary/50 rounded-lg" />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Result */}
            {result && !isGenerating && <FormulaResultCard result={result} />}

            {/* Empty state */}
            {!result && !isGenerating && (
                <Card className="shadow-lg border-0">
                    <CardContent className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full gradient-bg-subtle flex items-center justify-center mb-4">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Ready to generate</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Describe what you want your formula to do in plain English,
                            and we'll create the perfect spreadsheet formula for you.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
