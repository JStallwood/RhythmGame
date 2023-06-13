function Blob(x, size, i, difficulty_index) {
    this.index = i;
    this.direction = 1;

    let startY = banners[this.index].pos.y + (banners[this.index].size.y / 2);
    this.pos = createVector(x, startY);

    this.size = size;
    this.counter = 0;

    this.change = difficulties[difficulty_index];
    this.difficulty_index = difficulty_index;

    this.letters = [
        "q", "w", "o", "p"
    ];

    this.current_letter = random(this.letters);

    this.show = function() {
        let colors = banners[this.index].colors;
        stroke(colors[0]);
        strokeWeight(4);
        fill(52);
        /* stroke(255);
        strokeWeight(4);
        fill(0); */
        circle(this.pos.x, this.pos.y, this.size);
        strokeWeight(2);
        stroke(0);
        fill(255);
        textSize(this.size / 2);
        textAlign(CENTER);
        text(this.current_letter, this.pos.x, this.pos.y + 6);
    };

    this.update = function() {
        if(this.counter > this.change) {
            this.index += 1 * this.direction;
            this.counter = 0;
            this.current_letter = random(this.letters);
            can_answer = true;
        }

        if(this.index > banners.length - 1) {
            this.direction *= -1;
            this.index = banners.length - 2;
        }

        if(this.index < 0) {
            this.direction *= -1;
            this.index = 1;
        }

        this.pos.y = banners[this.index].pos.y + (banners[this.index].size.y / 2);

        this.counter += 1;
    };

    this.change_rate = function() {
        this.difficulty_index += 1;
        if(this.difficulty_index > difficulties.length - 1) {
            this.difficulty_index = difficulties.length - 1;
        }
        this.change = difficulties[this.difficulty_index];
    };
}