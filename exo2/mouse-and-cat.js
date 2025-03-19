
    const cat = document.getElementById('cat');
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Positionnez initialement le chat aléatoirement
    randomPosition();

    function randomPosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Éviter les positions trop proches du bord
        const padding = 100;
        const randomX = Math.random() * (viewportWidth - 2 * padding) + padding - cat.offsetWidth/2;
        const randomY = Math.random() * (viewportHeight - 2 * padding) + padding - cat.offsetHeight/2;

        cat.style.left = randomX + 'px';
        cat.style.top = randomY + 'px';
    }

    // Téléporter le chat loin de la souris dès qu'elle s'approche
    function teleportAway(mouseX, mouseY) {
        const catRect = cat.getBoundingClientRect();
        const catCenterX = catRect.left + catRect.width / 2;
        const catCenterY = catRect.top + catRect.height / 2;

        // Calculer la distance entre la souris et le chat
        const dx = mouseX - catCenterX;
        const dy = mouseY - catCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Si la souris est trop proche ou se dirige vers le chat, téléporter
        if (distance < 200) {
            // Calculer la direction de la souris
            const mouseSpeedX = mouseX - lastMouseX;
            const mouseSpeedY = mouseY - lastMouseY;

            // Prédire où la souris va aller
            const predictedMouseX = mouseX + mouseSpeedX * 10;
            const predictedMouseY = mouseY + mouseSpeedY * 10;

            // Calculer la distance prédite
            const predictedDx = predictedMouseX - catCenterX;
            const predictedDy = predictedMouseY - catCenterY;
            const predictedDistance = Math.sqrt(predictedDx * predictedDx + predictedDy * predictedDy);

            // Si la souris se rapproche du chat, téléporter
            if (predictedDistance < distance || distance < 100) {
                randomPosition();
            }
        }

        // Mémoriser la dernière position de la souris
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }

    // Détecter les mouvements de la souris
    document.addEventListener('mousemove', function(event) {
        teleportAway(event.clientX, event.clientY);
    });


