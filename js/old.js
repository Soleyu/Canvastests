
context.fillStyle = '#fa50a1';
context.fillRect(200, 25, 200, 200);
context.fillStyle = 'red';
context.fillRect(200, 550, 200, 200);

//line
context.beginPath();
context.moveTo(50,300);
context.lineTo(300,250);
context.lineTo(350,500);
context.closePath();
context.strokeStyle='#fa50a1';
context.lineWidth = 10;
context.stroke();

//arc
c.lineWidth = 3;
c.beginPath();
c.arc(250, 300, 30, 0, 6.4, false);
c.strokeStyle = 'blue';
c.stroke();*/

function randombetweenvalues(min, max) {
    var randValue = Math.floor(Math.random() * (max - min +1))+min;
    return randValue;
}
function randValueMultiplied (multiplier) {
    var randValue = Math.floor(Math.random() * (multiplier));
    return randValue;
}
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
