// Variables de score et de clics
let score = 0;
let stats = 0;
let clickValue = 1;
let clickBoostCost = 50; // Coût initial du boost de clics

// Images de cookies
let imageIndex = 0;
const images = ['asset/tete1cookie.jpg', 'asset/tete2cookie.jpg', 'asset/tete3cookie.jpg'];

// Éléments HTML
const scoreElement = document.getElementById('score');
const clickImage = document.getElementById('clickImage');
const toggleButton = document.getElementById('toggleButton');
const autoClickerCostElement = document.getElementById('autoClickerCost');
const secondAutoClickerCostElement = document.getElementById('secondAutoClickerCost');
const clickBoostCostElement = document.getElementById('clickBoostCost');
const errorMessageElement = document.getElementById('error-message'); // Élément pour les messages d'erreur

// Variables pour les auto-clickers
let autoClickerInterval;
let autoClickerCost = 100;
let secondAutoClickerCost = 300;
let autoClickerActive = false;
let autoClickerLevel = 0;
let secondAutoClickerActive = false;
let secondAutoClickerLevel = 0;

// Fonction pour afficher un message d'erreur
function showError(message) {
    errorMessageElement.innerText = message;
}

// Fonction pour effacer le message d'erreur
function clearError() {
    errorMessageElement.innerText = '';
}

// Fonction pour mettre à jour l'affichage du score
function updateScoreDisplay() {
    scoreElement.innerText = score.toFixed(2); // Affiche le score avec 2 décimales
}

// Fonction pour mettre à jour les coûts des auto-clickers et du boost
function updateCosts() {
    autoClickerCost = Math.floor(100 * Math.pow(1.5, autoClickerLevel)); // Coût avec augmentation exponentielle
    secondAutoClickerCost = Math.floor(300 * Math.pow(1.5, secondAutoClickerLevel));
    
    autoClickerCostElement.innerText = autoClickerCost;
    secondAutoClickerCostElement.innerText = secondAutoClickerCost;
    clickBoostCostElement.innerText = clickBoostCost; // Met à jour le coût du boost
}

// Événement de clic sur la zone de clic
document.getElementById('clickZone').addEventListener('click', () => {
    score += clickValue;
    stats++;
    updateScoreDisplay();
    changeClickImage();
});

// Fonction pour changer l'image du cookie
function changeClickImage() {
    imageIndex = (imageIndex + 1) % images.length;
    clickImage.src = images[imageIndex];
}

// Événement pour afficher le contenu principal
toggleButton.addEventListener('click', () => {
    const mainContent = document.querySelector('main');
    mainContent.classList.toggle('hidden');
    toggleButton.style.display = mainContent.classList.contains('hidden') ? 'block' : 'none';
});

// Fonction générale pour acheter un auto-clicker
function purchaseAutoClicker(cost, level, activateFunc) {
    if (score >= cost) {
        score -= cost;
        level++;
        updateScoreDisplay();
        clearError(); // Efface les messages d'erreur
        updateCosts(); // Met à jour les coûts

        if (!activateFunc.isActive) {
            activateFunc.start(); // Démarre l'auto-clicker si ce n'est pas déjà actif
            activateFunc.isActive = true;
        }

        return level; // Retourne le nouveau niveau
    } else {
        showError(`Pas assez de score pour acheter cet auto-clicker ! Coût : ${cost}, Score actuel : ${score.toFixed(2)}`);
    }
    return level; // Retourne le niveau non modifié si l'achat échoue
}

// Événements de clic pour acheter des auto-clickers
document.getElementById('autoClickerButton').addEventListener('click', () => {
    autoClickerLevel = purchaseAutoClicker(autoClickerCost, autoClickerLevel, {
        isActive: autoClickerActive,
        start: startAutoClicker
    });
});

document.getElementById('secondAutoClickerButton').addEventListener('click', () => {
    secondAutoClickerLevel = purchaseAutoClicker(secondAutoClickerCost, secondAutoClickerLevel, {
        isActive: secondAutoClickerActive,
        start: startSecondAutoClicker
    });
});

// Fonction pour démarrer l'auto-clicker
function startAutoClicker() {
    autoClickerInterval = setInterval(() => {
        score += clickValue; // Augmente le score avec la valeur du premier auto-clicker
        stats++;
        updateScoreDisplay();
    }, 1000); // Auto-clicker toutes les secondes

    autoClickerActive = true; // Marque le premier auto-clicker comme actif
}

// Fonction pour démarrer le deuxième auto-clicker
function startSecondAutoClicker() {
    setInterval(() => {
        score += clickValue; // Augmente le score avec la valeur du deuxième auto-clicker
        stats++;
        updateScoreDisplay();
    }, 1000); // Deuxième auto-clicker toutes les secondes

    secondAutoClickerActive = true; // Marque le deuxième auto-clicker comme actif
}

// Fonction pour acheter un boost de clics
function purchaseClickBoost() {
    if (score >= clickBoostCost) {
        score -= clickBoostCost;
        clickValue *= 1.15; // Augmente la valeur des clics de 15 %
        updateScoreDisplay();
        clearError(); // Efface les messages d'erreur

        // Augmente le coût du boost de clics pour la prochaine fois
        clickBoostCost = Math.floor(clickBoostCost * 1.5); // Multiplie le coût par 1.5
        updateCosts(); // Met à jour l'affichage des coûts
    } else {
        showError(`Pas assez de score pour acheter le boost de clics ! Coût : ${clickBoostCost}, Score actuel : ${score.toFixed(2)}`);
    }
}

// Événement de clic sur le bouton d'augmentation des clics
document.getElementById('clickBoostButton').addEventListener('click', purchaseClickBoost);

// Initialisation de l'affichage
updateScoreDisplay();
updateCosts();
