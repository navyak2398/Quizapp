const questions = [{
        question: "Which is the largest animal in the world?",
        answers: [{
                text: "Shark",
                correct: false
            },
            {
                text: "Blue whale",
                correct: true
            },
            {
                text: "Elephant",
                correct: false
            },
            {
                text: "Giraffe",
                correct: false
            }
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [{
                text: "Vatican City",
                correct: true
            },
            {
                text: "Bhutan",
                correct: false
            },
            {
                text: "Nepal",
                correct: false
            },
            {
                text: "Sri Lanka",
                correct: false
            }
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [{
                text: "Kalahari",
                correct: false
            },
            {
                text: "Gobi",
                correct: false
            },
            {
                text: "Sahara",
                correct: false
            },
            {
                text: "Antarctica",
                correct: true
            }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [{
                text: "Asia",
                correct: false
            },
            {
                text: "Australia",
                correct: true
            },
            {
                text: "Arctic",
                correct: false
            },
            {
                text: "Africa",
                correct: false
            }
        ]
    },
    // New questions added below
    {
        question: "Which planet is known as the Red Planet?",
        answers: [{
                text: "Earth",
                correct: false
            },
            {
                text: "Mars",
                correct: true
            },
            {
                text: "Jupiter",
                correct: false
            },
            {
                text: "Venus",
                correct: false
            }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [{
                text: "Gold",
                correct: false
            },
            {
                text: "Iron",
                correct: false
            },
            {
                text: "Diamond",
                correct: true
            },
            {
                text: "Silver",
                correct: false
            }
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [{
                text: "Amazon River",
                correct: false
            },
            {
                text: "Yangtze River",
                correct: false
            },
            {
                text: "Nile River",
                correct: true
            },
            {
                text: "Mississippi River",
                correct: false
            }
        ]
    },
    {
        question: "What is the capital city of Japan?",
        answers: [{
                text: "Beijing",
                correct: false
            },
            {
                text: "Seoul",
                correct: false
            },
            {
                text: "Tokyo",
                correct: true
            },
            {
                text: "Bangkok",
                correct: false
            }
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [{
                text: "Mark Twain",
                correct: false
            },
            {
                text: "Charles Dickens",
                correct: false
            },
            {
                text: "William Shakespeare",
                correct: true
            },
            {
                text: "Jane Austen",
                correct: false
            }
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [{
                text: "Au",
                correct: true
            },
            {
                text: "Ag",
                correct: false
            },
            {
                text: "Fe",
                correct: false
            },
            {
                text: "Pb",
                correct: false
            }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0; // Reset question index
    score = 0; // Reset score
    nextButton.innerHTML = "Next"; // Reset button text
    nextButton.style.display = "none"; // Hide the Next button initially
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button === selectedButton) {
            if (correct) {
                button.classList.add("correct");
            } else {
                button.classList.add("incorrect");
            }
        }
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    if (correct) {
        score++;
    }
    nextButton.style.display = "block"; // Show the Next button
}

function handleNextButtonClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"; // Show the Play Again button
    nextButton.removeEventListener("click", handleNextButtonClick); // Remove the Next button event listener
    nextButton.addEventListener("click", startQuiz); // Add the restart listener
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // Clear answer buttons
    }
    nextButton.style.display = "none"; // Ensure Next button is hidden initially
}

// Initialize the quiz
nextButton.addEventListener("click", handleNextButtonClick);
startQuiz();