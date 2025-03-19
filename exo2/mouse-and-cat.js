
    const cat = document.getElementById('cat');
    let lastMouseX = 0;
    let lastMouseY = 0;


    randomPosition();

    function randomPosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;


        const padding = 100;
        const randomX = Math.random() * (viewportWidth - 2 * padding) + padding - cat.offsetWidth/2;
        const randomY = Math.random() * (viewportHeight - 2 * padding) + padding - cat.offsetHeight/2;

        cat.style.left = randomX + 'px';
        cat.style.top = randomY + 'px';
    }


    function teleportAway(mouseX, mouseY) {
        const catRect = cat.getBoundingClientRect();
        const catCenterX = catRect.left + catRect.width / 2;
        const catCenterY = catRect.top + catRect.height / 2;


        const dx = mouseX - catCenterX;
        const dy = mouseY - catCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);


        if (distance < 200) {

            const mouseSpeedX = mouseX - lastMouseX;
            const mouseSpeedY = mouseY - lastMouseY;


            const predictedMouseX = mouseX + mouseSpeedX * 10;
            const predictedMouseY = mouseY + mouseSpeedY * 10;


            const predictedDx = predictedMouseX - catCenterX;
            const predictedDy = predictedMouseY - catCenterY;
            const predictedDistance = Math.sqrt(predictedDx * predictedDx + predictedDy * predictedDy);


            if (predictedDistance < distance || distance < 100) {
                randomPosition();
            }
        }


        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }


    document.addEventListener('mousemove', function(event) {
        teleportAway(event.clientX, event.clientY);
    });


