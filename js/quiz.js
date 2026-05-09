// Quiz Game
const quizGame = {
    currentQuestion: 0,
    score: 0,
    questions: [
        {
            question: "Combien font 2 + 3 ?",
            options: ["4", "5", "6", "7"],
            correct: 1
        },
        {
            question: "Quel est le plus grand : 15 ou 18 ?",
            options: ["15", "18", "Égal", "Impossible"],
            correct: 1
        },
        {
            question: "Combien font 5 × 2 ?",
            options: ["7", "10", "15", "20"],
            correct: 1
        },
        {
            question: "Quel animal dit 'Miaou' ?",
            options: ["Chien", "Chat", "Vache", "Canard"],
            correct: 1
        },
        {
            question: "Combien de jours a une semaine ?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "Quel est le plus petit : 8 ou 3 ?",
            options: ["8", "3", "Égal", "Impossible"],
            correct: 1
        },
        {
            question: "Combien font 10 ÷ 2 ?",
            options: ["4", "5", "6", "7"],
            correct: 1
        },
        {
            question: "Quel fruit est rouge ?",
            options: ["Banane", "Raisin", "Fraise", "Citron"],
            correct: 2
        },
        {
            question: "Combien de doigts avez-vous sur une main ?",
            options: ["3", "4", "5", "6"],
            correct: 2
        },
        {
            question: "Combien font 9 - 4 ?",
            options: ["4", "5", "6", "7"],
            correct: 1
        }
    ]
};

function initQuiz() {
    quizGame.currentQuestion = 0;
    quizGame.score = 0;
    displayQuizQuestion();
}

function displayQuizQuestion() {
    const gameContent = document.getElementById('game-content');
    const question = quizGame.questions[quizGame.currentQuestion];
    const progress = quizGame.currentQuestion + 1;
    const total = quizGame.questions.length;

    let html = `
        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #667eea; text-align: center;">🧠 Quiz Smart</h2>
            <div style="text-align: center; margin: 20px 0;">
                <p><strong>Question ${progress}/${total}</strong></p>
                <p><strong>Score:</strong> <span id="quiz-score">${quizGame.score}</span></p>
                <div style="background: #eee; height: 20px; border-radius: 10px; overflow: hidden; margin: 10px 0;">
                    <div style="background: #667eea; height: 100%; width: ${(progress / total) * 100}%;"></div>
                </div>
            </div>
            <div style="margin: 30px 0;">
                <h3 style="font-size: 1.3em; margin: 20px 0; color: #333;">${question.question}</h3>
                <div style="display: grid; gap: 10px;">
    `;

    question.options.forEach((option, index) => {
        html += `
            <button class="quiz-option" onclick="answerQuestion(${index})" style="
                padding: 15px;
                background: #f0f0f0;
                border: 2px solid #ddd;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1em;
                transition: all 0.3s;
                text-align: left;
            ">
                ${String.fromCharCode(65 + index)}. ${option}
            </button>
        `;
    });

    html += `
                </div>
            </div>
        </div>
    `;

    gameContent.innerHTML = html;
}

function answerQuestion(selectedIndex) {
    const question = quizGame.questions[quizGame.currentQuestion];
    const isCorrect = selectedIndex === question.correct;

    if (isCorrect) {
        quizGame.score += 10;
        alert('✅ Bonne réponse !');
    } else {
        alert(`❌ Mauvaise réponse. La bonne réponse est: ${question.options[question.correct]}`);
    }

    quizGame.currentQuestion++;

    if (quizGame.currentQuestion < quizGame.questions.length) {
        displayQuizQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    saveScore('quiz', quizGame.score);

    alert(`🎉 Bravo ! Quiz terminé !\n\nScore final: ${quizGame.score}/${quizGame.questions.length * 10}`);
    backToMenu();
}