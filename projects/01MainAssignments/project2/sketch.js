let spiralRadius = 10;
let draggableCircle;
let spiralPoints = [];
let song;
let vol;
let songPlaying = false;

function preload() {
    song = createAudio("assets/Jiro.mp3");
}

function setup() {
  createCanvas(600, 600);
  draggableCircle = new DraggableCircle(width / 2, height / 2, 10);
  spiral = new Spiral(spiralRadius);
  song.volume(0);
}

function draw() {
  background(0,0,255);
  spiral.display();
  draggableCircle.display();

    if (draggableCircle.isDragging) {
        if (!song.isPlaying) {
            song.play();
            song.isPlaying = true;
        }
      let mouseLoc = createVector(mouseX, mouseY);
      let closestDistance = Infinity;
      for (let i = 0; i < spiral.points.length; i++) {
        let distance = p5.Vector.dist(mouseLoc, spiral.points[i]);
        if (distance < closestDistance) {
            closestDistance = distance;
            vol = map(i, 0, spiral.points.length-1, 0, 1);
        }
        song.volume(vol);
        }
    }
    
}

function mouseDragged() {
  draggableCircle.snap(spiral);
}

function mouseReleased() {
    draggableCircle.release();
    song.volume(vol);
}