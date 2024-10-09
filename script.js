const words = [
    { word: 'decimo', hint: 'Subcampeón de los interclases' },
    { word: 'once', hint: 'Campeón de los interclases' }
];

let selectedWordObj = words[Math.floor(Math.random() * words.length)];
let selectedWord = selectedWordObj.word;
let attempts = 6;
let guessedLetters = [];
let correctGuesses = Array(selectedWord.length).fill('_');

document.getElementById('attempts').innerText = attempts;
document.getElementById('hint').innerText = `Pista: ${selectedWordObj.hint}`;

function updateWordContainer() {
    document.getElementById('wordContainer').innerText = correctGuesses.join(' ');
}

updateWordContainer();

// Dibujo del ahorcado
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

function drawHangman(attemptsLeft) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Base del ahorcado
    if (attemptsLeft <= 5) {
        ctx.beginPath();
        ctx.moveTo(10, 230);
        ctx.lineTo(190, 230);
        ctx.stroke();
    }

    // Poste vertical
    if (attemptsLeft <= 4) {
        ctx.beginPath();
        ctx.moveTo(50, 230);
        ctx.lineTo(50, 30);
        ctx.stroke();
    }

    // Brazo superior
    if (attemptsLeft <= 3) {
        ctx.beginPath();
        ctx.moveTo(50, 30);
        ctx.lineTo(150, 30);
        ctx.stroke();
    }

    // Cuerda
    if (attemptsLeft <= 2) {
        ctx.beginPath();
        ctx.moveTo(150, 30);
        ctx.lineTo(150, 70);
        ctx.stroke();
    }

    // Cabeza
    if (attemptsLeft <= 1) {
        ctx.beginPath();
        ctx.arc(150, 90, 20, 0, Math.PI * 2, true);
        ctx.stroke();
    }

    // Cuerpo
    if (attemptsLeft === 0) {
        ctx.beginPath();
        ctx.moveTo(150, 110);
        ctx.lineTo(150, 170);
        ctx.stroke();

        // Brazos
        ctx.moveTo(150, 130);
        ctx.lineTo(130, 150);
        ctx.moveTo(150, 130);
        ctx.lineTo(170, 150);
        ctx.stroke();

        // Piernas
        ctx.moveTo(150, 170);
        ctx.lineTo(130, 200);
        ctx.moveTo(150, 170);
        ctx.lineTo(170, 200);
        ctx.stroke();
    }
}

// Iniciar dibujo (6 intentos)
drawHangman(attempts);

document.getElementById('guessButton').addEventListener('click', function() {
    const letterInput = document.getElementById('letterInput').value.toLowerCase();
    document.getElementById('letterInput').value = '';

    if (letterInput.length !== 1 || guessedLetters.includes(letterInput)) {
        document.getElementById('message').innerText = 'Por favor, ingresa una letra válida.';
        return;
    }

    guessedLetters.push(letterInput);

    if (selectedWord.includes(letterInput)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letterInput) {
                correctGuesses[i] = letterInput;
            }
        }
        document.getElementById('message').innerText = '¡Bien hecho! Sigue así.';
    } else {
        attempts--;
        document.getElementById('message').innerText = 'Letra incorrecta. Inténtalo de nuevo.';
        drawHangman(attempts); // Dibujar el ahorcado
    }

    document.getElementById('attempts').innerText = attempts;
    updateWordContainer();

    if (correctGuesses.join('') === selectedWord) {
        document.getElementById('message').innerText = '¡Felicidades, ganaste!';
        document.getElementById('restartButton').style.display = 'block';
    } else if (attempts === 0) {
        document.getElementById('message').innerText = 'Lo siento, perdiste. La palabra era: ' + selectedWord;
        document.getElementById('restartButton').style.display = 'block';
    }
});

document.getElementById('restartButton').addEventListener('click', function() {
    location.reload();
});
