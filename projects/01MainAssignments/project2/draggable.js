class DraggableCircle {
	constructor(x, y, radius) {
	  this.radius = radius;
	  this.position = createVector(x, y);
	  this.velocity = createVector(0, 0);
	  this.acceleration = createVector(0, 0);
	  this.isDragging = false;
	}
  
	display() {
	  fill(255, 0, 255);
	  ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
	}
  
	snap(p) {
	  let mouseLoc = createVector(mouseX, mouseY);
  
	  // Find the normal point along the path
	  for (let i = 0; i < p.points.length - 1; i++) {
		let a = p.points[i].copy();
		let b = p.points[i + 1].copy();
		let normalPoint = this.getNormalPoint(mouseLoc, a, b);
  
		// Check if the normal point is outside the segment
		if (normalPoint.x < a.x || normalPoint.x > b.x) {
		  normalPoint = b.copy();
		}
  
		let distance = p5.Vector.dist(mouseLoc, normalPoint);
		if (distance < this.radius/2) {
			this.position = normalPoint;
			this.isDragging = true;
		}
	  }
	}
  
	// Get the normal point from p to line segment ab
	getNormalPoint(p, a, b) {
	  let ap = p5.Vector.sub(p, a);
	  let ab = p5.Vector.sub(b, a);
	  ab.normalize();
	  let d = ap.dot(ab);
	  ab.mult(d);
	  let normalPoint = p5.Vector.add(a, ab);
	  return normalPoint;
	}
  
	release() {
	  this.isDragging = false;
	}
		  
  }