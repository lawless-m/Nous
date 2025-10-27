export declare class LogoInterpreter {
    constructor();
    reset(): void;
    pushScope(localVars?: {}): void;
    popScope(): void;
    setVariable(name: any, value: any): void;
    getVariable(name: any): any;
    clear(): void;
    updateBoundingBox(x: any, y: any): void;
    setZoom(zoom: any, panX?: any, panY?: any): void;
    applyZoomAndPan(): void;
    zoomToFit(): void;
    updateTurtleDisplay(): void;
    forward(distance: any): void;
    backward(distance: any): void;
    left(angle: any): void;
    right(angle: any): void;
    setHeading(angle: any): void;
    collectExpressionTokens(tokens: any, startIndex: any): {
        tokens: any[];
        nextIndex: any;
    };
    getNextValue(tokens: any, index: any): {
        value: any;
        nextIndex: any;
    };
    evaluateExpression(tokens: any, startIndex?: number): any;
    parseExpression(tokens: any, index: any): any;
    parseOr(tokens: any, index: any): {
        value: any;
        nextIndex: any;
    };
    parseAnd(tokens: any, index: any): {
        value: any;
        nextIndex: any;
    };
    parseNot(tokens: any, index: any): any;
    parseComparison(tokens: any, index: any): {
        value: any;
        nextIndex: any;
    };
    parseAddSub(tokens: any, index: any): {
        value: any;
        nextIndex: any;
    };
    parseMulDiv(tokens: any, index: any): {
        value: any;
        nextIndex: any;
    };
    parseExponentiation(tokens: any, index: any): {
        value: any;
        nextIndex: any;
    };
    parseUnary(tokens: any, index: any): any;
    parsePrimary(tokens: any, index: any): any;
    executeProcedureSync(tokens: any): void;
    home(): void;
    goTo(x: any, y: any): void;
    setX(x: any): void;
    setY(y: any): void;
    circle(radius: any, steps?: number): void;
    box(width: any, height: any): void;
    square(size: any): void;
    penUp(): void;
    penDownCmd(): void;
    setPenSize(size: any): void;
    setPenColor(r: any, g: any, b: any): void;
    hideTurtle(): void;
    showTurtle(): void;
    drawLine(x1: any, y1: any, x2: any, y2: any): void;
    init3D(): void;
    toggle3DMode(): void;
    drawLine3D(x1: any, y1: any, z1: any, x2: any, y2: any, z2: any): void;
    updateTurtle3D(): void;
    up(angle: any): void;
    down(angle: any): void;
    rollRight(angle: any): void;
    rollLeft(angle: any): void;
    beginFace(): void;
    endFace(): void;
    sphere(radius: any): any;
    cube(size: any): any;
    cylinder(radius: any, height: any): any;
    exportSTL(): void;
    csgUnion(mesh1: any, mesh2: any): any;
    csgSubtract(mesh1: any, mesh2: any): any;
    csgIntersect(mesh1: any, mesh2: any): any;
    log(message: any): void;
    write(message: any): void;
    formatValue(value: any): any;
    formatError(error: any, tokenIndex: any): string;
    tokenize(code: any): any[];
    parseBlock(tokens: any, index: any): {
        block: any[];
        nextIndex: any;
    };
    execute(tokens: any, startIndex?: number, endIndex?: null): Promise<void>;
    getDelay(): number;
    sleep(ms: any): Promise<unknown>;
    run(code: any): Promise<void>;
    stop(): void;
}
//# sourceMappingURL=logo-interpreter.d.ts.map