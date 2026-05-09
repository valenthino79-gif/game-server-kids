// État global
const gameState = {
    currentGame: null,
    scores: JSON.parse(localStorage.getItem('gameScores')) || {}
};

// Aller à la section des jeux
function goToGames() {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('games').classList.add('active');
    updateNavButtons('games');
}

// Navigation entre sections
function showSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Afficher la section demandée
    document.getElementById(sectionId).classList.add('active');

    // Mettre à jour les boutons de navigation
    updateNavButtons(sectionId);

    // Charger les scores si demandé
    if (sectionId === 'scores') {
        displayScores();
    }
}

// Mettre à jour les boutons de navigation
function updateNavButtons(sectionId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ajouter la classe active au bouton correspondant
    const buttons = document.querySelectorAll('.nav-btn');
    if (sectionId === 'home') buttons[0].classList.add('active');
    if (sectionId === 'games') buttons[1].classList.add('active');
    if (sectionId === 'scores') buttons[2].classList.add('active');
}

// Démarrer un jeu
function startGame(gameName) {
    gameState.currentGame = gameName;
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('games').classList.remove('active');
    document.getElementById('home').classList.remove('active');
    document.getElementById('scores').classList.remove('active');

    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = '';

    switch (gameName) {
        case 'puzzle':
            initPuzzle();
            break;
        case 'platformer':
            initPlatformer();
            break;
        case 'quiz':
            initQuiz();
            break;
        case 'joke':
            initJoke();
            break;
        default:
            console.error('Jeu inconnu:', gameName);
    }
}

// Retour au menu
function backToMenu() {
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('games').classList.add('active');
    updateNavButtons('games');
}

// Sauvegarder un score
function saveScore(gameName, score) {
    if (!gameState.scores[gameName]) {
        gameState.scores[gameName] = [];
    }
    gameState.scores[gameName].push({
        score: score,
        date: new Date().toLocaleDateString('fr-FR')
    });
    localStorage.setItem('gameScores', JSON.stringify(gameState.scores));
}

// Afficher les scores
function displayScores() {
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '';

    if (Object.keys(gameState.scores).length === 0) {
        scoresList.innerHTML = '<p style="text-align: center; color: white; padding: 20px;">Aucun score pour le moment. Commencez à jouer !</p>';
        return;
    }

    for (const [gameName, scores] of Object.entries(gameState.scores)) {
        const gameScores = scores.sort((a, b) => b.score - a.score).slice(0, 5);
        const html = `
            <h3 style="color: white; margin-top: 20px;">${getGameTitle(gameName)}</h3>
            <div class="scores-list">
                ${gameScores.map((s, idx) => `
                    <div class="score-item">
                        <span class="score-rank">🏆 #${idx + 1}</span>
                        <span class="score-name">Score:</span>
                        <span class="score-value">${s.score}</span>
                    </div>
                `).join('')}
            </div>
        `;
        scoresList.innerHTML += html;
    }
}

function getGameTitle(gameName) {
    const titles = {
        'puzzle': '🧩 Memory Puzzle',
        'platformer': '🚶 Platformer Jump',
        'quiz': '🧠 Quiz Smart',
        'joke': '😂 Random Blagues'
    };
    return titles[gameName] || gameName;
}

// Initialiser au chargement
window.addEventListener('DOMContentLoaded', () => {
    console.log('Game Server Kids chargé !');
});