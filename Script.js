var myCanvas = document.getElementById("canvas");
var c = myCanvas.getContext("2d");
c.canvas.width = window.innerWidth-10;
c.canvas.height = window.innerHeight-25;
c.shadowInset = true;
c.shadowBlur = 20;
c.shadowColor = "#0088ff";
c.shadowOffsetX = 0;
c.shadowOffsetY = 0;

var balls = [];
//var redArc = new Circle(0, 10, 10, "red");
//balls.push(redArc);


function Circle(x, y, radius, color) {
   this.x = x;
   this.y = y;
   this.radius = radius;
   this.color = color;

   var velocity_x = random_num(1, 15);
   var velocity_y = random_num(1, 15);
   var gravity = Math.max(Math.random(), .5);
   var friction = Math.max(Math.random(), .5);
   if (random_num(0, 2)) {
     var velocity_x = ~velocity_x + 1;
   }
   if (random_num(0, 2)) {
     var velocity_y = ~velocity_y + 1;
   }

   this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.color;

      //c.font = "10px Arial";
	  //c.fillText("x ="+vy, this.x+22, this.y);
	  //c.fillText("y ="+this.y, this.x+55, this.y);

      c.fill();
   }

   this.update = function() {
 
		if (this.y + radius >= canvas.height) {
		    if (velocity_y > 0) {
		      velocity_y = (~velocity_y + 1);
		    }
		    velocity_y = velocity_y * gravity;
		    velocity_x = velocity_x * friction;
		}
		this.y += velocity_y;
	  
	  	if (this.y + radius < canvas.height - 4) {
	    	velocity_y += 1;
	  	}

	  	if (this.x + radius >= canvas.width || this.x - radius <= 0) {
	   		velocity_x = ~velocity_x + 1;
	    	velocity_x = velocity_x * friction;
	  	}
	  	this.x += velocity_x;
	  

	    this.draw();
   }

   if (balls.length==25) {
      balls.splice(0, 1);
   }

   this.update();
   }

// function animate() {
//    c.clearRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight);
//    for (let i = 0; i < balls.length; i++) {
//     	balls[i].update();
//    }
//    requestAnimationFrame(animate);
// }

//animate();

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

var now, dt,
last = timestamp();

function frame() {
  now   = timestamp();
  dt    = (now - last) / 1000;    // duration in seconds
  
  c.clearRect(0, 0, myCanvas.clientWidth, myCanvas.clientHeight);
   for (let i = 0; i < balls.length; i++) {
      balls[i].update();
  }
  last = now;
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

//setInterval(animate, 15);


// function delete_ball() {	
// 	balls.pop();  
// }

canvas.addEventListener('mousedown', handleMouseDown);

function handleMouseDown(e) {
	balls.push(new Circle(e.pageX,e.pageY,15,"white"));
}

function random_num(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}
