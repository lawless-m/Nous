/**
 * Manages viewport zoom, pan, and coordinate transformations
 */
export class Viewport {
    constructor(canvas, centerX = 300, centerY = 300) {
        this.zoom = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.boundingBox = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
        this.canvas = canvas;
        this.centerX = centerX;
        this.centerY = centerY;
        this.applyZoomAndPan();
    }
    /**
     * Set zoom level and pan offsets
     */
    setZoom(zoom, panX = this.panX, panY = this.panY) {
        this.zoom = Math.max(0.1, Math.min(10, zoom)); // Clamp between 0.1x and 10x
        this.panX = panX;
        this.panY = panY;
        this.applyZoomAndPan();
    }
    /**
     * Apply current zoom and pan to SVG viewBox
     */
    applyZoomAndPan() {
        const viewBox = `${this.panX} ${this.panY} ${600 / this.zoom} ${600 / this.zoom}`;
        this.canvas.setAttribute('viewBox', viewBox);
    }
    /**
     * Zoom to fit the current drawing bounds
     */
    zoomToFit() {
        const bbox = this.boundingBox;
        // Convert Logo coordinates to screen coordinates
        const screenMinX = this.centerX + bbox.minX;
        const screenMaxX = this.centerX + bbox.maxX;
        const screenMinY = this.centerY - bbox.maxY;
        const screenMaxY = this.centerY - bbox.minY;
        const width = screenMaxX - screenMinX;
        const height = screenMaxY - screenMinY;
        if (width === 0 && height === 0) {
            // No drawing, reset to default
            this.setZoom(1.0, 0, 0);
            return;
        }
        // Add 10% padding
        const paddingFactor = 0.1;
        const paddingX = width * paddingFactor;
        const paddingY = height * paddingFactor;
        const contentWidth = width + 2 * paddingX;
        const contentHeight = height + 2 * paddingY;
        // Calculate zoom to fit both dimensions
        const zoomX = 600 / contentWidth;
        const zoomY = 600 / contentHeight;
        const newZoom = Math.min(zoomX, zoomY);
        // Calculate pan to center the content
        const panX = screenMinX - paddingX;
        const panY = screenMinY - paddingY;
        this.setZoom(newZoom, panX, panY);
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
}
//# sourceMappingURL=viewport.js.map