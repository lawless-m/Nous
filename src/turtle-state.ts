import { Point3D, RGB, VariableScope, Procedure, BoundingBox } from './types.js';
import * as THREE from 'three';

/**
 * Manages the turtle's state including position, heading, pen state, and variables
 */
export class TurtleState {
    // Position
    x: number = 0;
    y: number = 0;
    z: number = 0;

    // Rotation (in degrees)
    heading: number = 90; // 0=right, 90=up, 180=left, 270=down
    pitch: number = 0;    // 3D rotation around X-axis
    roll: number = 0;     // 3D rotation around forward axis

    // Pen state
    penDown: boolean = true;
    penColor: string = '#000000';
    penColorRGB: RGB = [0, 0, 0];
    penSize: number = 2;

    // Visibility
    turtleVisible: boolean = true;

    // Variables and procedures
    variables: VariableScope = new Map();
    scopeStack: VariableScope[] = [];
    procedures: Map<string, Procedure> = new Map();

    // Canvas state
    boundingBox: BoundingBox = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    zoom: number = 1.0;
    panX: number = 0;
    panY: number = 0;

    // 3D state
    is3DMode: boolean = false;
    faceVertices: Point3D[] = [];
    faceColor: string = '#00ff00';
    faceColorRGB: RGB = [0, 255, 0];
    meshes: THREE.Mesh[] = [];
    lastMesh: THREE.Mesh | null = null;

    // Control flow
    repeatCounters: number[] = [];
    stopFlag: boolean = false;
    outputValue: any = null;

    /**
     * Reset turtle to initial state
     */
    reset(): void {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.heading = 90;
        this.pitch = 0;
        this.roll = 0;
        this.penDown = true;
        this.penColor = '#000000';
        this.penColorRGB = [0, 0, 0];
        this.penSize = 2;
        this.turtleVisible = true;
        this.variables.clear();
        this.scopeStack = [];
        this.faceVertices = [];
        this.boundingBox = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    /**
     * Push a new local scope for procedure calls
     */
    pushScope(localVars: VariableScope = new Map()): void {
        this.scopeStack.push(localVars);
    }

    /**
     * Pop the current local scope
     */
    popScope(): void {
        if (this.scopeStack.length > 0) {
            this.scopeStack.pop();
        }
    }

    /**
     * Set a variable in current scope (local if in procedure, global otherwise)
     */
    setVariable(name: string, value: any): void {
        if (this.scopeStack.length > 0) {
            // We're in a local scope - set in the most recent scope
            this.scopeStack[this.scopeStack.length - 1].set(name, value);
        } else {
            // Global scope
            this.variables.set(name, value);
        }
    }

    /**
     * Get a variable value, checking local scopes first, then global
     */
    getVariable(name: string): any {
        // Check local scopes (most recent first)
        for (let i = this.scopeStack.length - 1; i >= 0; i--) {
            if (this.scopeStack[i].has(name)) {
                return this.scopeStack[i].get(name);
            }
        }

        // Check global scope
        if (this.variables.has(name)) {
            return this.variables.get(name);
        }

        throw new Error(`Variable '${name}' is not defined`);
    }

    /**
     * Check if a variable exists in any scope
     */
    hasVariable(name: string): boolean {
        // Check local scopes
        for (let i = this.scopeStack.length - 1; i >= 0; i--) {
            if (this.scopeStack[i].has(name)) {
                return true;
            }
        }
        // Check global scope
        return this.variables.has(name);
    }

    /**
     * Update bounding box with new point
     */
    updateBoundingBox(x: number, y: number): void {
        this.boundingBox.minX = Math.min(this.boundingBox.minX, x);
        this.boundingBox.maxX = Math.max(this.boundingBox.maxX, x);
        this.boundingBox.minY = Math.min(this.boundingBox.minY, y);
        this.boundingBox.maxY = Math.max(this.boundingBox.maxY, y);
    }

    /**
     * Clear bounding box
     */
    clearBoundingBox(): void {
        this.boundingBox = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    /**
     * Get current position as 3D point
     */
    getPosition(): Point3D {
        return { x: this.x, y: this.y, z: this.z };
    }

    /**
     * Set position
     */
    setPosition(x: number, y: number, z: number = this.z): void {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Get pen color as RGB tuple
     */
    getPenColorRGB(): RGB {
        return this.penColorRGB;
    }

    /**
     * Set pen color from RGB values
     */
    setPenColorRGB(r: number, g: number, b: number): void {
        this.penColorRGB = [r, g, b];
        this.penColor = `rgb(${r},${g},${b})`;
    }
}
