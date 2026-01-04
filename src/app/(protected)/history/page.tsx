"use client";
import React, { useState, useEffect } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, FileText, Calendar, Eye } from 'lucide-react';
import { ExcelIcon } from '@/components/icons/ExcelIcon';
import { useAuth } from '@clerk/nextjs';
import { Platform, Complexity, Generation } from '@/types';
import { FormulaResultCard } from '@/components/dashboard/FormulaResultCard';
import { SheetsIcon } from '@/components/icons/SheetIcon';

const complexityColors: Record<Complexity, { bg: string; text: string }> = {
    simple: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    intermediate: { bg: 'bg-amber-100', text: 'text-amber-700' },
    advanced: { bg: 'bg-rose-100', text: 'text-rose-700' },
};

const HistoryPage: React.FC = () => {
    const { userId } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');
    const [generations, setGenerations] = useState<Generation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGen, setSelectedGen] = useState<Generation | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!userId) return;

            setIsLoading(true);
            try {
                const response = await fetch(`/api/history?userId=${userId}`);
                if (!response.ok) throw new Error('Failed to fetch history');
                const data = await response.json();

                // Map DB record to Generation type
                const mappedData = data.map((item: any) => ({
                    ...item,
                    sheetsFormula: item.platform === 'google-sheets' || item.platform === 'both' ? item.result : undefined,
                    excelFormula: item.platform === 'excel' || item.platform === 'both' ? item.result : undefined,
                    complexity: item.complexity || 'simple', // Default to simple if not in DB
                    createdAt: new Date(item.createdAt),
                }));

                setGenerations(mappedData);
            } catch (error) {
                console.error('History fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [userId]);

    const filteredGenerations = generations.filter(gen => {
        const matchesSearch = gen.prompt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPlatform = platformFilter === 'all' || gen.platform === platformFilter;
        return matchesSearch && matchesPlatform;
    });

    const formatDate = (date: Date | string) => {
        const d = typeof date === 'string' ? new Date(date) : date;
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(d);
    };

    const getPlatformIcon = (platform: Platform) => {
        switch (platform) {
            case 'google-sheets':
                return <SheetsIcon size={18} />;
            case 'excel':
                return <ExcelIcon size={18} />;
            case 'both':
                return (
                    <div className="flex gap-1">
                        <SheetsIcon size={16} />
                        <ExcelIcon size={16} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex bg-secondary/20 max-w-4xl mx-auto">
            <main className="flex-1 md:p-8 p-4 pt-20 md:pt-8">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold">History</h1>
                        <p className="text-muted-foreground mt-1">
                            Browse and search your previously generated formulas.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search prompts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-11"
                            />
                        </div>
                        <Select value={platformFilter} onValueChange={(v) => setPlatformFilter(v as Platform | 'all')}>
                            <SelectTrigger className="w-full sm:w-[180px] h-11">
                                <SelectValue placeholder="All platforms" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All platforms</SelectItem>
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
                                <SelectItem value="both">
                                    <div className="flex items-center gap-2">
                                        <SheetsIcon size={16} />
                                        <ExcelIcon size={16} />
                                        <span>Both</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* History list */}
                    {filteredGenerations.length > 0 ? (
                        <div className="space-y-3">
                            {filteredGenerations.map((gen) => {
                                const { bg, text } = complexityColors[gen.complexity];
                                return (
                                    <Card
                                        key={gen.id}
                                        className="shadow-md border-0 hover:shadow-lg transition-shadow cursor-pointer"
                                        onClick={() => setSelectedGen(gen)}
                                    >
                                        <CardContent className="p-4 sm:p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start gap-3 mb-2">
                                                        <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                                        <p className="font-medium line-clamp-2">{gen.prompt}</p>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {formatDate(gen.createdAt)}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {getPlatformIcon(gen.platform)}
                                                        </div>
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${bg} ${text}`}>
                                                            {gen.complexity}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" className="flex-shrink-0">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <Card className="shadow-lg border-0">
                            <CardContent className="p-12 text-center">
                                <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                                    <FileText className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">No formulas found</h3>
                                <p className="text-muted-foreground max-w-md mx-auto">
                                    {searchQuery || platformFilter !== 'all'
                                        ? 'Try adjusting your search or filter.'
                                        : 'Generate your first formula to see it here.'}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Detail Dialog */}
                    <Dialog open={!!selectedGen} onOpenChange={() => setSelectedGen(null)}>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-left pr-8">Formula Details</DialogTitle>
                            </DialogHeader>
                            {selectedGen && (
                                <div className="space-y-4">
                                    <div className="p-4 bg-secondary rounded-lg">
                                        <p className="text-sm text-muted-foreground mb-1">Prompt</p>
                                        <p className="font-medium">{selectedGen.prompt}</p>
                                    </div>
                                    <FormulaResultCard
                                        result={{
                                            sheetsFormula: selectedGen.sheetsFormula,
                                            excelFormula: selectedGen.excelFormula,
                                            explanation: selectedGen.explanation,
                                            complexity: selectedGen.complexity,
                                        }}
                                    />
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            </main>
        </div>
    );
};

export default HistoryPage;
