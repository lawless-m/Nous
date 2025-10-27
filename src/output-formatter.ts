import { TokenMetadata } from './tokenizer.js';
import { Token } from './types.js';

/**
 * Handles output formatting and error messages
 */
export class OutputFormatter {
    private outputElement: HTMLElement;

    constructor(outputElement: HTMLElement) {
        this.outputElement = outputElement;
    }

    /**
     * Log a message with newline
     */
    log(message: any): void {
        const formatted = this.formatValue(message);
        this.outputElement.textContent += formatted + '\n';
    }

    /**
     * Write a message without newline
     */
    write(message: any): void {
        const formatted = this.formatValue(message);
        this.outputElement.textContent += formatted;
    }

    /**
     * Clear the output
     */
    clear(): void {
        this.outputElement.textContent = '';
    }

    /**
     * Format a value (handles arrays/lists recursively)
     */
    formatValue(value: any): string {
        if (Array.isArray(value)) {
            return '[' + value.map(v => this.formatValue(v)).join(' ') + ']';
        }
        // Round numbers to 3 decimal places to avoid scientific notation like e-15
        if (typeof value === 'number') {
            return String(Math.round(value * 1000) / 1000);
        }
        return String(value);
    }

    /**
     * Format error message with context
     */
    formatError(
        error: Error,
        tokenIndex?: number,
        tokens?: Token[],
        tokenMeta?: TokenMetadata[]
    ): string {
        let msg = `Error: ${error.message}\n`;

        if (
            tokenIndex !== undefined &&
            tokens &&
            tokens.length > 0 &&
            tokenMeta &&
            tokenMeta.length > 0
        ) {
            // Show the problematic token with line number
            const token = tokens[tokenIndex] || '';
            const meta = tokenMeta[tokenIndex] || { line: '?', column: '?' };
            msg += `At line ${meta.line}, column ${meta.column}: "${token}"\n`;

            // Show context (5 tokens before and after)
            const start = Math.max(0, tokenIndex - 5);
            const end = Math.min(tokens.length, tokenIndex + 6);
            const contextTokens = tokens.slice(start, end);

            // Build context string with pointer to error
            const contextStr = contextTokens
                .map((t, i) => {
                    const actualIndex = start + i;
                    if (actualIndex === tokenIndex) {
                        return `>>> ${t} <<<`;
                    }
                    return t;
                })
                .join(' ');

            msg += `Context: ${contextStr}`;
        }

        return msg;
    }
}
