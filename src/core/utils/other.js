export function makeDraggable(dragElement, handle) {
    var offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

    handle.addEventListener('mousedown', dragMouseDown);

    function dragMouseDown(e) {
        console.log('mousedown')
        e.preventDefault();
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
    }

    function elementDrag(e) {
        e.preventDefault();
        offsetX = mouseX - e.clientX;
        offsetY = mouseY - e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        dragElement.style.transition = 'none'
        dragElement.style.top = (dragElement.offsetTop - offsetY) + "px";
        dragElement.style.left = (dragElement.offsetLeft - offsetX) + "px";
    }

    function closeDragElement() {
        dragElement.style.transition = 'all 1s ease'
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
    }
}
