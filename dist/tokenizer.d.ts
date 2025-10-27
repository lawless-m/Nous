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
export declare class Tokenizer {
    /**
     * Tokenize Logo source code into tokens
     */
    tokenize(code: string): TokenizeResult;
    /**
     * Parse a block of tokens between brackets [ ]
     */
    parseBlock(tokens: Token[], index: number): ParseBlockResult;
}
//# sourceMappingURL=tokenizer.d.ts.map