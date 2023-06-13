class Banner {

    constructor(x, y, w, h, color_one, color_two, min, max) {
        this.pos = createVector(x, y);
        this.size = createVector(w, h);
        this.colors = [color_one, color_two];
        this.min_width = w;
        this.counter = 0;
        this.factor = random(min, max);
    }

    show() {
        this.gradient();
        strokeWeight(2);
        stroke(this.colors[0]);
        noFill();
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }

    gradient() {
        let start = this.pos.x;
        let end = this.pos.x + this.size.x;
        for(let i = start; i <= end; i++) {
            let inc = map(i, start, end, 0, 1);
            let col = lerpColor(this.colors[0], this.colors[1], inc);
            strokeWeight(1);
            stroke(col);
            line(i, this.pos.y, i, this.pos.y + this.size.y);
        }
    }

    update() {
        let extra = Math.abs(Math.sin(this.counter)) * this.factor;
        let new_width = this.min_width + extra;
        this.size.x = new_width;
        this.counter += 0.1;
    }
}