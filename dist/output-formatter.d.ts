import { TokenMetadata } from './tokenizer.js';
import { Token } from './types.js';
/**
 * Handles output formatting and error messages
 */
export declare class OutputFormatter {
    private outputElement;
    constructor(outputElement: HTMLElement);
    /**
     * Log a message with newline
     */
    log(message: any): void;
    /**
     * Write a message without newline
     */
    write(message: any): void;
    /**
     * Clear the output
     */
    clear(): void;
    /**
     * Format a value (handles arrays/lists recursively)
     */
    formatValue(value: any): string;
    /**
     * Format error message with context
     */
    formatError(error: Error, tokenIndex?: number, tokens?: Token[], tokenMeta?: TokenMetadata[]): string;
}
//# sourceMappingURL=output-formatter.d.ts.map