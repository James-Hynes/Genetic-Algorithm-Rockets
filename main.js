const baselifetime = 500;
let popul;
let obstacles = [];

function setup() {
    popul = new Population(50, 0.05);
    createCanvas(windowWidth, windowHeight);
    
    obstacles.push(new Wall(0, 200, windowWidth * 50, 20));    
    obstacles.push(new Wall(-20, 200, 20, windowHeight));
    obstacles.push(new Wall(0, windowHeight - 200, windowWidth * 50, 20));
    
    for(var i = 0; i < 10; i++) {
        let top = (Math.random()) > 0.5 ? true : false;
        obstacles.push(new Obstacle(900 + (i * 600), (top) ? 200 : 400, 20, 200));
//        obstacles.push(new Obstacle(1500, 200, 20, 200));
    }

}

function draw() {
    background(200, 200, 200);
    for(let obs of obstacles) {
        obs.display();
    }
    push();
    if(!popul.allCrashed() && popul.getFirstPlace().pos.x >= windowWidth / 2) {
        translate(((windowWidth / 2) - popul.getFirstPlace().pos.x), 0)
    }
    
    if(!popul.allCrashed()) {
        for(let wall of obstacles) {
            if(wall instanceof Wall && wall.size.y === 20 && popul.rockets.length > 0) {
                wall.size.x = Math.max(5000, Math.max(popul.record, popul.getFirstPlace().pos.x + 500));
            }
        }
        popul.run();
    } else {
        popul.record = Math.max(popul.record, popul.getFurthestDistance());
        popul.getFitnesses();
		popul.selection();
		popul.reproduction();
        popul.generations++;
    }
    
    if(popul.record !== 0) {
        fill(0, 255, 0, 125);
        rect(popul.record, 220, 10, (windowHeight - 200) - 220);
        textAlign(CENTER);
        textSize(20);
        text(Math.trunc(popul.record), popul.record + 5, 190);
    }
    
    
    pop();
    
    textAlign(CENTER);
    fill(255);
    strokeWeight(3.5);
    stroke(0);
    textSize(20);
    text(`Generation: ${popul.generations}`, width / 2, 20);
    text(`Rockets Alive: ${popul.numAlive()}`, width / 2, 50);    
    text(`Record: ${Math.trunc(popul.record)}`, width / 2, 80);
}