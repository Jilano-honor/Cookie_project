// Constantes de configuration
const CONFIG = {
    BASE_AUTO_CLICKER_COST: 100,
    BASE_SECOND_AUTO_CLICKER_COST: 300,
    BASE_CLICK_BOOST_COST: 50,
    CLICK_BOOST_MULTIPLIER: 1.15,
    AUTO_CLICK_INTERVAL: 1000,
};

// Variables de score et de clics
let score = 0;
let stats = 0;
let clickValue = 1;
let clickBoostCost = CONFIG.BASE_CLICK_BOOST_COST;
let clickBoostLevel = 0;

// Images de cookies
const images = ['asset/tete1cookie.jpg', 'asset/tete2cookie.jpg', 'asset/tete3cookie.jpg'];
let imageIndex = 0;

// Éléments HTML
const elements = {
    clickboostLevelDisplay: document.getElementById('clickboostLevelDisplay'),
    autoClickerLevelDisplay: document.getElementById('autoClickerLevelDisplay'),
    autoClicker2LevelDisplay: document.getElementById('autoClicker2LevelDisplay'),
    clickValueDisplay: document.getElementById('clickValueDisplay'),
    scoreElement: document.getElementById('score'),
    clickImage: document.getElementById('clickImage'),
    toggleButton: document.getElementById('toggleButton'),
    autoClickerCostElement: document.getElementById('autoClickerCost'),
    secondAutoClickerCostElement: document.getElementById('secondAutoClickerCost'),
    clickBoostCostElement: document.getElementById('clickBoostCost'),
    errorMessageElement: document.getElementById('error-message'),
};

// Gestion des auto-clickers
const autoClickers = {
    first: {
        cost: CONFIG.BASE_AUTO_CLICKER_COST,
        level: 0,
        active: false,
        interval: null,
        start() {
            this.interval = setInterval(() => {
                score += clickValue;
                stats++;
                updateScoreDisplay();
            }, CONFIG.AUTO_CLICK_INTERVAL);
            this.active = true;
        }
    },
    second: {
        cost: CONFIG.BASE_SECOND_AUTO_CLICKER_COST,
        level: 0,
        active: false,
        interval: null,
        start() {
            this.interval = setInterval(() => {
                score += clickValue;
                stats++;
                updateScoreDisplay();
            }, CONFIG.AUTO_CLICK_INTERVAL);
            this.active = true;
        }
    }
};

// Événements pour afficher le contenu principal
elements.toggleButton.addEventListener('click', () => {
    const mainContent = document.querySelector('main');
    mainContent.classList.toggle('hidden');
    elements.toggleButton.style.display = mainContent.classList.contains('hidden') ? 'block' : 'none';
});

// Fonction pour afficher un message d'erreur
function showError(message) {
    elements.errorMessageElement.innerText = message;
}

// Fonction pour effacer le message d'erreur
function clearError() {
    elements.errorMessageElement.innerText = '';
}

// Fonction pour mettre à jour l'affichage du score
function updateScoreDisplay() {
    elements.scoreElement.innerText = score.toFixed(2);
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
    elements.clickImage.src = images[imageIndex];
}

// Fonction pour mettre à jour les coûts des auto-clickers et du boost
function updateCosts() {
    autoClickers.first.cost = Math.floor(CONFIG.BASE_AUTO_CLICKER_COST * Math.pow(1.5, autoClickers.first.level));
    autoClickers.second.cost = Math.floor(CONFIG.BASE_SECOND_AUTO_CLICKER_COST * Math.pow(1.5, autoClickers.second.level));

    elements.autoClickerCostElement.innerText = autoClickers.first.cost;
    elements.secondAutoClickerCostElement.innerText = autoClickers.second.cost;
    elements.clickBoostCostElement.innerText = clickBoostCost;
}

// Fonction générale pour acheter un auto-clicker
function purchaseAutoClicker(autoClicker) {
    if (score >= autoClicker.cost) {
        score -= autoClicker.cost;
        autoClicker.level++;
        clearError();
        updateCosts();
        updateAutoClickerDisplays();

        if (!autoClicker.active) {
            autoClicker.start();
        }
    } else {
        showError(`Pas assez de score pour acheter cet auto-clicker ! Coût : ${autoClicker.cost}, Score actuel : ${score.toFixed(2)}`);
    }
}

// Événements de clic pour acheter des auto-clickers
document.getElementById('autoClickerButton').addEventListener('click', () => {
    purchaseAutoClicker(autoClickers.first);
});

document.getElementById('secondAutoClickerButton').addEventListener('click', () => {
    purchaseAutoClicker(autoClickers.second);
});

// Fonction pour acheter un boost de clics
function purchaseClickBoost() {
    if (score >= clickBoostCost) {
        score -= clickBoostCost;
        clickValue *= CONFIG.CLICK_BOOST_MULTIPLIER;
        clickBoostLevel++;  // Incrémente le niveau de boost de clic
        clearError();
        updateClickValueDisplay();

        clickBoostCost = Math.floor(clickBoostCost * 1.5);
        updateCosts();
        updateAutoClickerDisplays();  // Met à jour l'affichage des niveaux
    } else {
        showError(`Pas assez de score pour acheter le boost de clics ! Coût : ${clickBoostCost}, Score actuel : ${score.toFixed(2)}`);
    }
}


// Événement de clic sur le bouton d'augmentation des clics
document.getElementById('clickBoostButton').addEventListener('click', purchaseClickBoost);

// Fonctions d'affichage
function updateClickValueDisplay() {
    elements.clickValueDisplay.innerText = `Valeur de clic : ${clickValue.toFixed(2)}`;
}

function updateAutoClickerDisplays() {
    elements.autoClickerLevelDisplay.innerText = `Niveau : ${autoClickers.first.level}`;
    elements.autoClicker2LevelDisplay.innerText = `Niveau : ${autoClickers.second.level}`;
    elements.clickboostLevelDisplay.innerText = `Niveau : ${clickBoostLevel}`;
}

// Initialisation de l'affichage
updateScoreDisplay();
updateCosts();
updateClickValueDisplay();
updateAutoClickerDisplays();
