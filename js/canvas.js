function generateTriangles() {
  console.log("Generating triangles");
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
    var x = vertices[i][0] + randRange(-5, 5);
    var y = vertices[i][1] + randRange(-5, 5);
    //vertices[i] = [x, y];
  }
  generateTriangles();
}

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var CANVAS = {
  id: "bgCanvas",
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0), 
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
  border: 10,
  color: "#FFF"
};

var canvas = document.getElementById(CANVAS.id);
var ctx = canvas.getContext("2d");

// initialize canvas
ctx.canvas.width  = CANVAS.width;
ctx.canvas.height = CANVAS.height;
ctx.fillStyle = CANVAS.color;
ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);
ctx.lineWidth=1;
ctx.strokeStyle="#dfdfdf";

var vertices = new Array(120);
for(var i = 0; i < vertices.length; i++) {
  var x = 1.4 * Math.random() * canvas.width - 0.2 * canvas.width;
  var y = 1.4 * Math.random() * canvas.height - 0.2 * canvas.height;
  vertices[i] = [x, y];
}

var triColors = new Array(Delaunay.triangulate(vertices).length);
for(var i = 0; i < triColors.length; i++) {
  triColors[i] = randRange(240, 250);
}

var timer = setInterval(jiggleVertices, 100);
