// Joke Generator Game
const jokeGame = {
    jokes: [],
    currentJoke: null,
    score: 0,
    isLoading: false
};

function initJoke() {
    jokeGame.score = 0;
    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 700px; margin: 0 auto;">
            <h2 style="color: #667eea; text-align: center;">😂 Générateur de Blagues Aléatoires</h2>
            <div style="text-align: center; margin: 20px 0;">
                <p><strong>Blagues chargées:</strong> <span id="joke-score">0</span></p>
            </div>
            <div id="joke-display" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 15px;
                min-height: 200px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 20px 0;
                text-align: center;
                font-size: 1.2em;
                line-height: 1.6;
            ">
                <p id="joke-text">Cliquez sur "Nouvelle Blague" pour commencer!</p>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0;">
                <button class="btn-primary" onclick="fetchJoke()" style="background: #667eea;">😂 Nouvelle Blague</button>
                <button class="btn-primary" onclick="shareJoke()" style="background: #48bb78;">📤 Partager</button>
            </div>
            <button class="btn-primary" onclick="stopJoke()" style="background: #ff6b6b; width: 100%;">Terminer</button>
        </div>
    `;
}

function fetchJoke() {
    if (jokeGame.isLoading) return;
    
    jokeGame.isLoading = true;
    const jokeText = document.getElementById('joke-text');
    jokeText.innerHTML = '<p style="font-style: italic;">Chargement... ⏳</p>';

    // Utiliser JokeAPI
    fetch('https://v2.jokeapi.dev/joke/Any?type=single&lang=fr')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur API');
            }
            return response.json();
        })
        .then(data => {
            let jokeContent = '';
            
            if (data.joke) {
                jokeContent = data.joke;
            } else if (data.setup && data.punchline) {
                jokeContent = `${data.setup}<br><br><strong>👉 ${data.punchline}</strong>`;
            } else {
                throw new Error('Format de blague inconnu');
            }

            jokeGame.currentJoke = jokeContent.replace(/<br>/g, ' ');
            displayJoke(jokeContent);
            jokeGame.score++;
            document.getElementById('joke-score').textContent = jokeGame.score;
            jokeGame.isLoading = false;
        })
        .catch(error => {
            console.error('Erreur:', error);
            // Utiliser une blague de secours
            showBackupJoke();
            jokeGame.isLoading = false;
        });
}

function showBackupJoke() {
    const backupJokes = [
        "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant? Parce que sinon ils tombent dans le bateau!",
        "Qu'est-ce qu'un crocodile qui surveille la pharmacie? Un Lacoste-guard!",
        "Quel est le comble pour un électricien? De ne pas être au courant!",
        "Pourquoi les poissons n'aiment pas jouer au tennis? Parce qu'ils ont peur du filet!",
        "Qu'est-ce qu'un canif? Un petit fien!"
    ];
    
    const joke = backupJokes[Math.floor(Math.random() * backupJokes.length)];
    jokeGame.currentJoke = joke;
    displayJoke(joke);
    jokeGame.score++;
    document.getElementById('joke-score').textContent = jokeGame.score;
}

function displayJoke(joke) {
    const jokeDisplay = document.getElementById('joke-text');
    jokeDisplay.innerHTML = `
        <div style="font-size: 1.1em; line-height: 1.6;">
            ${joke}
        </div>
    `;
}

function shareJoke() {
    if (!jokeGame.currentJoke) {
        alert('Chargez d\'abord une blague!');
        return;
    }

    const textToCopy = jokeGame.currentJoke;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('✅ Blague copiée dans le presse-papiers!');
    }).catch(() => {
        alert('Impossible de copier. Essayez manuellement!');
    });
}

function stopJoke() {
    if (jokeGame.score > 0) {
        saveScore('joke', jokeGame.score * 10);
    }
    alert(`😂 C'était amusant !\n\nBlagues chargées: ${jokeGame.score}`);
    backToMenu();
}