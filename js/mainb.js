//setup
var docuwidth = window.innerWidth;
var docuheight = window.innerHeight;
var draw_interval = 60;
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = docuwidth;
canvas.height = docuheight;
var gradient = null;
var pixies = [];

//funciones varias

function setDimensions() {
    docuwidth = window.innerWidth;
    docuheight = window.innerHeight;
    canvas.width = docuwidth;
    canvas.height = docuheight;
};

function randItemArray(items) {
    var randSelected = items[Math.floor(Math.random()* (items.length+1))];
    return randSelected;
};

function randombetweenvalues(min, max) {
    var randValue = Math.floor(Math.random() * (max - min +1))+min;
    return randValue;
};

function randValueMultiplied (multiplier) {
    var randValue = Math.floor(Math.random() * (multiplier));
    return randValue;
};

//particle vars
var colorpalette = ['red', 'green', 'blue', 'yellow', 'aqua', 'crimson', 'aliceblue']; //array multidimensional para mas tarde
var radiusMin = 2;
var radiusMax = 30;
var lineWidthMin = 1;
var lineWidthMax = 1;
var max_particles = 100;
var timeToLive = 1000;

//Objeto de particula

var Circulo = {
        colores: colorpalette,        
        ttl: timeToLive,
        xmax:5, 
        ymax:2,
        rmin:radiusMin,
        rmax:radiusMax, 
        rt:1, 
        xdef:960, 
        ydef:540, 
        xdrift:4, 
        ydrift: 4, 
        random:true, 
        blink:true,   
}

/*
rt es ratio de velocidad por opacidad
xdef y ydef son posiciones definidas si no es random
*/

test = randombetweenvalues(radiusMin, radiusMax);
console.log(test)

function drawparticles() {
   
    this.reset = function() {
        this.x = (Circulo.random ? docuwidth*Math.random() : Circulo.xdef);
        this.y = (Circulo.random ? docuheight*Math.random() : Circulo.ydef);
        this.r = randombetweenvalues(Circulo.rmin, Circulo.rmax);
        this.dx = (Math.random()*Circulo.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random()*Circulo.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (Circulo.ttl/draw_interval)*(this.r/Circulo.rmax);
        this.rt = Math.random()*this.hl;
        Circulo.rt = Math.random()+1;
        this.stop = Math.random()*.2+.4;
        Circulo.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        Circulo.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    };
    
    this.fade = function() {
        this.rt += Circulo.rt;
    }

    this.draw = function() {
        if(Circulo.blink && (this.rt <= 0 || this.rt >= this.hl)) {
            Circulo.rt = Circulo.rt*-1;
        } else if(this.rt >= this.hl) {
            this.reset();
        }

        var newo = 1-(this.rt/this.hl);
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        context.closePath();

        var cr = this.r*newo;
        gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        gradient.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
        gradient.addColorStop(this.stop, 'rgba(77,101,181,'+(newo*.6)+')');
        gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
        context.fillStyle = gradient;
        context.fill();
    }

    this.move = function() {
        this.x += (this.rt/this.hl)*this.dx;
        this.y += (this.rt/this.hl)*this.dy;
        if(this.x > docuwidth || this.x < 0) this.dx *= -1;
        if(this.y > docuheight || this.y < 0) this.dy *= -1;
    }

    this.getX = function() { return this.x; }
    this.getY = function() { return this.y; }
};

for (var i = 0; i < max_particles; i++) {
    pixies.push(new drawparticles());
    pixies[i].reset();
}

function draw() {
    context.clearRect(0, 0, docuwidth, docuheight);
    for(var i = 0; i < pixies.length; i++) {
        pixies[i].fade();
        pixies[i].move();
        pixies[i].draw();
    }
}

setInterval(draw, draw_interval);


//logic

//hace que al cambiar el tamano todo se resetee
setDimensions();
window.addEventListener('resize', setDimensions());

/*
for (var i = 0; i < 100; i++) {
    var winx = Math.random() * window.innerWidth;
    var winy = Math.random() * window.innerHeight;
    rad = randombetweenvalues(radiusMin, radiusMax);
    context.beginPath();
    context.lineWidth = randombetweenvalues(lineWidthMin, lineWidthMax);
    context.arc(winx, winy, rad, 0, 6.4, false);
    context.strokeStyle = randItemArray(colorpalette);
    context.stroke();
};
*/