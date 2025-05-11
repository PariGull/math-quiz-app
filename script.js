function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;
    const correctAnswer = 8;

    const feedback = document.getElementById('feedback');
    if (parseInt(userAnswer) === correctAnswer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Try Again!";
        feedback.style.color = "red";
    }
}
