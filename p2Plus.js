/*
 * @license
 * p2Plus.js - v1.0.1
 * Copyright (c) 2020, Noah Gerard
 *
 *
 * p2Plus.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */


function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const dist = function(x1,y1,x2,y2){return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)}


var p2Plus = function(options){

    this.CAM = {
        X: 0,
        Y: 0,
        W: options.canvas.width,
        H: options.canvas.height,

        //Center: [],
    }

    
    var CAM = this.CAM
    this.CAM.center = function(x, y){
        CAM.X = (options.canvas.width / options.scale) / 2 - options.scale * x;
        CAM.Y = (options.canvas.height / options.scale) / 2 - options.scale * -y;
    }
    this.CAM.follow = function(objects){

    }


    this.ctx = options.canvas.getContext("2d");
    this.ctx.lineWidth = 0.05;

    function getVector(x, y, angle, length) {
        length = typeof length !== 'undefined' ? length : 10;
        angle = angle * Math.PI / 180;
        return [length * Math.cos(angle) + x, length * Math.sin(angle) + y]
    }

    this.keyState = (() => {
        const state = {};
        window.addEventListener('keyup', function(e){
            state[e.key] = false;
        });
        window.addEventListener('keydown', function(e){
            state[e.key] = true;
        });
        return (key) => state.hasOwnProperty(key) && state[key] || false
    })();

    this.render = function(){
        scaleX = options.scale;
	    scaleY = -options.scale;
        // Transform the canvas
        this.ctx.save();
        // ctx.translate(w / 2, h / 2); // Translate to the center
        this.ctx.translate(this.CAM.X + (this.CAM.W / 2), this.CAM.Y + (this.CAM.H / 2)); // Translate to the center
        this.ctx.scale(options.scale, -options.scale);
        for (var i = 0; i < options.world.bodies.length; i++) {
            var shipes = []
            var body = options.world.bodies[i];
            var spring = options.world.springs;

            for (var s = 0; s < spring.length; s++) {
                spr = spring[s]
                if(spr instanceof options.p2.LinearSpring){
                    this.spring(body.world.springs[s])
                }
            }

            for (var j = 0; j < body.shapes.length; j++) {
                var shape = body.shapes[j];

                if (body.shapes.length < 2){
                    if(shape instanceof options.p2.Box) {
                        this.box(body, shape);
                    } else if(shape instanceof options.p2.Circle) {
                        this.circle(body, shape);
                    } else if(shape instanceof options.p2.Plane){
                        this.plane(body, shape)
                    } else if(shape instanceof options.p2.Particle){
                        this.particle(body, shape)
                    } else if(shape instanceof options.p2.Convex){
                        this.convex(body, shape)
                    } else if(shape instanceof options.p2.Heightfield){
                        this.heightfield(body, shape)
                    } else if(shape instanceof options.p2.Line){
                        this.line(body, shape)
                    } else if(shape instanceof options.p2.Capsule){
                        this.capsule(body, shape)
                    }
                } else {
                    pos = shape.body.shapes[j]
                    if(shape instanceof options.p2.Box) {
                        this.box(body, shape, pos);
                    } else if(shape instanceof options.p2.Circle) {
                        this.circle(body, shape, pos);
                    } else if(shape instanceof options.p2.Plane){
                        this.plane(body, shape, pos)
                    } else if(shape instanceof options.p2.Particle){
                        this.particle(body, shape, pos)
                    } else if(shape instanceof options.p2.Convex){
                        this.convex(body, shape, pos)
                    } else if(shape instanceof options.p2.Heightfield){
                        this.heightfield(body, shape, pos)
                    } else if(shape instanceof options.p2.Line){
                        this.line(body, shape, pos)
                    } else if(shape instanceof options.p2.Capsule){
                        this.capsule(body, shape, pos)
                    }
                }
            }
        }

        this.ctx.restore()
    }

    this.box = function(body, shape, comp) {
        var x = body.position[0],
            y = body.position[1];

        this.ctx.save();
        this.ctx.translate(x, y); // Translate to the center of the box
        this.ctx.rotate(body.angle); // Rotate to the box body frame
        this.ctx.beginPath();
        if(comp){
            xx = comp.position[0]
            yy = comp.position[1]
            vert = shape.vertices
            this.ctx.moveTo(vert[0][0]+xx, vert[0][1]-yy);
            this.ctx.lineTo(vert[1][0]+xx, vert[1][1]-yy);
            this.ctx.lineTo(vert[2][0]+xx, vert[2][1]-yy);
            this.ctx.lineTo(vert[3][0]+xx, vert[3][1]-yy);
            this.ctx.lineTo(vert[0][0]+xx, vert[0][1]-yy);
            this.ctx.moveTo(0, 0);
        this.ctx.lineTo(shape.width / 2, 0);
        } else {
            this.ctx.rect(
                -shape.width / 2,
                -shape.height / 2,
                shape.width,
                shape.height
            );
        }
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(shape.width / 2, 0);
        this.ctx.stroke();
        this.ctx.restore();
    }

    this.particle = function(body, shape, comp) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(body.position[0], body.position[1]);
        this.ctx.rotate(body.angle);

        temp1 = this.ctx.lineWidth
        this.ctx.lineWidth = temp1*2

        if (comp){
            x = comp.position[0]
            y = comp.position[1]
            this.ctx.arc(x, y, 0.03, 0, 2 * Math.PI, false);
            this.ctx.lineTo(x, y);
        } else {
            this.ctx.arc(0, 0, 0.03, 0, 2 * Math.PI, false);
            this.ctx.lineTo(0, 0);
        }

        this.ctx.stroke();
        this.ctx.lineWidth = temp1
        this.ctx.restore();
    }

    this.line = function(body, shape, comp) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(body.position[0], body.position[1]);
        this.ctx.rotate(body.angle);
        if (comp){
            this.ctx.moveTo(body.position[0], body.position[1])
            pos = getVector(body.position[0], body.position[1], shape.angle, shape.length)
            this.ctx.lineTo(pos[0], pos[1])
        } else {
            this.ctx.moveTo(0, 0)
            pos = getVector(0, 0, shape.angle, shape.length)
            this.ctx.lineTo(pos[0], pos[1])
            log(shape)
        }
        this.ctx.stroke();
        this.ctx.restore();
    }

    this.heightfield = function(body, shape, comp) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(body.position[0], body.position[1]);
        this.ctx.rotate(body.angle);

        var path = [[0,-100]];
        for(var j=0; j!==shape.heights.length; j++){
            var v = shape.heights[j];
            path.push([j*shape.elementWidth, v]);
        }
        path.push([shape.heights.length*shape.elementWidth,-100]);

        var lastx = null,
            lasty = null;
        for (var i = 0; i < path.length; i++) {
            var v = path[i],
                x = v[0],
                y = v[1];
            if (x !== lastx || y !== lasty) {
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    // Check if the lines are parallel
                    var p1x = lastx,
                        p1y = lasty,
                        p2x = x,
                        p2y = y,
                        p3x = path[(i + 1) % path.length][0],
                        p3y = path[(i + 1) % path.length][1];
                    var area = ((p2x - p1x) * (p3y - p1y)) - ((p3x - p1x) * (p2y - p1y));
                    if (area !== 0) {
                        ctx.lineTo(x, y);
                    }
                }
                lastx = x;
                lasty = y;
            }
        }

        this.ctx.stroke();
        this.ctx.restore();
    }


    this.convex = function(body, shape, comp){
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(body.position[0], body.position[1]);
        this.ctx.rotate(body.angle);
        var x = body.position[0]
        var y = body.position[1]
        //log(shape)
        if (comp){
            x = 0;
            y = 0;
            this.ctx.translate(comp.position[0], comp.position[1]);
            this.ctx.rotate(comp.angle);
            this.ctx.moveTo(shape.vertices[0][0]+x, shape.vertices[0][1]+y)
            for (i = 0; i < shape.vertices.length; i++){
                this.ctx.lineTo(shape.vertices[i][0]+x, shape.vertices[i][1]+y)
            }
            this.ctx.lineTo(shape.vertices[0][0]+x, shape.vertices[0][1]+y)
        } else {
            var x = shape.position[0]
            var y = shape.position[1]
            this.ctx.moveTo(shape.vertices[0][0]+x, shape.vertices[0][1]+y)
            for (i = 0; i < shape.vertices.length; i++){
                this.ctx.lineTo(shape.vertices[i][0]+x, shape.vertices[i][1]+y)
            }
            this.ctx.lineTo(shape.vertices[0][0]+x, shape.vertices[0][1]+y)
        }
        this.ctx.stroke();
        this.ctx.restore();
    }


    this.circle = function(body, shape, comp) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(body.position[0], body.position[1]);
        this.ctx.rotate(body.angle);

        if (comp){
            x = comp.position[0]
            y = comp.position[1]
            this.ctx.arc(x, y, shape.radius, 0, 2 * Math.PI, false);
            this.ctx.lineTo(x, y);
        } else {
            this.ctx.arc(0, 0, shape.radius, 0, 2 * Math.PI, false);
            this.ctx.lineTo(0, 0);
        } 

        this.ctx.stroke();
        this.ctx.restore();
    }

    this.plane = function(body, shape) {
        var x = body.position[0],
            y = body.position[1]
            length = 5;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(body.position[0], body.position[1]);
        this.ctx.rotate(body.angle);
        this.ctx.moveTo(-100000, 0);
        this.ctx.lineTo(100000, 0);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -0.5);
        this.ctx.stroke();
        this.ctx.restore();
    }

    this.spring = function(body, shape){
        this.ctx.save();
        this.ctx.beginPath();

        ctx.moveTo(body.bodyA.position[0], body.bodyA.position[1])
        
        ctx.lineTo(body.bodyB.position[0], body.bodyB.position[1]);
        
        this.ctx.stroke();
        this.ctx.restore();
    };

    this.capsule = function(body, shape, comp){
        this.ctx.save();
        this.ctx.translate(body.position[0], body.position[1]);
        this.ctx.rotate(body.angle);
        this.ctx.beginPath();

        var x = 0
        var y = 0

        if (comp){
            x = comp.position[0]
            y = comp.position[1]
            this.ctx.arc(x, y, shape.radius, 0, 2 * Math.PI, false);
            this.ctx.lineTo(x, y);
        }

        var c = Math.cos(body.angle);
        var s = Math.sin(body.angle);
        radius = shape.radius
        len = shape.length
        this.ctx.arc(-len/2*c + x, -len/2*s + y, radius, 0, 2 * Math.PI, false);
        this.ctx.arc( len/2*c + x,  len/2*s + y, radius, 0, 2 * Math.PI, false);

        this.ctx.moveTo(-len/2*c + radius*s + x, -len/2*s + radius*c + y);
        this.ctx.lineTo( len/2*c + radius*s + x,  len/2*s + radius*c + y);
        this.ctx.lineTo( len/2*c - radius*s + x,  len/2*s - radius*c + y);
        this.ctx.lineTo(-len/2*c - radius*s + x, -len/2*s - radius*c + y);

        this.ctx.moveTo(-len/2*c + radius*s + x, -len/2*s + radius*c + y);
        this.ctx.lineTo( len/2*c + radius*s + x,  len/2*s + radius*c + y);
        this.ctx.moveTo(-len/2*c - radius*s + x, -len/2*s - radius*c + y);
        this.ctx.lineTo( len/2*c - radius*s + x,  len/2*s - radius*c + y);
        
        this.ctx.stroke();
        this.ctx.restore();
    };


    this.getPhysicsCoord = function(mouseEvent) {
        var rect = options.canvas.getBoundingClientRect();
        var x = mouseEvent.clientX - rect.left;
        var y = mouseEvent.clientY - rect.top;

        x = (x - this.CAM.W / 2) / options.scaleX;
        y = (y - this.CAM.H / 2) / options.scaleY;

        return [x, y];
    }
}
