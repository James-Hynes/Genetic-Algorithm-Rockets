class DNA {
    constructor() {
        this.moves = [];
        
        this.maxforce = 0.1;
        
        for(var i = 0; i < baselifetime; i++) {
            this.moves[i] = p5.Vector.random2D();
            this.moves[i].mult(random(0, this.maxforce));
        }
    }
    
    crossover(partner) {
		var child = [];

		var mid = parseInt(random(this.moves.length));

		for(var i = 0; i < Math.max(this.moves.length, partner.moves.length); i++) {
            if(this.moves[i] !== undefined && partner.moves[i] !== undefined) {
                if(i < mid) {
				    child[i] = this.moves[i];
                } else {
				    child[i] = partner.moves[i];
                } 
            } else {
                child[i] = (this.moves.length > partner.moves.length) ? this.moves[i] : partner.moves[i];
            }
			
		}

		var newDNA = new DNA();
		newDNA.moves = child;
		return newDNA;
	}
    
    mutate(m) {
		for(var i = 0; i < this.moves.length; i++) {
			if(random(1) < m) {
				var angle = random(TWO_PI);
				this.moves[i] = createVector(cos(random(TWO_PI)), sin(random(TWO_PI)));
				this.moves[i].mult(random(0, this.maxforce));
			}
		}
	}
    
}