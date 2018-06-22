//functions rands
//randombetweenvalues se salta el 0

function randombetweenvalues(min, max) {
    var randValue = Math.floor(Math.random() * (max - min +1))+min;
    return randValue;
};

function randombetweenvaluesspeed(min, max) {
    var randValue = Math.floor(Math.random() * (max - min +1))+min;
    if (randValue == 0){
        randValue = 1;
    }
    return randValue;
};

function randItemArray(items) {
    var randSelected = items[Math.floor(Math.random()* (items.length))];
    return randSelected;
};
/*
//funcion animframe setback
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
       window.webkitRequestAnimationFrame ||
       window.mozRequestAnimationFrame ||
       window.oRequestAnimationFrame ||
       window.msRequestAnimationFrame      
 })();
*/
//Canvas setup
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');
window.addEventListener('mousemove', mousetracker);
function mousetracker (event) {    
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
};

//resize canvas when windows resize
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
    init(particleType);   
});
//Obejtos de setup
var mouse = {
    x: undefined,
    y: undefined,
};

//funciones

function init(tipo){
    particleArray = createParticles(tipo);
}


//vars
//general variables
//dx y dy significan deltax y deltay es velocidad basicamente
var particleType = 'circle';
var colorpalette = ['orange',  'gray', 'crimson'];
var max_particles = 500;
var timeToLive = 8000;
var dxmin = -2;
var dxmax = 2;
var dymin = -2;
var dymax = 2;
var particleArray = [];
//circle variables
var radiusMin = 2;
var radiusMax = 6;
var maxRadiusMultiplier = 15;
var lineWidthMin = 1;
var lineWidthMax = 2;

//square variables
var sizeMin = 10;
var sizeMax = 20;

//Tipos de particulas con metodos y propiedades

function Circle(xposition, yposition, radius, strokewidth, xvelocity, yvelocity, color, fillbool, fillcolor) {
    this.x = xposition;
    this.y = yposition;
    this.r = radius;
    this.rm = radius;
    this.c = color;
    this.dx = xvelocity;
    this.dy = yvelocity;
    this.dym = yvelocity;
    this.dxm = xvelocity;
    this.s = strokewidth;
    this.f = fillbool;
    this.cf = fillcolor;
    var maxradius = this.r*maxRadiusMultiplier;

    this.checkpos = function(){
        if (this.x + this.r > innerWidth) {
            this.x -= this.r;
        };
        if (this.x-this.r < 0) {
            this.x += this.r;
        };
        if (this.y + this.r > innerHeight) {
            this.y -= this.r;
        };
        if (this.y-this.r < 0) {
            this.y += this.r;
        };
    };

    this.draw = function(){
        context.beginPath();
        context.lineWidth = this.s;
        context.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        context.strokeStyle = color;
        if (fillbool == true) {
            context.fillStyle = color;
            context.fill();
        }
        context.stroke();
    };

    this.move = function(){
        if (this.x + this.r > innerWidth || this.x - this.r < 0 ) {
            this.dx = -this.dx;
        };
        if (this.y + this.r >innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
        };
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50
            && mouse.y - this.y > -50 ) {
                if (this.r < maxradius) {
                this.r += 1;              
            }
        }
        else if (this.r > this.rm) {
            this.r -= 1;
        }        
        
    }
};

function Square(xPosition, yPosition, squareSize, xVelocity, yVelocity, color) {
    this.x = xPosition;    
    this.y = yPosition;
    this.dx = xVelocity;
    this.dy = yVelocity;
    this.s = squareSize;
    this.w = squareSize;
    this.h = squareSize;
    this.c = color;

    this.checkpos = function(){
        if (this.x + this.s > innerWidth) {
            this.x -= this.s;
        };
       
        if (this.x - this.s < -this.s) {
            this.x += this.s;
        };
        if (this.y + this.s > innerHeight) {
            this.y -= this.s;
        };
        if (this.y - this.s < -this.s) {
            this.y  += this.s;
        };
    };
 
    this.draw = function(){
       
        context.fillRect(this.x, this.y, this.w, this.h);
        context.fillStyle = this.c;
    };

    this.move = function(){
        if (this.x + this.s > innerWidth || this.x - this.s < -(squareSize) ) {
            this.dx = -this.dx;
        };
        
        if (this.y + this.s >innerHeight || this.y - this.s < -(squareSize)) {
            this.dy = -this.dy;
        };
        this.x += this.dx;
        
        this.y += this.dy;
        this.draw();
    };
};

//esta funcion crea las particulas, las pone en un array e inicializa las variables que necesitan ser random
function createParticles(particleType){    
    for (var i=0; i < max_particles; i++) {
        var strokeWidth = randombetweenvalues(lineWidthMin, lineWidthMax);
        var posx=Math.random() * window.innerWidth;  
        var posy=Math.random() * window.innerHeight;
        var dx= randombetweenvaluesspeed(dxmin, dxmax);
        var dy = randombetweenvaluesspeed(dymin, dymax);
        var radius = randombetweenvaluesspeed(radiusMin, radiusMax);
        var colorSelect = randItemArray(colorpalette);
        var squareSize = randombetweenvaluesspeed(sizeMin, sizeMax);
        //dependiendo del tipo de particula que se pase se crean las partiuclas
        
        if (particleType == 'square'){   
            particleArray[i] = new Square(posx, posy, squareSize, dx, dy, colorSelect);
            particleArray[i].checkpos();            
        }
        else if (particleType == 'circle')  { 
            particleArray[i] = new Circle(posx, posy, radius, strokeWidth, dx, dy, colorSelect, true, colorSelect);
            particleArray[i].checkpos();
        }
        else {
            if (i%2 == 0){   
                particleArray[i] = new Square(posx, posy, squareSize, dx, dy, colorSelect);
                particleArray[i].checkpos();            
            }
            else { 
                particleArray[i] = new Circle(posx, posy, radius, strokeWidth, dx, dy, colorSelect, true, colorSelect);
                particleArray[i].checkpos();
            }
        
        }
    };
    return particleArray;
}


//-------------Start-----------------------

//funcion de inicio pasa el array creado en createParticles al array global

init(particleType);

//esta funcion anima las particulas
function animate() {
    context.clearRect(0,0, innerWidth, innerHeight); //clear canvas
    for (var i=0; i < particleArray.length; i++) {        
        particleArray[i].move();
    };
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);


