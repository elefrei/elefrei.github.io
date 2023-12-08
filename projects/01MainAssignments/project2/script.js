let spiralRadius = 10;
let draggableCircle;
let spiralPoints = []
let song;
let maxVolume = 1.0;
let minVolume = 0;

function preload (){
soundFormats('mp3');
song = loadSound('technoBells.mp3');

}
function setup() {
  createCanvas(600, 600);
  
  draggableCircle = new DraggableCircle(width/2,height/2,10);
	
}

function draw() {
  background(255);

	push()
	  translate(width / 2, height / 2);
    beginShape();
    noFill();
    stroke(0);
    strokeWeight(2);
	
	
	for (let angle = 0; angle < 6 * PI; angle += 0.1) {
    let radius = spiralRadius + angle * 10;
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    vertex(x, y);
}
   endShape();
 pop()
  draggableCircle.display();
}

if (draggableCircle <= 0 && sound.isPlaying()) {
    sound.stop();
	
// when the circle is in the middle/start of the spiral, the volume is minVolume=0
// when the circle is at the end of the spiral, the volume is maxVolume=1
		
	
  }

function mouseDragged() {
  draggableCircle.draggable();
	
	let x = snap(mouseX);
  let y = snap(mouseY);
	vertex(x, y);
	if (isDragging){
		draggableCircle = mouseX;
		draggableCircle = constrain(draggableCircle, this.x, this.y)
	
	}

}

function mouseReleased() {
	 draggableCircle.release();
	
// circle is staying at the point when the mouse is released, sound is stable. 

}

