const question=[
    {
        question: "Quel est le langage utilisé pour styliser une page web ?",
        reponses: [
            { text: "Python", correcte: false},
            { text: "Java", correcte: false},
            { text: "HTML", correcte: false},
            { text: "CSS", correcte: true},
            { text: "C++", correcte: false},
        ]
    },
    {
        question: "Quel est le système d’exploitation open-source le plus utilisé pour les serveurs ?",
        reponses: [
            { text: "Windows", correcte: false},
            { text: "macOS", correcte: false},
            { text: "Linux ", correcte: true},
            { text: "Android", correcte: false},
            { text: "MS-DOS", correcte: false},
        ]
    },
    {
        question: "Quel est le résultat de l’opération 5 × 8 ?",
        reponses: [
            { text: "35", correcte: false},
            { text: "45", correcte: false},
            { text: "40 ", correcte: true},
            { text: "30", correcte: false},
            { text: "50", correcte: false},
        ]
    },
    {
        question: "Quelle planète est la plus proche du Soleil ?",
        reponses: [
            { text: "Vénus", correcte: false},
            { text: "Terre", correcte: false},
            { text: "Jupiter", correcte: false},
            { text: "Mercure ", correcte: true},
            { text: "Mars", correcte: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const boutons_reponse = document.getElementById("btn_reponse");
const boutons_suivant = document.getElementById("suivant");
const scoreElement = document.getElementById("score");
const questionCountElement = document.getElementById("question-count");

let point = 0;
let score = 0;

function debutQuiz() {
    point = 0;
    score = 0;
    scoreElement.innerHTML = `Score: ${score}`;
    questionCountElement.innerHTML = `Question ${point + 1} / ${question.length}`;
    boutons_suivant.innerHTML = "Suivant";
    choixQuestion();
}

function choixQuestion() {
    restauration();
    let questionCourant = question[point];
    questionElement.innerHTML = (point + 1) + ". " + questionCourant.question;
    questionCountElement.innerHTML = `Question ${point + 1} / ${question.length}`;
    
    // Masquer uniquement la deuxième ligne de séparation après la première question
    let separations = document.querySelectorAll("hr");
    if (point === 0) {
        document.querySelector("h1").style.display = "block";
        separations.forEach(hr => hr.style.display = "block"); // Afficher toutes les lignes au début
    } else {
        document.querySelector("h1").style.display = "none";
        if (separations.length > 1) {
            separations[1].style.display = "none"; // Masquer seulement la deuxième ligne de séparation
        }
    }
    questionCourant.reponses.forEach(reponses => {
        const bouton = document.createElement("button");
        bouton.innerHTML = reponses.text;
        bouton.classList.add("btn");
        boutons_reponse.appendChild(bouton);
        if (reponses.correcte) {
            bouton.dataset.correcte = reponses.correcte;
        }
        bouton.addEventListener("click", selection);
    });
}


function restauration() {
    boutons_suivant.style.display = "none";
    scoreElement.style.display = "block";
    while (boutons_reponse.firstChild) {
        boutons_reponse.removeChild(boutons_reponse.firstChild);
    }
}

function selection(e) {
    const btn_selection = e.target;
    const estCorrecte = btn_selection.dataset.correcte === "true";
    if (estCorrecte) {
        btn_selection.classList.add("correcte");
        score++;
        scoreElement.innerHTML = `Score: ${score}`;
    } else {
        btn_selection.classList.add("incorrecte");
    }
    Array.from(boutons_reponse.children).forEach(bouton => {
        if (bouton.dataset.correcte === "true") {
            bouton.classList.add("correcte");
        }
        bouton.disabled = true;
    });
    boutons_suivant.style.display = "block";
}

function scoreTotal() {
    restauration();
    questionElement.innerHTML = `Votre score est de ${score} sur ${question.length}!`;
    boutons_suivant.innerHTML = "Rejouer";
    boutons_suivant.style.display = "block";
    scoreElement.style.display = "none";
    questionCountElement.innerHTML = "";
    
    let h1Element = document.querySelector("h1");
    h1Element.style.display = "block";
    h1Element.innerHTML = score === question.length ? "Félicitations ! Vous avez un score parfait ! " : "Bien joué ! Essayez de faire encore mieux ! ";
}


function questionSuivant() {
    point++;
    if (point < question.length) {
        choixQuestion();
    } else {
        scoreTotal();
    }
}

boutons_suivant.addEventListener("click", () => {
    if (point < question.length) {
        questionSuivant();
    } else {
        document.querySelector("h1").innerHTML = "Bienvenue dans les quiz de Khalil";
        debutQuiz();
    }
});
function afficherPageGarde() {
    document.querySelector(".quiz").style.display = "none";
    document.querySelector(".header-info").style.display = "none";
    document.querySelector("h1").style.display = "block";
    document.querySelector("h1").innerHTML = "Bienvenue dans les quiz de Khalil";
    let container = document.querySelector(".application");
    
    let pageGarde = document.createElement("div");
    pageGarde.classList.add("page-garde");
    pageGarde.innerHTML = `<p>Testez vos connaissances avec QuizTime !</p><button id='commencer'>Commencer</button>`;
    container.appendChild(pageGarde);
    
    document.getElementById("commencer").addEventListener("click", () => {
        pageGarde.style.display = "none";
        document.querySelector(".quiz").style.display = "block";
        document.querySelector(".header-info").style.display = "flex";
        debutQuiz();
    });
}

document.addEventListener("DOMContentLoaded", afficherPageGarde);

debutQuiz();
