const question=[
    {
        question :" Quel est le langage utilisé pour styliser une page web ?",
        reponses: [
            { text: "Python", correcte: false},
            { text: "Java", correcte: false},
            { text: "HTML", correcte: false},
            { text: "CSS", correcte: true},
            { text: "C++", correcte: false},
        ]
    },
    {
        question :"  Quel est le système d’exploitation open-source le plus utilisé pour les serveurs ?",
        reponses: [
            { text: "Windows", correcte: false},
            { text: "macOS", correcte: false},
            { text: "Linux ", correcte: true},
            { text: "Android", correcte: false},
            { text: "MS-DOS", correcte: false},
        ]
    },
    {
        question :"Quel est le résultat de l’opération 5 × 8 ?",
        reponses: [
            { text: "35", correcte: false},
            { text: "45", correcte: false},
            { text: "40 ", correcte: true},
            { text: "30", correcte: false},
            { text: "50", correcte: false},
        ]
    },
    {
        question :" Quelle planète est la plus proche du Soleil ?",
        reponses: [
            { text: "Vénus", correcte: false},
            { text: "Terre", correcte: false},
            { text: "Jupiter", correcte: false},
            { text: "Mercure ", correcte: true},
            { text: "Mars", correcte: false},
        ]
    }

];

const questionElement=document.getElementById("question")
const boutons_reponse=document.getElementById("btn_reponse")
const boutons_suivant=document.getElementById("suivant")

let point=0;
let score=0;

function debutQuiz(){
    point=0;
    score=0;
    boutons_suivant.innerHTML="Suivant";
    choixQuestion();
}

function choixQuestion(){
    restauration();
    let questionCourant=question[point];
    let questionNo=point +1;
    questionElement.innerHTML=questionNo+ ". "+ questionCourant.question;

    questionCourant.reponses.forEach(reponses => {
        const bouton=document.createElement("button");
        bouton.innerHTML=reponses.text;
        bouton.classList.add("btn");
        boutons_reponse.appendChild(bouton);
        if(reponses.correcte){
            bouton.dataset.correcte=reponses.correcte;
        }
        bouton.addEventListener("click", selection)
    });
}

function restauration(){
    boutons_suivant.style.display="none";
    while(boutons_reponse.firstChild){
        boutons_reponse.removeChild(boutons_reponse.firstChild);
    }
}

function selection(e){
    const btn_selection=e.target;
    const estCorrecte=btn_selection.dataset.correcte==="true";
    if(estCorrecte){
        btn_selection.classList.add("correcte")
        score++;
    }else{
        btn_selection.classList.add("incorrecte")
    }
    Array.from(boutons_reponse.children).forEach(bouton=>{
        if(bouton.dataset.correcte === "true"){
            bouton.classList.add("correcte");
        }
        bouton.disabled=true;
    })
    boutons_suivant.style.display="block";
}

function scoreTotal(){
    restauration();
    questionElement.innerHTML= ` Votre score est de ${score} sur ${question.length}!`
    boutons_suivant.innerHTML="Rejouer";
    boutons_suivant.style.display="block"
}


function questionSuivant(){
    point++;
    if(point<question.length){
        choixQuestion();
    }else{
        scoreTotal();
    }
}

boutons_suivant.addEventListener("click", ()=>{
    if(point<question.length){
        questionSuivant();
    }else{
        debutQuiz();
    }
})

debutQuiz();
