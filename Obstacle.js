class Obstacle {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.size = createVector(w, h);
    }
    
    display() {
        push();
        fill(0);
        if(!popul.allCrashed() && popul.getFirstPlace().pos.x >= windowWidth / 2) {
        translate(((windowWidth / 2) - popul.getFirstPlace().pos.x), 0)
        }
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        pop();
    }
    
    contains(r) {
        return (r.pos.x > this.pos.x && r.pos.x < this.pos.x + this.size.x && r.pos.y > this.pos.y && r.pos.y < this.pos.y + this.size.y);
    }
}