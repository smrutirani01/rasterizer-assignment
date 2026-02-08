class WuRasterizer {
    rasterize(p1, p2) {
        const pixels = [];
        
        // Helper function to add pixel with intensity
        function plot(x, y, intensity) {
            pixels.push({
                x: Math.round(x),
                y: Math.round(y),
                intensity: intensity
            });
        }
        
        let x1 = p1.x, y1 = p1.y;
        let x2 = p2.x, y2 = p2.y;
        
        const steep = Math.abs(y2 - y1) > Math.abs(x2 - x1);
        
        if (steep) {
            [x1, y1] = [y1, x1];
            [x2, y2] = [y2, x2];
        }
        
        if (x1 > x2) {
            [x1, x2] = [x2, x1];
            [y1, y2] = [y2, y1];
        }
        
        const dx = x2 - x1;
        const dy = y2 - y1;
        const gradient = dx === 0 ? 1 : dy / dx;
        
        // First endpoint
        let xend = Math.round(x1);
        let yend = y1 + gradient * (xend - x1);
        let xgap = 1 - (x1 + 0.5) % 1;
        let xpxl1 = xend;
        let ypxl1 = Math.floor(yend);
        
        if (steep) {
            plot(ypxl1, xpxl1, (1 - (yend % 1)) * xgap);
            plot(ypxl1 + 1, xpxl1, (yend % 1) * xgap);
        } else {
            plot(xpxl1, ypxl1, (1 - (yend % 1)) * xgap);
            plot(xpxl1, ypxl1 + 1, (yend % 1) * xgap);
        }
        
        let intery = yend + gradient;
        
        // Second endpoint
        xend = Math.round(x2);
        yend = y2 + gradient * (xend - x2);
        xgap = (x2 + 0.5) % 1;
        let xpxl2 = xend;
        let ypxl2 = Math.floor(yend);
        
        if (steep) {
            plot(ypxl2, xpxl2, (1 - (yend % 1)) * xgap);
            plot(ypxl2 + 1, xpxl2, (yend % 1) * xgap);
        } else {
            plot(xpxl2, ypxl2, (1 - (yend % 1)) * xgap);
            plot(xpxl2, ypxl2 + 1, (yend % 1) * xgap);
        }
        
        // Main loop
        for (let x = xpxl1 + 1; x < xpxl2; x++) {
            if (steep) {
                plot(Math.floor(intery), x, 1 - (intery % 1));
                plot(Math.floor(intery) + 1, x, intery % 1);
            } else {
                plot(x, Math.floor(intery), 1 - (intery % 1));
                plot(x, Math.floor(intery) + 1, intery % 1);
            }
            intery += gradient;
        }
        
        return pixels;
    }
}