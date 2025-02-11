document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');

    // Create arrow element
    const arrow = document.createElement('div');
    arrow.classList.add('arrow');
    cursor.appendChild(arrow);

    document.body.appendChild(cursor);

    let timeout = null;

    document.addEventListener('mousemove', function(e) {
        clearTimeout(timeout);
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        // Detect direction
        const deltaX = e.movementX;
        const deltaY = e.movementY;
        let angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

        // Adjust angle to snap to the nearest 90 degrees for 4 primary directions
        angle = Math.round(angle / 90) * 90;

        // Adjust arrow rotation
        arrow.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        arrow.style.display = 'block'; // Show the arrow

        // Hide arrow after movement stops
        timeout = setTimeout(() => {
            arrow.style.display = 'none';
        }, 100); // Hide arrow if the cursor stops moving
    });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseover', () => {
            document.body.style.backgroundColor = '#333'; // Darken the background
        });

        item.addEventListener('mouseout', () => {
            document.body.style.backgroundColor = ''; // Revert the background
        });
    });
});
