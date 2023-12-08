let joinedText = "Sezession (lateinisch secessio ‚Abspaltung‘, ‚Abseitsgehen‘, ‚Trennung‘; die Gebietsabtrennung ist auch als Separation bekannt) bezeichnet im Politischen die Loslösung einzelner Landesteile aus einem bestehenden Staat mit dem Ziel, einen eigenen unabhängigen und neuen souveränen Staat zu bilden oder sich einem anderen Staat anzuschließen. Im Zuge einer Sezession entstehen in der Regel ein oder mehrere staatliche Subjekte, und gleichzeitig existiert weiterhin der verkleinerte Altstaat, der oft auch als „Rumpfstaat“, „Reststaat“ oder „Schrumpfstaat“ bezeichnet wird. Obgleich jener vor der Teilung vorhandene Altstaat oder Zedent infolge seiner Kontinuität und Subjektidentität mit dem Rumpfstaat nicht zu den Nachfolgestaaten gehört, muss er nicht seinen traditionellen Namen behalten. Die Lostrennung eines Teilgebietes eines Staates kann unter Umständen dazu beitragen, schwere Menschenrechtsverletzungen zu beenden. ";
let alphabet;
let drawLetters = [];

let posX;
let posY;

let drawLines = false;
let drawText = true;

function preload() {
  //joinedText = loadStrings('Sezession.txt');
}

function setup() {
  createCanvas(650, windowHeight);
	
  textFont('Montserrat-Black.otf', 30);
  fill(87, 35, 180);

  // Use join method to combine the lines into a single string
  //joinedText = join(joinedText, ' ');
  alphabet = getUniqCharacters();
  for (let i = 0; i < alphabet.length; i++) {
    drawLetters[i] = true;
  }
}

function draw() {
  background(255);

  posX = 20;
  posY = 40;
  let oldX = 0;
  let oldY = 0;

  // go through all characters in the text to draw them
  for (let i = 0; i < joinedText.length; i++) {
    // again, find the index of the current letter in the character set
    let upperCaseChar = joinedText.charAt(i).toUpperCase();
    let index = alphabet.indexOf(upperCaseChar);
    if (index < 0) continue;

    let sortY = index * 20 + 40;
    let m = map(mouseX, 50, width - 50, 0, 1);
    m = constrain(m, 0, 1);
    let interY = lerp(posY, sortY, m);

    if (drawLetters[index]) {
      if (drawLines) {
        if (oldX != 0 && oldY != 0) {
          stroke(181, 157, 0, 100);
          line(oldX, oldY, posX, interY);
        }
        oldX = posX;
        oldY = interY;
      }

      if (drawText) {
        noStroke();
        text(joinedText.charAt(i), posX, interY);
      }
    } else {
      oldX = 0;
      oldY = 0;
    }

    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 200 && upperCaseChar == ' ') {
      posY += 30;
      posX = 20;
    }
  }
}

function getUniqCharacters() {
  let charsArray = joinedText.toUpperCase().split('');
  let uniqCharsArray = charsArray.filter(function(char, index) {
    return charsArray.indexOf(char) == index;
  }).sort();
  return uniqCharsArray.join('');
}

function keyReleased() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (key == '1') drawLines = !drawLines;
  if (key == '2') drawText = !drawText;
  if (key == '3') {
    for (let i = 0; i < alphabet.length; i++) {
      drawLetters[i] = false;
    }
  }
  if (key == '4') {
    drawText = true;
    for (let i = 0; i < alphabet.length; i++) {
      drawLetters[i] = true;
    }
  }

  let index = alphabet.indexOf(key.toUpperCase());
  if (index >= 0) {
    drawLetters[index] = !drawLetters[index];
  }
}
