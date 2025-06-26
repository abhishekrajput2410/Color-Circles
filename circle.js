const circles = [];
const redoStack = [];

document.body.addEventListener('click', function(e) {
    if (e.target.closest('.toolbar')) return;

    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.left = (e.clientX - 10) + 'px';
    circle.style.top = (e.clientY - 10) + 'px';
    circle.style.backgroundColor = getRandomColor();

    document.body.appendChild(circle);
    circles.push(circle);
    redoStack.length = 0;
    updateRedoButton();
});

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function reset() {
    circles.forEach(c => c.remove());
    circles.length = 0;
    redoStack.length = 0;
    updateRedoButton();
}

function undo() {
    if (circles.length === 0) return;
    const lastCircle = circles.pop();
    redoStack.push(lastCircle);
    lastCircle.remove();
    updateRedoButton();
}

function redo() {
    if (redoStack.length === 0) return;
    const circle = redoStack.pop();
    document.body.appendChild(circle);
    circles.push(circle);
    updateRedoButton();
}

function updateRedoButton() {
    document.getElementById('redoBtn').disabled = redoStack.length === 0;
}
