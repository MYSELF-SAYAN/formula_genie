import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Zap, History, Shield } from 'lucide-react';
import { SheetsIcon } from '../icons/SheetIcon';
import { ExcelIcon } from '../icons/ExcelIcon';

const features = [
  {
    icon: MessageSquare,
    title: 'Natural Language Input',
    description: 'Just describe what you want in plain English. No need to memorize complex formula syntax.',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Get your formula in milliseconds. Our AI understands context and generates accurate formulas.',
  },
  {
    title: 'Google Sheets & Excel',
    description: 'Support for both platforms with syntax-specific formulas. Works with Sheets, Excel, or both.',
    customIcon: true,
  },
  {
    icon: History,
    title: 'Save & Reuse',
    description: 'All your generated formulas are saved. Search your history and reuse them anytime.',
  },
  {
    icon: Shield,
    title: 'Complexity Detection',
    description: 'We analyze formula complexity so you know if you\'re using simple or advanced functions.',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything you need to master spreadsheets
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            FormulaGenie makes spreadsheet formulas accessible to everyone, 
            from beginners to power users.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl gradient-bg-subtle flex items-center justify-center">
                  {feature.customIcon ? (
                    <div className="flex gap-1">
                      <SheetsIcon size={20} />
                      <ExcelIcon size={20} />
                    </div>
                  ) : (
                    feature.icon && <feature.icon className="w-6 h-6 text-primary" />
                  )}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
