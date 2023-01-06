class Boundary {
    //Creating the constructor class for the boundary using two sets of coordiantes to draw a line between
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
  }
  
  show() {
    //Uses the provided points to draw a boundary
    stroke(255, 255, 255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
