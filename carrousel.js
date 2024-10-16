const images = document.querySelector('.carousel-images');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let currentIndex = 0;

function updateCarousel() {
    const offset = -currentIndex * (100 / 3); // Ajuste selon le nombre d'images
    images.style.transform = `translateX(${offset}%)`;
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % 3; // Ajuste selon le nombre d'images
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + 3) % 3; // Ajuste selon le nombre d'images
    updateCarousel();
});