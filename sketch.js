let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 1000;

function setup() {
  createCanvas(400, 400);
  //Making a new boundary instance
  for(let i = 0; i < 5; i++) {
    let x1 = random(width);
    let x2= random(width);
    let y1 = random(width);
    let y2 = random(width);
    walls[i] = new Boundary(x1, x2, y1, y2);
  }
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));
  particle = new Particle();
  //ray = new Ray(100, 200);
}

function draw() {
  background(0);
  fill(255, 0, 0);
  textSize(35);
  text("IT IS COMING", 100, 350);
  //Telling the wall and ray to show
  for(let wall of walls) {
      wall.show();
  }
  //particle.update(mouseX, mouseY);
  particle.update(noise(xoff)*width, noise(yoff)*width);
  particle.show();
  particle.look(walls);
  
  xoff += 0.01;
  yoff += 0.01;
  // ray.show();
  // ray.lookAt(mouseX, mouseY);
  
  //let pt = ray.cast(wall);
  // if(pt) {
  //   fill(255);
  //   ellipse(pt.x, pt.y, 8, 8);
  // }
}
