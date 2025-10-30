import { Point3D, RGB, VariableScope, Procedure, BoundingBox } from './types.js';
import * as THREE from 'three';
/**
 * Manages the turtle's state including position, heading, pen state, and variables
 */
export declare class TurtleState {
    x: number;
    y: number;
    z: number;
    heading: number;
    pitch: number;
    roll: number;
    penDown: boolean;
    penColor: string;
    penColorRGB: RGB;
    penSize: number;
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
    faceColor: string;
    faceColorRGB: RGB;
    meshes: THREE.Mesh[];
    lastMesh: THREE.Mesh | null;
    repeatCounters: number[];
    stopFlag: boolean;
    outputValue: any;
    /**
     * Reset turtle to initial state
     */
    reset(): void;
    /**
     * Push a new local scope for procedure calls
     */
    pushScope(localVars?: VariableScope): void;
    /**
     * Pop the current local scope
     */
    popScope(): void;
    /**
     * Set a variable in current scope (local if in procedure, global otherwise)
     */
    setVariable(name: string, value: any): void;
    /**
     * Get a variable value, checking local scopes first, then global
     */
    getVariable(name: string): any;
    /**
     * Check if a variable exists in any scope
     */
    hasVariable(name: string): boolean;
    /**
     * Update bounding box with new point
     */
    updateBoundingBox(x: number, y: number): void;
    /**
     * Clear bounding box
     */
    clearBoundingBox(): void;
    /**
     * Get current position as 3D point
     */
    getPosition(): Point3D;
    /**
     * Set position
     */
    setPosition(x: number, y: number, z?: number): void;
    /**
     * Get pen color as RGB tuple
     */
    getPenColorRGB(): RGB;
    /**
     * Set pen color from RGB values
     */
    setPenColorRGB(r: number, g: number, b: number): void;
}
//# sourceMappingURL=turtle-state.d.ts.map