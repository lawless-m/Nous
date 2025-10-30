/**
 * Special exception for OUTPUT command to return values from procedures
 */
export class OutputException extends Error {
    value: any;

    constructor(value: any) {
        super('OUTPUT');
        this.value = value;
        this.name = 'OutputException';
    }
}

/**
 * Special exception for STOP command to exit from procedures
 */
export class StopException extends Error {
    constructor() {
        super('STOP');
        this.name = 'StopException';
    }
}
