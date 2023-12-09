class Spiral {
	constructor(radius) {
	  this.radius = radius;
	  this.points = [];
	  this.offset = createVector(width / 2, height / 2);
	  this.addPoints();
	}
  
	addPoints() {
	  for (let angle = 0; angle < 6 * PI; angle += 0.1) {
		let radius = spiralRadius + angle * 10;
		let x = radius * cos(angle);
		let y = radius * sin(angle);
		let point = createVector(this.offset.x + x, this.offset.x  + y);
		this.points.push(point);
	  }
	}
  
	display() {
	  noFill(0);
	  stroke(255,0,255);
	  strokeWeight(2);
	  beginShape();
	  for (let i = 0; i < this.points.length; i++) {
		vertex(this.points[i].x, this.points[i].y);
	  }
	  endShape();
	}
  }