/**
 * Special exception for OUTPUT command to return values from procedures
 */
export declare class OutputException extends Error {
    value: any;
    constructor(value: any);
}
/**
 * Special exception for STOP command to exit from procedures
 */
export declare class StopException extends Error {
    constructor();
}
//# sourceMappingURL=exceptions.d.ts.map