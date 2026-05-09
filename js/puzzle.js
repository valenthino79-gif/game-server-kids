// Memory Puzzle Game
const puzzleGame = {
    cards: [],
    flipped: [],
    matched: 0,
    moves: 0,
    startTime: null
};

const puzzleImages = [
    '🍎', '🍊', '🍋', '🍌',
    '🍉', '🍓', '🍑', '🥝'
];

function initPuzzle() {
    puzzleGame.cards = [...puzzleImages, ...puzzleImages].sort(() => Math.random() - 0.5);
    puzzleGame.flipped = [];
    puzzleGame.matched = 0;
    puzzleGame.moves = 0;
    puzzleGame.startTime = Date.now();

    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #667eea; text-align: center;">🧩 Memory Puzzle</h2>
            <div style="text-align: center; margin: 20px 0;">
                <p><strong>Mouvements:</strong> <span id="puzzle-moves">0</span></p>
                <p><strong>Paires trouvées:</strong> <span id="puzzle-matched">0</span>/8</p>
            </div>
            <div id="puzzle-grid" style="
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                margin: 20px 0;
            "></div>
            <div style="text-align: center;">
                <button class="btn-primary" onclick="resetPuzzle()" style="background: #ff6b6b;">Recommencer</button>
            </div>
        </div>
    `;

    renderPuzzleCards();
}

function renderPuzzleCards() {
    const grid = document.getElementById('puzzle-grid');
    grid.innerHTML = '';

    puzzleGame.cards.forEach((card, index) => {
        const cardElement = document.createElement('button');
        cardElement.className = 'puzzle-card';
        cardElement.style.cssText = `
            padding: 20px;
            font-size: 2em;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const isFlipped = puzzleGame.flipped.some(f => f.index === index && f.flipped);
        const isMatched = puzzleGame.flipped.some(f => f.index === index && f.matched);

        if (isMatched) {
            cardElement.style.background = '#90EE90';
            cardElement.style.cursor = 'default';
            cardElement.textContent = card;
            cardElement.disabled = true;
        } else if (isFlipped) {
            cardElement.textContent = card;
            cardElement.style.background = '#FFD700';
        } else {
            cardElement.textContent = '❓';
        }

        cardElement.onclick = () => flipCard(index);
        grid.appendChild(cardElement);
    });
}

function flipCard(index) {
    if (puzzleGame.flipped.length >= 2) return;
    if (puzzleGame.flipped.some(f => f.index === index)) return;

    puzzleGame.flipped.push({ index, flipped: true, matched: false });
    renderPuzzleCards();

    if (puzzleGame.flipped.length === 2) {
        puzzleGame.moves++;
        document.getElementById('puzzle-moves').textContent = puzzleGame.moves;
        checkMatch();
    }
}

function checkMatch() {
    const [first, second] = puzzleGame.flipped;
    const match = puzzleGame.cards[first.index] === puzzleGame.cards[second.index];

    setTimeout(() => {
        if (match) {
            puzzleGame.flipped[0].matched = true;
            puzzleGame.flipped[1].matched = true;
            puzzleGame.matched += 2;
            document.getElementById('puzzle-matched').textContent = puzzleGame.matched / 2;

            if (puzzleGame.matched === puzzleGame.cards.length) {
                endPuzzle();
            }
        }

        puzzleGame.flipped = puzzleGame.flipped.filter(f => f.matched);
        renderPuzzleCards();
    }, 500);
}

function endPuzzle() {
    const time = Math.floor((Date.now() - puzzleGame.startTime) / 1000);
    const score = Math.max(100 - puzzleGame.moves * 5, 20);

    saveScore('puzzle', score);

    setTimeout(() => {
        alert(`🎉 Bravo ! Vous avez gagné !\n\nScore: ${score}\nMouvements: ${puzzleGame.moves}\nTemps: ${time}s`);
        backToMenu();
    }, 500);
}

function resetPuzzle() {
    initPuzzle();
}