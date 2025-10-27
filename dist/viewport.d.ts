import { BoundingBox } from './types.js';
/**
 * Manages viewport zoom, pan, and coordinate transformations
 */
export declare class Viewport {
    private canvas;
    private centerX;
    private centerY;
    zoom: number;
    panX: number;
    panY: number;
    boundingBox: BoundingBox;
    constructor(canvas: SVGSVGElement, centerX?: number, centerY?: number);
    /**
     * Set zoom level and pan offsets
     */
    setZoom(zoom: number, panX?: number, panY?: number): void;
    /**
     * Apply current zoom and pan to SVG viewBox
     */
    applyZoomAndPan(): void;
    /**
     * Zoom to fit the current drawing bounds
     */
    zoomToFit(): void;
    /**
     * Update bounding box with new point
     */
    updateBoundingBox(x: number, y: number): void;
    /**
     * Clear bounding box
     */
    clearBoundingBox(): void;
}
//# sourceMappingURL=viewport.d.ts.map