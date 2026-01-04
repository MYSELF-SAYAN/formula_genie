export type Platform = 'google-sheets' | 'excel' | 'both';

export type Complexity = 'simple' | 'intermediate' | 'advanced';

export interface FormulaResult {
    sheetsFormula?: string;
    excelFormula?: string;
    explanation: string;
    complexity: Complexity;
}

export interface Generation {
    id: string;
    userId: string;
    prompt: string;
    sheetsFormula?: string;
    excelFormula?: string;
    result?: string; // For backward compatibility with DB result field
    explanation: string;
    platform: Platform;
    complexity: Complexity;
    createdAt: string | Date;
}
