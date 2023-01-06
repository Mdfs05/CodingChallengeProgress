class Particle {
  constructor() {
    this.fov = 45;
    this.pos = createVector(sceneW/2, sceneH/2);
    this.rays = [];
    this.heading = 0;
    //Creating rays casting out in all diretions using position and the angle (raidians)
    for(let a = (-this.fov) /2; a < this.fov/2; a+=1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }
  
  updateFOV(fov) {
    this.fov = fov;
    this.rays = [];
    for(let a = (-this.fov) /2; a < this.fov/2; a+=1) {
      this.rays.push(new Ray(this.pos, radians(a) + this.heading));
    }
  }
  
  rotate(angle) {
    this.heading += angle;
    let index = 0;
    for(let a = (-this.fov) /2; a < this.fov/2; a += 1) {
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }
  
  move(amt, strafe) {
    const vel = p5.Vector.fromAngle(this.heading);
    vel.setMag(amt);
    const velStrafe = p5.Vector.fromAngle(this.heading + radians(90));
    velStrafe.setMag(strafe);
    this.pos.add(vel);
    this.pos.add(velStrafe);
    if (this.wallCollision() === true) {
      this.pos.sub(vel);
      this.pos.sub(velStrafe);
    }
  }
  
  wallCollision() {
    let collide;
    for(let wall of walls) {
      collide = collideLineCircle(wall.a.x, wall.a.y, wall.b.x, wall.b.y, this.pos.x, this.pos.y, 16);
      if (collide === true) {
        return true;
      }
    }
    return false;
  }
  
  update(x,y) {
    this.pos.set(x,y);
  }
  
  look(walls) {
    const scene = [];
    for(let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for(let wall of walls) {
        const pt = ray.cast(wall);
        if(pt) {
          //line(this.pos.x, this.pos.y, pt.x, pt.y);
          let d = p5.Vector.dist(this.pos, pt);
          const a = ray.dir.heading() - this.heading;
          if(!mouseIsPressed) {
            d *= cos(a);
          }
          if(d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if(closest) {
        //replace rgb value with '255' to make rays white, leave last value of 100 for transparency
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene[i] = record;
    }
    return scene;
  }
  
  show() {
    //255 for a white gorb
    fill(255);
    ellipse(this.pos.x, this.pos.y, 16);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}
