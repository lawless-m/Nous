/**
 * Manages the turtle's state including position, heading, pen state, and variables
 */
export class TurtleState {
    constructor() {
        // Position
        this.x = 0;
        this.y = 0;
        this.z = 0;
        // Rotation (in degrees)
        this.heading = 90; // 0=right, 90=up, 180=left, 270=down
        this.pitch = 0; // 3D rotation around X-axis
        this.roll = 0; // 3D rotation around forward axis
        // Pen state
        this.penDown = true;
        this.penColor = '#000000';
        this.penColorRGB = [0, 0, 0];
        this.penSize = 2;
        // Visibility
        this.turtleVisible = true;
        // Variables and procedures
        this.variables = new Map();
        this.scopeStack = [];
        this.procedures = new Map();
        // Canvas state
        this.boundingBox = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
        this.zoom = 1.0;
        this.panX = 0;
        this.panY = 0;
        // 3D state
        this.is3DMode = false;
        this.faceVertices = [];
        this.faceColor = '#00ff00';
        this.faceColorRGB = [0, 255, 0];
        this.meshes = [];
        this.lastMesh = null;
        // Control flow
        this.repeatCounters = [];
        this.stopFlag = false;
        this.outputValue = null;
    }
    /**
     * Reset turtle to initial state
     */
    reset() {
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
    pushScope(localVars = new Map()) {
        this.scopeStack.push(localVars);
    }
    /**
     * Pop the current local scope
     */
    popScope() {
        if (this.scopeStack.length > 0) {
            this.scopeStack.pop();
        }
    }
    /**
     * Set a variable in current scope (local if in procedure, global otherwise)
     */
    setVariable(name, value) {
        if (this.scopeStack.length > 0) {
            // We're in a local scope - set in the most recent scope
            this.scopeStack[this.scopeStack.length - 1].set(name, value);
        }
        else {
            // Global scope
            this.variables.set(name, value);
        }
    }
    /**
     * Get a variable value, checking local scopes first, then global
     */
    getVariable(name) {
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
    hasVariable(name) {
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
    updateBoundingBox(x, y) {
        this.boundingBox.minX = Math.min(this.boundingBox.minX, x);
        this.boundingBox.maxX = Math.max(this.boundingBox.maxX, x);
        this.boundingBox.minY = Math.min(this.boundingBox.minY, y);
        this.boundingBox.maxY = Math.max(this.boundingBox.maxY, y);
    }
    /**
     * Clear bounding box
     */
    clearBoundingBox() {
        this.boundingBox = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }
    /**
     * Get current position as 3D point
     */
    getPosition() {
        return { x: this.x, y: this.y, z: this.z };
    }
    /**
     * Set position
     */
    setPosition(x, y, z = this.z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * Get pen color as RGB tuple
     */
    getPenColorRGB() {
        return this.penColorRGB;
    }
    /**
     * Set pen color from RGB values
     */
    setPenColorRGB(r, g, b) {
        this.penColorRGB = [r, g, b];
        this.penColor = `rgb(${r},${g},${b})`;
    }
}
//# sourceMappingURL=turtle-state.js.map