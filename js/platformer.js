// Platformer Game
const platformerGame = {
    playerX: 50,
    playerY: 350,
    playerWidth: 30,
    playerHeight: 30,
    velocityY: 0,
    velocityX: 0,
    gravity: 0.6,
    isJumping: false,
    obstacles: [],
    score: 0,
    gameRunning: false,
    gameCanvas: null,
    gameContext: null,
    gameLoop: null
};

function initPlatformer() {
    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = `
        <div style="text-align: center; background: white; padding: 20px; border-radius: 15px;">
            <h2 style="color: #667eea;">🚶 Platformer Jump</h2>
            <p style="margin: 10px 0;"><strong>Score:</strong> <span id="platformer-score">0</span></p>
            <p style="color: #666; font-size: 0.9em;">Utilisez les flèches ← → pour vous déplacer et ESPACE pour sauter</p>
            <canvas id="platformer-canvas" width="600" height="400" style="border: 2px solid #667eea; background: linear-gradient(180deg, #87CEEB 0%, #90EE90 100%); display: block; margin: 20px auto; border-radius: 10px;"></canvas>
            <button class="btn-primary" onclick="stopPlatformer()" style="background: #ff6b6b;">Arrêter</button>
        </div>
    `;

    platformerGame.gameCanvas = document.getElementById('platformer-canvas');
    platformerGame.gameContext = platformerGame.gameCanvas.getContext('2d');
    platformerGame.gameRunning = true;
    platformerGame.score = 0;
    platformerGame.obstacles = [];
    platformerGame.playerX = 50;
    platformerGame.playerY = 350;
    platformerGame.velocityY = 0;
    platformerGame.velocityX = 0;

    setupPlatformerControls();
    startPlatformerLoop();
}

function setupPlatformerControls() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') platformerGame.velocityX = -5;
        if (e.key === 'ArrowRight') platformerGame.velocityX = 5;
        if (e.key === ' ' && !platformerGame.isJumping) {
            platformerGame.velocityY = -12;
            platformerGame.isJumping = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') platformerGame.velocityX = 0;
    });
}

function startPlatformerLoop() {
    platformerGame.gameLoop = setInterval(() => {
        if (!platformerGame.gameRunning) return;

        updatePlatformer();
        drawPlatformer();
    }, 20);
}

function updatePlatformer() {
    // Appliquer la gravité
    platformerGame.velocityY += platformerGame.gravity;

    // Mettre à jour la position
    platformerGame.playerX += platformerGame.velocityX;
    platformerGame.playerY += platformerGame.velocityY;

    // Limites horizontales
    if (platformerGame.playerX < 0) platformerGame.playerX = 0;
    if (platformerGame.playerX + platformerGame.playerWidth > platformerGame.gameCanvas.width) {
        platformerGame.playerX = platformerGame.gameCanvas.width - platformerGame.playerWidth;
    }

    // Collision avec le sol
    if (platformerGame.playerY + platformerGame.playerHeight >= platformerGame.gameCanvas.height - 20) {
        platformerGame.playerY = platformerGame.gameCanvas.height - platformerGame.playerHeight - 20;
        platformerGame.velocityY = 0;
        platformerGame.isJumping = false;
    }

    // Générer des obstacles
    if (Math.random() < 0.02) {
        platformerGame.obstacles.push({
            x: platformerGame.gameCanvas.width,
            y: Math.random() * 200 + 150,
            width: 30,
            height: 30
        });
    }

    // Mettre à jour les obstacles
    platformerGame.obstacles.forEach((obs, index) => {
        obs.x -= 4;

        // Collision avec le joueur
        if (checkCollision(platformerGame.playerX, platformerGame.playerY, platformerGame.playerWidth, platformerGame.playerHeight, obs.x, obs.y, obs.width, obs.height)) {
            endPlatformer();
        }

        // Supprimer les obstacles sortis de l'écran
        if (obs.x + obs.width < 0) {
            platformerGame.obstacles.splice(index, 1);
            platformerGame.score += 10;
            document.getElementById('platformer-score').textContent = platformerGame.score;
        }
    });
}

function drawPlatformer() {
    const ctx = platformerGame.gameContext;

    // Effacer le canvas
    ctx.fillStyle = 'rgba(135, 206, 235, 0.5)';
    ctx.fillRect(0, 0, platformerGame.gameCanvas.width, platformerGame.gameCanvas.height);

    // Dessiner le sol
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, platformerGame.gameCanvas.height - 20, platformerGame.gameCanvas.width, 20);

    // Dessiner le joueur
    ctx.fillStyle = '#667eea';
    ctx.fillRect(platformerGame.playerX, platformerGame.playerY, platformerGame.playerWidth, platformerGame.playerHeight);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🚶', platformerGame.playerX + 15, platformerGame.playerY + 22);

    // Dessiner les obstacles
    platformerGame.obstacles.forEach(obs => {
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🔥', obs.x + 15, obs.y + 22);
    });
}

function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

function endPlatformer() {
    platformerGame.gameRunning = false;
    clearInterval(platformerGame.gameLoop);

    saveScore('platformer', platformerGame.score);

    alert(`💥 Game Over !\n\nScore final: ${platformerGame.score}`);
    backToMenu();
}

function stopPlatformer() {
    platformerGame.gameRunning = false;
    clearInterval(platformerGame.gameLoop);
    document.removeEventListener('keydown', null);
    backToMenu();
}