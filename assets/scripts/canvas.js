function generateTriangles() {
  //console.log("Generating triangles");
  var triangles = Delaunay.triangulate(vertices);

  for(var i = triangles.length; i; ) {
    ctx.beginPath();
    var colVal = triColors[i];
    --i; ctx.moveTo(vertices[triangles[i]][0], vertices[triangles[i]][1]);
    --i; ctx.lineTo(vertices[triangles[i]][0], vertices[triangles[i]][1]);
    --i; ctx.lineTo(vertices[triangles[i]][0], vertices[triangles[i]][1]);
    ctx.closePath();
    //ctx.stroke();
    ctx.fillStyle = 
      "rgba(" + 
      colVal + "," +  
      colVal + "," +  
      colVal + ", 1)";
    ctx.fill();
  }
}

function jiggleVertices() {
  console.log("Commence jiggling");
  for(var i = 0; i < vertices.length; i++) {
    var x = vertices[i][0] + randRange(-1, 1);
    var y = vertices[i][1] + randRange(-1, 1);
    vertices[i] = [x, y];
  }

  generateTriangles();
}

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genTriColors(colors, min, max) {
  for(var i = 0; i < colors.length; i++) {
    colors[i] = randRange(min, max);
  }
}

var SPACING = 200;
var CANVAS = {
  id: "bgCanvas",
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) + 2 * SPACING, 
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) + 2 * SPACING,
  border: 10,
  color: "#FFF",
};

// initialize canvas
var canvas = document.getElementById(CANVAS.id);
var ctx = canvas.getContext("2d");
ctx.canvas.width  = CANVAS.width;
ctx.canvas.height = CANVAS.height;
ctx.fillStyle = CANVAS.color;
ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);

var vertices = [];// = new Array(CANVAS.vertices);
for(var j = -SPACING; j < CANVAS.height; j+=SPACING) {
  for(var i = -SPACING; i < CANVAS.width; i+=SPACING) {
    var x = i + (0.4 * SPACING) + 0.2 * (SPACING * Math.random());
    var y = j + (0.4 * SPACING) + 0.2 * (SPACING * Math.random());
    vertices.push([x, y]);
    console.log("Quadrant at (" + i + ", "+ j + ") | Point generated at (" + x + ", "+ y + ")");
  }
}

console.log(vertices);

var triColors = new Array(Delaunay.triangulate(vertices).length);
genTriColors(triColors, 20, 250);

generateTriangles();
var timer = setInterval(jiggleVertices, 100);

ctx.strokeStyle="#00FF00";
for(var i = -SPACING; i < CANVAS.width; i+=SPACING) {
  ctx.beginPath();
  ctx.moveTo(i, -SPACING);
  ctx.lineTo(i, CANVAS.height);
  ctx.stroke();
}
ctx.strokeStyle="#0000FF";
for(var j = -SPACING; j < CANVAS.height; j+=SPACING) {
  ctx.beginPath();
  ctx.moveTo(-SPACING, j);
  ctx.lineTo(CANVAS.width, j);
  ctx.stroke();
}
