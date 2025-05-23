let correctAnswer = null;
let score = 0;
let total = 0;

const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operatorSelect = document.getElementById('operator');
const questionDiv = document.getElementById('question');
const answerInput = document.getElementById('answer');
const feedbackP = document.getElementById('feedback');
const scoreP = document.getElementById('score');
const generateBtn = document.getElementById('generate-btn');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');

// Utility to generate a random integer in range [min, max]
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a new question based on user input or random values
function generateQuestion() {
    let num1 = parseInt(num1Input.value, 10);
    let num2 = parseInt(num2Input.value, 10);
    let operator = operatorSelect.value;

    if (isNaN(num1)) num1 = randomInt(1, 20);
    if (isNaN(num2)) num2 = randomInt(1, 20);

    // Avoid division by zero
    if (operator === '/' && num2 === 0) num2 = randomInt(1, 10);

    num1Input.value = num1;
    num2Input.value = num2;

    // Prepare the question string and answer
    questionDiv.textContent = `What is ${num1} ${operator} ${num2} ?`;
    switch (operator) {
        case '+': correctAnswer = num1 + num2; break;
        case '-': correctAnswer = num1 - num2; break;
        case '*': correctAnswer = num1 * num2; break;
        case '/': correctAnswer = parseFloat((num1 / num2).toFixed(2)); break;
    }
    answerInput.value = '';
    feedbackP.textContent = '';
    submitBtn.disabled = false;
    nextBtn.style.display = 'none';
    answerInput.focus();
}

function checkAnswer() {
    let userAnswer = answerInput.value.trim();
    if (userAnswer === '') {
        feedbackP.textContent = "Please enter your answer!";
        return;
    }

    let userNum = parseFloat(userAnswer);
    let isCorrect = false;

    // For division, allow a small margin of error
    if (operatorSelect.value === '/') {
        isCorrect = Math.abs(userNum - correctAnswer) < 0.05;
    } else {
        isCorrect = userNum === correctAnswer;
    }

    total++;
    if (isCorrect) {
        score++;
        feedbackP.textContent = "🎉 Correct! Well done!";
        feedbackP.style.color = 'green';
    } else {
        feedbackP.textContent = `❌ Oops! The correct answer was ${correctAnswer}.`;
        feedbackP.style.color = 'red';
    }

    updateScore();
    submitBtn.disabled = true;
    nextBtn.style.display = 'inline-block';
}

function updateScore() {
    scoreP.textContent = `Score: ${score} / ${total}`;
}

// Button event listeners
generateBtn.addEventListener('click', generateQuestion);
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', generateQuestion);

// Allow pressing Enter to submit
answerInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !submitBtn.disabled) {
        checkAnswer();
    }
});

// Generate the first question on page load
window.onload = generateQuestion;
