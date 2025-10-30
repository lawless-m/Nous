import { Token } from './types.js';

/**
 * Token metadata for error reporting
 */
export interface TokenMetadata {
    line: number;
    column: number;
}

/**
 * Result from tokenization
 */
export interface TokenizeResult {
    tokens: Token[];
    metadata: TokenMetadata[];
}

/**
 * Result from block parsing
 */
export interface ParseBlockResult {
    block: Token[];
    nextIndex: number;
}

/**
 * Tokenizer for Logo language
 */
export class Tokenizer {
    /**
     * Tokenize Logo source code into tokens
     */
    tokenize(code: string): TokenizeResult {
        const tokens: Token[] = [];
        const tokenMeta: TokenMetadata[] = [];
        let current = '';
        let inString = false;
        let line = 1;
        let column = 1;
        let tokenStartLine = 1;
        let tokenStartColumn = 1;

        for (let i = 0; i < code.length; i++) {
            const char = code[i];

            // Track line and column
            if (char === '\n') {
                line++;
                column = 1;
            } else {
                column++;
            }

            // Handle semicolon comments - skip to end of line (but not inside strings)
            if (char === ';' && !inString) {
                // Save any current token before the comment
                if (current.trim()) {
                    tokens.push(current.trim());
                    tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
                    current = '';
                }
                // Skip everything until newline
                while (i < code.length && code[i] !== '\n') {
                    i++;
                    column++;
                }
                continue;
            }

            // Start tracking token position when we begin a new token
            if (current === '' && char !== ' ' && char !== '\t' && char !== '\n' && char !== '\r') {
                tokenStartLine = line;
                tokenStartColumn = column;
            }

            // If we're in a quoted string/word, handle special cases
            if (inString) {
                if (char === '"') {
                    // Closing quote found - end multi-word string (don't include closing quote)
                    inString = false;
                    if (current) {
                        tokens.push(current);
                        tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
                        current = '';
                    }
                    continue;
                }
                if (/\s/.test(char)) {
                    // Whitespace found - include it in the string (we're in a quoted string)
                    // Keep collecting until we find the closing quote
                    current += char;
                    continue;
                }
                // Regular character - keep collecting
                current += char;
                continue;
            }

            // Starting a quoted string/word
            if (char === '"') {
                if (current.trim()) {
                    // Save any previous token
                    tokens.push(current.trim());
                    tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
                    current = '';
                }
                tokenStartLine = line;
                tokenStartColumn = column;
                inString = true;
                current = '"'; // Include the opening quote
                continue;
            }

            if (char === '[') {
                if (current.trim()) {
                    tokens.push(current.trim());
                    tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
                    current = '';
                }
                tokenStartLine = line;
                tokenStartColumn = column;
                tokens.push('[');
                tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
            } else if (char === ']') {
                if (current.trim()) {
                    tokens.push(current.trim());
                    tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
                    current = '';
                }
                tokenStartLine = line;
                tokenStartColumn = column;
                tokens.push(']');
                tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
            } else if (char === '(' || char === ')') {
                // Handle parentheses for expressions
                if (current.trim()) {
                    tokens.push(current.trim());
                    tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
                    current = '';
                }
                tokenStartLine = line;
                tokenStartColumn = column;
                tokens.push(char);
                tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
            } else if (char === '<' || char === '>' || char === '=') {
                // Handle comparison operators
                if (current.trim()) {
                    tokens.push(current.trim());
                    tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
                    current = '';
                }
                tokenStartLine = line;
                tokenStartColumn = column;
                // Check for two-character operators: <=, >=, <>
                if (i + 1 < code.length) {
                    const nextChar = code[i + 1];
                    if ((char === '<' && (nextChar === '=' || nextChar === '>')) ||
                        (char === '>' && nextChar === '=')) {
                        tokens.push(char + nextChar);
                        tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
                        i++; // Skip next character
                        column++; // Update column for skipped character
                        continue;
                    }
                }
                tokens.push(char);
                tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
            } else if (/\s/.test(char)) {
                // Always split tokens on whitespace, even inside brackets
                if (current.trim()) {
                    tokens.push(current.trim());
                    tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
                    current = '';
                }
            } else {
                current += char;
            }
        }

        if (current.trim()) {
            tokens.push(current.trim());
            tokenMeta.push({ line: tokenStartLine, column: tokenStartColumn });
        }

        return { tokens, metadata: tokenMeta };
    }

    /**
     * Parse a block of tokens between brackets [ ]
     */
    parseBlock(tokens: Token[], index: number): ParseBlockResult {
        const block: Token[] = [];
        let depth = 1;  // Start at 1 since we've already consumed the opening '['
        let i = index;

        while (i < tokens.length) {
            const token = tokens[i];
            if (token === '[') {
                depth++;
                if (depth > 1) {
                    block.push(token);
                }
            } else if (token === ']') {
                depth--;
                if (depth === 0) {
                    return { block, nextIndex: i + 1 };
                }
                block.push(token);
            } else {
                block.push(token);
            }
            i++;
        }

        // Better error message for unmatched brackets
        const contextStart = Math.max(0, index - 3);
        const contextEnd = Math.min(tokens.length, i + 3);
        const context = tokens.slice(contextStart, contextEnd).join(' ');
        throw new Error(`Unmatched bracket - missing closing ']'. Context: ${context}`);
    }
}
