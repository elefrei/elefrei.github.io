class DraggableCircle {
	constructor(x, y, radius) {
		this.radius = radius;
		this.angle = 0;
		this.x = x;
		this.y = y;
		this.isDragging = false;
	}

	display() {
		fill(255, 0, 0);
		ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
		let distance = dist(mouseX, mouseY, this.x, this.y);

		if (distance <= this.radius && !this.isDragging) {
			cursor("grab");
		} else if (distance <= this.radius) {
			cursor("grabbing");
		} else {
			cursor(ARROW);
		}
	}
	release() {
		this.isDragging = false;
		cursor(ARROW);
	}

	draggable() {
		let distance = dist(mouseX, mouseY, this.x, this.y);

		if (distance <= this.radius) {

			if (mouseIsPressed) {
				this.isDragging = true;
			}
		}

		if (this.isDragging) {
			this.x = mouseX;
			this.y = mouseY;
			this.angle = atan2(this.y, this.x);
			//this.radius = constrain(dist(0, 0, this.x, this.y), spiralRadius, spiralRadius + 100);
		}
	}
}