class Particle {
  constructor() {
    this.pos = createVector(width/2, height /2);
    this.rays = [];
    //Creating rays casting out in all diretions using position and the angle (raidians)
    for(let a = 0; a < 360; a+=1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }
  
  update(x,y) {
    this.pos.set(x,y);
  }
  
  look(walls) {
    for(let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for(let wall of walls) {
        const pt = ray.cast(wall);
        if(pt) {
          //line(this.pos.x, this.pos.y, pt.x, pt.y);
          const d = p5.Vector.dist(this.pos, pt);
          if(d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if(closest) {
        //replace rgb value with '255' to make rays white, leave last value of 100 for transparency
        stroke(255, 0, 0, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }
  
  show() {
    //255 for a white gorb
    fill(255, 0, 0);
    ellipse(this.pos.x, this.pos.y, 16);
    for (let ray of this.rays) {
      ray.show();
    }
    //23:16
  }
}
