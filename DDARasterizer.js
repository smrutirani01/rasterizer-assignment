class DDARasterizer {
    rasterize(p1, p2) {
        const pixels = [];
        let x1 = p1.x, y1 = p1.y;
        let x2 = p2.x, y2 = p2.y;
        
        const dx = x2 - x1;
        const dy = y2 - y1;
        const steps = Math.max(Math.abs(dx), Math.abs(dy));
        
        const xIncrement = dx / steps;
        const yIncrement = dy / steps;
        
        let x = x1, y = y1;
        for (let i = 0; i <= steps; i++) {
            pixels.push(new Point(Math.round(x), Math.round(y)));
            x += xIncrement;
            y += yIncrement;
        }
        
        return pixels;
    }
}