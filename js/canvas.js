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

//  draw canvas
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

console.time("triangulate");
var triangles = Delaunay.triangulate(vertices);
console.timeEnd("triangulate");

console.log("triangles.length = " + triangles.length);
for(var i = triangles.length; i; ) {
  ctx.beginPath();
  --i; ctx.moveTo(vertices[triangles[i]][0], vertices[triangles[i]][1]);
  --i; ctx.lineTo(vertices[triangles[i]][0], vertices[triangles[i]][1]);
  --i; ctx.lineTo(vertices[triangles[i]][0], vertices[triangles[i]][1]);
  ctx.closePath();
  //ctx.stroke();
  var colVal = randRange(230, 250);
  ctx.fillStyle = 
    "rgba(" + 
    colVal + "," +  
    colVal + "," +  
    colVal + ", 1)";
  ctx.fill();
}
