import * as THREE from 'three';
/**
 * Token types for the Logo language parser
 */
export type Token = string | number | Token[];
/**
 * Parse result with value and next index
 */
export interface ParseResult {
    value: any;
    nextIndex: number;
}
/**
 * RGB color tuple
 */
export type RGB = [number, number, number];
/**
 * 2D coordinate
 */
export interface Point2D {
    x: number;
    y: number;
}
/**
 * 3D coordinate
 */
export interface Point3D {
    x: number;
    y: number;
    z: number;
}
/**
 * Bounding box for the canvas
 */
export interface BoundingBox {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}
/**
 * Procedure definition
 */
export interface Procedure {
    params: string[];
    body: Token[];
    defaultValues?: Map<string, any>;
}
/**
 * Variable scope for Logo variables
 */
export type VariableScope = Map<string, any>;
/**
 * Turtle state configuration
 */
export interface TurtleState {
    x: number;
    y: number;
    z: number;
    heading: number;
    pitch: number;
    roll: number;
    penDown: boolean;
    penSize: number;
    penColor: string;
    penColorRGB: RGB;
    turtleVisible: boolean;
    variables: VariableScope;
    scopeStack: VariableScope[];
    procedures: Map<string, Procedure>;
    boundingBox: BoundingBox;
    zoom: number;
    panX: number;
    panY: number;
    is3DMode: boolean;
    faceVertices: Point3D[];
    meshes: THREE.Mesh[];
    lastMesh: THREE.Mesh | null;
    repeatCounters: number[];
    stopFlag: boolean;
    outputValue: any;
}
/**
 * Color palette entry
 */
export interface ColorPaletteEntry {
    name: string;
    rgb: RGB;
}
/**
 * Expression evaluation context
 */
export interface EvaluationContext {
    variables: VariableScope;
    scopeStack: VariableScope[];
    procedures: Map<string, Procedure>;
}
//# sourceMappingURL=types.d.ts.map