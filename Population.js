class Population {
    constructor(popNum, mutationRate) {
        this.rockets = [];
        this.mutationRate = mutationRate;
        for(var i = 0; i < popNum; i++) {
            this.rockets.push(new Rocket(50, windowHeight / 2, new DNA()));
        }
        
        this.generations = 0;
        
        this.record = 0;
    }
    
    run() {
        let first = this.getFirstPlace();
        for(let rocket of this.rockets) {
            if(rocket === first) {
                rocket.isFirst = true;
            } else {
                rocket.isFirst = false;
            }
            rocket.run();
        }
    }
    
    getFirstPlace() {
        let res = (Math.max.apply(Math,this.rockets.map(function(o){return o.pos.x * ((o.crashed) ? 0 : 1);})))
        return this.rockets.find(function(r) { return r.pos.x === res });
    }
    
    selection() {
        this.pool = [];
        
        let maxFitness = this.getHighestFitness();
        
        for(var i = 0; i < this.rockets.length; i++) {
			var fitnessNormal = map(this.rockets[i].getFitness(), 0, maxFitness, 0, 1);
			var n = parseInt((fitnessNormal*100));
			for(var j = 0; j < n; j++) {
				this.pool.push(this.rockets[i]);
			}
		}
        
        
    }
    
    reproduction() {
		for(var i = 0; i < this.rockets.length; i++) {
			var m = parseInt(random(this.pool.length));
			var d = parseInt(random(this.pool.length));

			var dad = this.pool[d];
			var mom = this.pool[m];

			var dadGenes = dad.dna;
			var momGenes = mom.dna;
            
            console.log(dadGenes, momGenes);

			var child = momGenes.crossover(dadGenes);

			child.mutate(this.mutationRate);

			this.rockets[i] = new Rocket(50, windowHeight / 2, child);
		}
	}
    
    getFitnesses() {
        this.rockets.forEach(function(r) {
           r.calculateFitness(); 
        });
    }
    
    getHighestFitness() {
        let highest = 0;
        
        this.rockets.forEach(function(r) {
            highest = (highest > r.fitness) ? highest : r.fitness;
        });
        
        return highest
    }
    
    getFurthestDistance() {
        let highest = 0;
        this.rockets.forEach(function(r) {
            highest = (highest > r.pos.x) ? highest : r.pos.x;
        });
        
        return highest;
    }
    
    allCrashed() {
        return (this.rockets.every(function(r) {
            return r.crashed;
        }));
    }
    
    numAlive() {
        return this.rockets.filter(function(r) {
            return !r.crashed;
        }).length;
    }
}