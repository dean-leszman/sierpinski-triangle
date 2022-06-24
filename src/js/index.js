let canvas;
let context;

const width = 800;
const height = 800;
const spacer = 25;

let currPoint;

const trianglePoints = [[ spacer, height - spacer], [width / 2, spacer], [width - spacer, height - spacer]];

function getRandomPoint() {
    const random = Math.floor(Math.random() * trianglePoints.length);
    return trianglePoints[random];
}

function getMidpoint(posA, posB) {
    const x = Math.floor((posA[0] + posB[0]) / 2);
    const y = Math.floor((posA[1] + posB[1]) / 2);
    return [x, y]
}

function drawCircle({ x, y, radius, startAngle = 0, endAngle = Math.PI * 2, counterClockwise = false }) {
    context.moveTo(x, y);
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.stroke();
}

function drawBase() {
    const points = trianglePoints;

    context.beginPath();
    context.moveTo(...points[0]);

    for (let i = 1; i < points.length; i++) {
        context.lineTo(...points[i]);
    }

    context.lineTo(...points[0]);
    context.stroke();
}

function drawNextPoint() {
    const target = getRandomPoint();
    const midpoint = getMidpoint(currPoint, target);

    drawCircle({
        x: midpoint[0],
        y: midpoint[1],
        radius: 1
    });

    currPoint = midpoint;
}

function render() {
    drawBase();

    currPoint = [spacer, height - spacer];
    setInterval(drawNextPoint, 1);
}

function init() {
    canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = width;
    context = canvas.getContext("2d");

    render();
};

init();