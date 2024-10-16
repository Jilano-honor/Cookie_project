let score = 0;
let stats = 0;
let clickValue = 1;

let imageIndex = 0;
const images = ['asset/tete1cookie.jpg', 'asset/tete2cookie.jpg', 'asset/tete3cookie.jpg'];

document.getElementById('clickZone').addEventListener('click', () => {
    score += clickValue;
    stats++;
    document.getElementById('score').innerText = score;
    imageIndex = (imageIndex + 1) % images.length;
    document.getElementById('clickImage').src = images[imageIndex];
})
document.getElementById('toggleButton').addEventListener('click', () => {
    const mainContent = document.querySelector('main');
    const toggleButton = document.getElementById('toggleButton');

    if (mainContent.classList.contains('hidden')) {
        mainContent.classList.remove('hidden');
        toggleButton.style.display = 'none'; // Cache le bouton après affichage du contenu
    }
});