const questions = [
    {
        question: "How did you hear about this promotion for Loffertitle?",
        answers: [
            "Social media",
            "In-store advertisement",
            "Friend or family recommendation",
            "Internet search",
            "Other source"
        ]
    },
    {
        question: "How often do you shop at Harbor Freight?",
        answers: [
            "Weekly",
            "Monthly",
            "A few times a year",
            "First time",
            "Rarely"
        ]
    },
    {
        question: "What type of tools do you use most often?",
        answers: [
            "Hand tools",
            "Power tools",
            "Automotive tools",
            "Outdoor equipment",
            "All of the above"
        ]
    },
    {
        question: "How would you rate our product quality?",
        answers: [
            "Excellent",
            "Very good",
            "Good",
            "Fair",
            "Poor"
        ]
    },
    {
        question: "Would you recommend Harbor Freight to friends?",
        answers: [
            "Definitely yes",
            "Probably yes",
            "Not sure",
            "Probably not",
            "Definitely not"
        ]
    },
    {
        question: "What do you value most when shopping for tools?",
        answers: [
            "Price",
            "Quality",
            "Brand reputation",
            "Warranty",
            "Customer service"
        ]
    },
    {
        question: "How satisfied are you with our customer service?",
        answers: [
            "Very satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very dissatisfied"
        ]
    },
    {
        question: "What improvements would you like to see?",
        answers: [
            "More product variety",
            "Better prices",
            "Improved quality",
            "Better customer service",
            "Faster shipping"
        ]
    }
];

let currentQuestionIndex = 0;
let countdownDate = new Date();
countdownDate.setHours(countdownDate.getHours() + 4);
countdownDate.setMinutes(countdownDate.getMinutes() + 21);
countdownDate.setSeconds(countdownDate.getSeconds() + 24);

function updateBannerDate() {
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const dateString = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    
    const banner = document.getElementById('dateBanner');
    if (banner) {
        banner.textContent = `Online Loyalty Program Only - ${dateString}`;
    }
}

function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const timerText = `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
    
    const timerElement = document.getElementById('timer');
    if (timerElement) timerElement.textContent = timerText;
    
    if (distance > 0) {
        setTimeout(updateTimer, 1000);
    }
}

function startSurvey() {
    showScreen('questionScreen');
    loadQuestion(0);
}

function loadQuestion(index, withAnimation = false) {
    currentQuestionIndex = index;
    const question = questions[index];
    const questionContent = document.querySelector('#questionScreen .question-content');
    
    if (withAnimation) {
        questionContent.classList.add('fade-out');
        
        setTimeout(() => {
            updateQuestionContent(question);
            questionContent.classList.remove('fade-out');
            questionContent.classList.add('fade-in');
            
            setTimeout(() => {
                questionContent.classList.remove('fade-in');
            }, 300);
        }, 300);
    } else {
        updateQuestionContent(question);
    }
}

function updateQuestionContent(question) {
    document.getElementById('questionTitle').textContent = question.question;
    
    const answerButtonsContainer = document.getElementById('answerButtons');
    answerButtonsContainer.innerHTML = '';
    
    question.answers.forEach((answer, i) => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = answer;
        button.onclick = () => selectAnswer(button);
        answerButtonsContainer.appendChild(button);
    });
}

function selectAnswer(button) {
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach(btn => btn.style.pointerEvents = 'none');
    
    button.style.backgroundColor = '#b03a3a';
    
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            loadQuestion(currentQuestionIndex + 1, true);
        } else {
            showVerifyingScreen();
        }
    }, 500);
}

function showVerifyingScreen() {
    showScreen('verifyingScreen');
    
    setTimeout(() => {
        showValidationScreen();
    }, 2500);
}

function showValidationScreen() {
    showScreen('validationScreen');
    
    setTimeout(() => {
        document.getElementById('validation1').classList.add('show');
    }, 300);
    
    setTimeout(() => {
        document.getElementById('validation2').classList.add('show');
    }, 800);
    
    setTimeout(() => {
        document.getElementById('validation3').classList.add('show');
    }, 1300);
    
    setTimeout(() => {
        showWinnerModal();
    }, 2500);
}

function showWinnerModal() {
    const modal = document.getElementById('winnerModal');
    modal.classList.add('active');
    
    startConfetti();
}

function redirectToGoogle() {
    window.location.href = 'https://google.com';
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
    }
}

function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 100;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'];
    
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.w = Math.random() * 10 + 5;
            this.h = Math.random() * 5 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.velocity = Math.random() * 3 + 2;
            this.swing = Math.random() * 2 - 1;
        }
        
        update() {
            this.y += this.velocity;
            this.x += this.swing;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new ConfettiPiece());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

updateBannerDate();
updateTimer();
