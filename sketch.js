let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;

let sceneW = 400;
let sceneH = 400;
let sliderFOV;

function setup() {
  createCanvas(800, 400);
  //Making a new boundary instance
  for(let i = 0; i < 5; i++) {
    let x1 = random(sceneW);
    let x2= random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, x2, y1, y2);
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));
  particle = new Particle();
  sliderFOV = createSlider(0, 360, 45);
  sliderFOV.input(changeFOV);
  //ray = new Ray(100, 200);
}

function changeFOV() {
  const fov = sliderFOV.value();
  particle.updateFOV(fov);
}

function draw() {
  let brightnessFactor = 245;
  
  if (keyIsDown(87)) {
    particle.move(1, 0);
  } if (keyIsDown(83)) {
    particle.move(-1, 0);
  }  if (keyIsDown(65)) {
    particle.move(0, -1);
  } if (keyIsDown(68)) {
    particle.move(0, 1);
  } if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.05);
  } if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.05);
  }  
  
  //Flashlight
  if (keyIsDown(70)) {
    brightnessFactor = 0;
  }
  
  background(0);
  //fill(255, 0, 0);
  //textSize(35);
  //text("IT IS COMING", 100, 350);
  //Telling the wall and ray to show
  for(let wall of walls) {
      wall.show();
  }
  //particle.update(mouseX, mouseY);
  //particle.update(noise(xoff)*sceneW, noise(yoff)*sceneH);
  particle.show();
    
  //xoff += 0.01;
  //yoff += 0.01;
  
  const scene = particle.look(walls);
  const w = sceneW / scene.length;
  push();
  translate(sceneW, 0);
  let colour = [255, 10, 244];
  for(let i = 0; i < scene.length; i++) {
    noStroke();
    const sq = scene[i]*scene[i];
    const wSq = sceneW * sceneW;
    const b = map(sq, 0, wSq, 255, 0);
    const h = map(scene[i], 0, sceneW, sceneH, 0);
    //(b-brightnessFactor), (b-brightnessFactor), (b-brightnessFactor)
    fill((b-brightnessFactor));
    rectMode(CENTER);
    rect((i* (w + w))/2, sceneH/2, w+1, h);
    //17:15
  }
  pop();
  // ray.show();
  // ray.lookAt(mouseX, mouseY);
  
  //let pt = ray.cast(wall);
  // if(pt) {
  //   fill(255);
  //   ellipse(pt.x, pt.y, 8, 8);
  // }
}
