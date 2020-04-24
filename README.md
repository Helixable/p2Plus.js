---

<h1 id="p2plus.js">p2Plus.js</h1>
<p>A small addon for p2.js with some useful functions for quick prototyping.</p>
<h3 id="features">Features</h3>
<ul>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" checked="true" disabled=""> Camera system</li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" checked="true" disabled=""> Key detection</li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" checked="true" disabled=""> Hassle-free wireframe rendering</li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" checked="true" disabled=""> Camera following system</li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" checked="true" disabled=""> Camera scale system</li>
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" checked="true" disabled=""> Simple/Easy to use functions</li>
</ul>
<h2 id="files">Files</h2>
<p><a href="https://github.com/Helixable/p2Plus.js/blob/master/p2Plus.js">p2Plus.js</a> - Standard file<br>
<a href="https://github.com/Helixable/p2Plus.js/blob/master/p2Plus.min.js">p2Plus.min.js</a> - Minified file</p>
<h2 id="how-to-use-p2plus">How to use p2Plus</h2>
<p>Simply refer the script <em><strong>after</strong></em> you refer to p2.js.</p>
<h2 id="docs">Docs</h2>
<h4 id="initialization">Initialization</h4>
<pre><code>var p2P =  new p2Plus({
	canvas: document.getElementById('canv'), //Canvas to render
	scale:  20, //Rendering scale
	world: world, //p2 World
	p2: p2 //Optional p2 object
});
</code></pre>
<h4 id="key-detection">Key Detection</h4>
<pre><code>if (p2P.keyState('w')){
	console.log('W key pressed');
};
</code></pre>
<h4 id="camera-manipulation">Camera Manipulation</h4>
<pre><code>if(p2P.keyState('w')){
	p2P.CAM.Y  +=  1;
};

if(p2P.keyState('s')){
	p2P.CAM.Y  -=  1;
};

if(p2P.keyState('a')){
	p2P.CAM.X  +=  1;
};

if(p2P.keyState('d')){
	p2P.CAM.X  -=  1;
};

var box =  new p2.Body({
	position:  [3,  2],
	mass:  1,
	angularVelocity:  -0.2
});

box.addShape(new p2.Box({
	width:  1,
	height:  1
}),  [0,  0.5]);

world.addBody(box);

//Focus camera on point
p2P.CAM.center(box.position[0], box.position[1]);
</code></pre>
<h4 id="d-wireframe-rendering">2D Wireframe Rendering</h4>
<pre><code>function draw(){
	ctx.clearRect(0,0,1000,1000); //Clear canvas
	world.step(1  /  60); //Tick p2.js world
	p2P.render() //Render wireframe with p2Plus.js
}
window.requestAnimationFrame(draw)
draw()
</code></pre>
<h2 id="license">License</h2>
<p>MIT</p>

