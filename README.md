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
<pre class=" language-js"><code class="prism  language-js"><span class="token keyword">var</span> p2P <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">p2Plus</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	canvas<span class="token punctuation">:</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'canv'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">//Canvas to render</span>
	scale<span class="token punctuation">:</span>  <span class="token number">20</span><span class="token punctuation">,</span> <span class="token comment">//Rendering scale</span>
	world<span class="token punctuation">:</span> world<span class="token punctuation">,</span> <span class="token comment">//p2 World</span>
	p2<span class="token punctuation">:</span> p2 <span class="token comment">//Optional p2 object</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<h4 id="key-detection">Key Detection</h4>
<pre class=" language-js"><code class="prism  language-js"><span class="token keyword">if</span> <span class="token punctuation">(</span>p2P<span class="token punctuation">.</span><span class="token function">keyState</span><span class="token punctuation">(</span><span class="token string">'w'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'W key pressed'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<h4 id="camera-manipulation">Camera Manipulation</h4>
<pre class=" language-js"><code class="prism  language-js"><span class="token keyword">if</span><span class="token punctuation">(</span>p2P<span class="token punctuation">.</span><span class="token function">keyState</span><span class="token punctuation">(</span><span class="token string">'w'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	p2P<span class="token punctuation">.</span>CAM<span class="token punctuation">.</span>Y  <span class="token operator">+=</span>  <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">if</span><span class="token punctuation">(</span>p2P<span class="token punctuation">.</span><span class="token function">keyState</span><span class="token punctuation">(</span><span class="token string">'s'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	p2P<span class="token punctuation">.</span>CAM<span class="token punctuation">.</span>Y  <span class="token operator">-=</span>  <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">if</span><span class="token punctuation">(</span>p2P<span class="token punctuation">.</span><span class="token function">keyState</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	p2P<span class="token punctuation">.</span>CAM<span class="token punctuation">.</span>X  <span class="token operator">+=</span>  <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">if</span><span class="token punctuation">(</span>p2P<span class="token punctuation">.</span><span class="token function">keyState</span><span class="token punctuation">(</span><span class="token string">'d'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	p2P<span class="token punctuation">.</span>CAM<span class="token punctuation">.</span>X  <span class="token operator">-=</span>  <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> box <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">p2<span class="token punctuation">.</span>Body</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	position<span class="token punctuation">:</span>  <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span>  <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
	mass<span class="token punctuation">:</span>  <span class="token number">1</span><span class="token punctuation">,</span>
	angularVelocity<span class="token punctuation">:</span>  <span class="token operator">-</span><span class="token number">0.2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

box<span class="token punctuation">.</span><span class="token function">addShape</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">p2<span class="token punctuation">.</span>Box</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
	width<span class="token punctuation">:</span>  <span class="token number">1</span><span class="token punctuation">,</span>
	height<span class="token punctuation">:</span>  <span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0.5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

world<span class="token punctuation">.</span><span class="token function">addBody</span><span class="token punctuation">(</span>box<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Focus camera on point</span>
p2P<span class="token punctuation">.</span>CAM<span class="token punctuation">.</span><span class="token function">center</span><span class="token punctuation">(</span>box<span class="token punctuation">.</span>position<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> box<span class="token punctuation">.</span>position<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<h4 id="d-wireframe-rendering">2D Wireframe Rendering</h4>
<pre class=" language-js"><code class="prism  language-js"><span class="token keyword">function</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	ctx<span class="token punctuation">.</span><span class="token function">clearRect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Clear canvas</span>
	world<span class="token punctuation">.</span><span class="token function">step</span><span class="token punctuation">(</span><span class="token number">1</span>  <span class="token operator">/</span>  <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//Tick p2.js world</span>
	p2P<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//Render wireframe with p2Plus.js</span>
<span class="token punctuation">}</span>
window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>draw<span class="token punctuation">)</span>
<span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>
<h2 id="license">License</h2>
<p>MIT</p>

