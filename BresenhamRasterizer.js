// Point class for grid coordinates
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Bresenham's line drawing algorithm implementation
class BresenhamRasterizer {
    rasterize(p1, p2) {
        const pixels = [];
        
        let x1 = Math.round(p1.x);
        let y1 = Math.round(p1.y);
        let x2 = Math.round(p2.x);
        let y2 = Math.round(p2.y);
        
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        
        // Determine if line is steep (slope > 1)
        let swapped = false;
        if (dy > dx) {
            // Swap x and y for steep lines
            [x1, y1] = [y1, x1];
            [x2, y2] = [y2, x2];
            swapped = true;
        }
        
        // Recalculate after possible swap
        const dx2 = Math.abs(x2 - x1);
        const dy2 = Math.abs(y2 - y1);
        const sx2 = (x1 < x2) ? 1 : -1;
        const sy2 = (y1 < y2) ? 1 : -1;
        
        let error = dx2 / 2;
        let y = y1;
        
        // Generate points
        for (let x = x1; sx2 > 0 ? x <= x2 : x >= x2; x += sx2) {
            if (swapped) {
                pixels.push(new Point(y, x)); // Swap back
            } else {
                pixels.push(new Point(x, y));
            }
            
            error -= dy2;
            if (error < 0) {
                y += sy2;
                error += dx2;
            }
        }
        
        return pixels;
    }
}