
"use client";
import React from 'react';
import { Card } from '@/components/ui/card';

import { ExcelIcon } from '@/components/icons/ExcelIcon';
import { Copy, Check, Sparkles } from 'lucide-react';
import { SheetsIcon } from '../icons/SheetIcon';
import { useState } from 'react';

export const DemoPreview: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            See it in action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Type your request, get instant formulas with explanations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-0">
            {/* Mock input area */}
            <div className="bg-secondary/50 p-6 border-b">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">Your prompt</p>
                  <p className="text-lg font-medium">
                    Sum all values in column B where column C is "Paid"
                  </p>
                </div>
              </div>
            </div>

            {/* Mock results */}
            <div className="p-6 space-y-6">
              {/* Sheets formula */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <SheetsIcon size={20} />
                  <span className="font-medium">Google Sheets</span>
                </div>
                <div className="relative">
                  <pre className="bg-secondary rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    =SUMIF(C:C, "Paid", B:B)
                  </pre>
                  <button
                    onClick={() => handleCopy('sheets', '=SUMIF(C:C, "Paid", B:B)')}
                    className="absolute top-3 right-3 p-2 rounded-md hover:bg-background/80 transition-colors"
                  >
                    {copied === 'sheets' ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Excel formula */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ExcelIcon size={20} />
                  <span className="font-medium">Excel</span>
                </div>
                <div className="relative">
                  <pre className="bg-secondary rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    =SUMIF(C:C, "Paid", B:B)
                  </pre>
                  <button
                    onClick={() => handleCopy('excel', '=SUMIF(C:C, "Paid", B:B)')}
                    className="absolute top-3 right-3 p-2 rounded-md hover:bg-background/80 transition-colors"
                  >
                    {copied === 'excel' ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Explanation */}
              <div className="p-4 rounded-lg gradient-bg-subtle border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">Explanation</p>
                <p className="text-muted-foreground">
                  This SUMIF formula adds up values in column B only where the corresponding 
                  cell in column C contains "Paid". Perfect for conditional totals like summing 
                  paid invoices.
                </p>
              </div>

              {/* Complexity badge */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Complexity:</span>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                  Intermediate
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
