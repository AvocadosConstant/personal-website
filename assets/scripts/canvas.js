function generateTriangles(vertices) {
  //console.log("Generating triangles");
  return Delaunay.triangulate(vertices);
}

function drawTriangles(triangles) {
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

function jiggleVertices(vertices, mag=2) {
  console.log("Commence jiggling");
  for(var i = 0; i < vertices.length; i++) {
    var x = vertices[i][0] + randRange(-mag, mag);
    var y = vertices[i][1] + randRange(-mag, mag);
    vertices[i] = [x, y];
  }
  drawTriangles(triangles);
}

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genTriColors(colors, min, max) {
  for(var i = 0; i < colors.length; i++) {
    colors[i] = randRange(min, max);
  }
}

var CANVAS = {
  id: "bgCanvas",
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0), 
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
  border: 10,
  color: "#FFF",
  vertices: 120
};

// initialize canvas
var canvas = document.getElementById(CANVAS.id);
var ctx = canvas.getContext("2d");
ctx.canvas.width  = CANVAS.width;
ctx.canvas.height = CANVAS.height;
ctx.fillStyle = CANVAS.color;
ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);

var vertices = new Array(CANVAS.vertices);
for(var i = 0; i < vertices.length; i++) {
  var x = 1.4 * Math.random() * canvas.width - 0.2 * canvas.width;
  var y = 1.4 * Math.random() * canvas.height - 0.2 * canvas.height;
  vertices[i] = [x, y];
}

var triColors = new Array(Delaunay.triangulate(vertices).length);
genTriColors(triColors, 240, 250);

triangles = generateTriangles(vertices);
drawTriangles(triangles);
var timer = setInterval(function(){jiggleVertices(vertices);}, 100);
