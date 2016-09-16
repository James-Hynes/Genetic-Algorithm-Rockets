class Rocket {
    constructor(x, y, d) {
        this.pos = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.frameStarted = frameCount;
        this.frameDied = 0;
        this.dna = d;
        this.currentMove = 0;
        
        this.fitness = 0;
        
        this.recordDistance = 0;
        
        this.crashed = false;
        
        this.isFirst = false;
        
        this.averageSpeed = 0;

        this.width = (r * 2) + (r / 2);
        this.height = (r * 2) + (r / 2);
    }
    
    addAccel(accel) {
        this.acceleration.add(accel);
    }
    
    update() {
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.acceleration.mult(0);
    }
    
    
    display() {
        var theta = this.velocity.heading() + PI / 2;
		var r = 4;
		fill(200, 100);

		stroke(0);
		push();
		translate(this.pos.x, this.pos.y);
		rotate(theta);

		rectMode(CENTER);
		fill(0);
		rect(-r/2, r * 2, r/2, r);
		rect(r/2, r * 2, r/2, r);

        if(this.isFirst) {
            fill(0, 255, 50);
        } else if(this.crashed) {
            fill('#ef0049');
        } else {
            fill(175)
        }
		beginShape(TRIANGLES);
		vertex(0, -r*2);
		vertex(-r, r*2);
		vertex(r, r*2);
		endShape();

		pop();
        
        textAlign(CENTER);
        fill(255);
        text(Math.trunc(this.pos.x), this.pos.x, this.pos.y - 10);
        text(Math.trunc(map(this.calculateFitness(), 0, popul.getHighestFitness(), 0, 1) * 100), this.pos.x, this.pos.y + 20);

    }
    
    run() {
        if(!this.crashed) {
            if(!(this.currentMove < this.dna.moves.length)) {
                this.dna.moves.push(p5.Vector.random2D());
                this.dna.moves[this.dna.moves.length - 1].mult(random(0, this.dna.maxforce));
            }
            this.addAccel(this.dna.moves[this.currentMove]);
            this.currentMove++;
            this.update();
            this.crashed = obstacles.some(function(t) {
                return t.contains(this);
            }, this)
            if(this.crashed) {
                this.frameDied = frameCount;
            }
        }
        
        this.display();
    }
    
    calculateFitness() {
        this.fitness = this.pos.x * this.pos.x * this.pos.x;
//        this.fitness += ((this.frameDied - this.frameStarted) / this.pos.x);
        this.fitness = this.fitness * this.fitness;
        return this.fitness;
    }
    
    getFitness() {
        return this.fitness;
    }

    getBoundingBox() {
         
    }
}





