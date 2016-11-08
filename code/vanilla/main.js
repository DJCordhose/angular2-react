let g;
let svg;
let offsetX, offsetY;
let currentBox = null;

function drawBox(box) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute('width', 10);
    rect.setAttribute('height', 10);
    rect.setAttribute('x', box.x);
    rect.setAttribute('y', box.y);
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('fill', 'transparent');
    rect.setAttribute('stroke-width', 1);
    g.appendChild(rect);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createBoxes(numberOfBoxes) {
    for (let i = 0; i < numberOfBoxes; i++) {
        const id = i;
        const x = getRandomInt(0, 500);
        const y = getRandomInt(0, 500);
        const box = {
            x,
            y
        };
        drawBox(box);
    }
}

// to see what makes rendering slow in which browser
function hideAllButCurrent() {
    const rects = [...document.querySelectorAll('rect')];
        rects.forEach(rect => {
        if (rect !== currentBox) {
            rect.style.display = 'none';
        }
    });
}

// to see what makes rendering slow in which browser
function showAll() {
    const rects = [...document.querySelectorAll('rect')];
    rects.forEach(rect => {
        rect.style.display = 'inline';
    });
}

function onmousedown(event) {
    const box = event.target;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    offsetX = box.getAttribute('x') - mouseX;
    offsetY = box.getAttribute('y') - mouseY;
    currentBox = box;
    if (box === currentBox) {
        box.setAttribute('stroke', 'red');
        box.setAttribute('fill', 'opaque');
        box.setAttribute('stroke-width', 2);
        // hideAllButCurrent();
    }

}

function onmouseup(event) {
    if (currentBox != null) {
        currentBox.setAttribute('stroke', 'black');
        currentBox.setAttribute('fill', 'transparent');
        currentBox.setAttribute('stroke-width', 1);
        // showAll();
    }
    currentBox = null;
}

function onmousemove(event) {
    if (currentBox != null) {
        currentBox.setAttribute('x', event.clientX + offsetX);
        currentBox.setAttribute('y', event.clientY + offsetY);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    g = document.getElementById('g');
    createBoxes(5000);

    svg = document.getElementById('svg');
    svg.addEventListener('mousedown', onmousedown);
    svg.addEventListener('mouseup', onmouseup);
    svg.addEventListener('mousemove', onmousemove);
});
