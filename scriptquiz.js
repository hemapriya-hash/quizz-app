let questions = [
    { q: "Capital of India?", options: ["Delhi", "Mumbai", "Chennai"], ans: "Delhi" },
    { q: "Father of Computer?", options: ["Charles Babbage", "Alan Turing", "Bill Gates"], ans: "Charles Babbage" },
    { q: "Which language is used for web?", options: ["Python", "HTML", "C"], ans: "HTML" },
    { q: "Which is fastest memory?", options: ["RAM", "Cache", "ROM"], ans: "Cache" },
    { q: "Binary of 10?", options: ["1010", "1001", "1110"], ans: "1010" },
    { q: "CPU stands for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Unit"], ans: "Central Processing Unit" },
    { q: "Which is not OS?", options: ["Linux", "Windows", "Python"], ans: "Python" },
    { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language"], ans: "Hyper Text Markup Language" },
    { q: "Which is programming language?", options: ["Java", "HTTP", "WWW"], ans: "Java" },
    { q: "1 byte = ?", options: ["4 bits", "8 bits", "16 bits"], ans: "8 bits" }
];

let currentQ = 0;
let answers = new Array(questions.length).fill(null);

let userName = "";
let userEmail = "";

let timeLeft = 60;
let timer;

// LOGIN
function startQuiz() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();

    if (name === "" || email === "") {
        alert("Please enter both Name and Email");
        return;
    }

    userName = name;
    userEmail = email;

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";

    loadQuestion();
    startTimer();
}

// LOAD QUESTION
function loadQuestion() {
    let quizDiv = document.getElementById("quiz");
    let q = questions[currentQ];

    let html = `<p>${currentQ + 1}. ${q.q}</p>`;

    q.options.forEach(opt => {
        let checked = answers[currentQ] === opt ? "checked" : "";
        html += `<input type="radio" name="option" value="${opt}" ${checked}> ${opt}<br>`;
    });

    quizDiv.innerHTML = html;

    document.getElementById("backBtn").style.display = currentQ === 0 ? "none" : "inline-block";

    if (currentQ === questions.length - 1) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("submitBtn").style.display = "inline-block";
    } else {
        document.getElementById("nextBtn").style.display = "inline-block";
        document.getElementById("submitBtn").style.display = "none";
    }
}

// SAVE
function saveAnswer() {
    let selected = document.querySelector('input[name="option"]:checked');
    if (selected) {
        answers[currentQ] = selected.value;
    }
}

// NAV
function nextQuestion() {
    saveAnswer();
    currentQ++;
    loadQuestion();
}

function prevQuestion() {
    saveAnswer();
    currentQ--;
    loadQuestion();
}

// TIMER
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time Left: " + timeLeft + "s";

        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Time's up!");
            submitQuiz();
        }
    }, 1000);
}

// SUBMIT
function submitQuiz() {
    clearInterval(timer);
    saveAnswer();

    let score = 0;

    questions.forEach((q, i) => {
        if (answers[i] === q.ans) score++;
    });

    document.getElementById("quizPage").style.display = "none";
    document.getElementById("resultPage").style.display = "block";

    document.getElementById("nameResult").innerText = "Name: " + userName;
    document.getElementById("scoreResult").innerText = "Score: " + score + "/" + questions.length;

    startConfetti();
}

// 🎉 COLORFUL CONFETTI
function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    let pieces = [];

    for (let i = 0; i < 200; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 6 + 2,
            speed: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            p.y += p.speed;
            if (p.y > canvas.height) p.y = 0;
        });

        requestAnimationFrame(draw);
    }

    draw();
}

// 📝 FEEDBACK
function submitFeedback() {
    let text = document.getElementById("feedbackText").value;

    if (text.trim() === "") {
        alert("Please enter feedback");
        return;
    }

    document.getElementById("feedbackMsg").innerText = "Thank you for your feedback!";
}