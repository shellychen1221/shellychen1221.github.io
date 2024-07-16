let slideIndex = {};

function changeSlide(n, carouselId) {
    showSlides(slideIndex[carouselId] += n, carouselId);
}

function currentSlide(n, carouselId) {
    showSlides(slideIndex[carouselId] = n, carouselId);
}

function showSlides(n, carouselId) {
    let i;
    let slides = document.querySelectorAll(`#${carouselId} .carousel-images img`);
    let thumbnails = document.querySelectorAll(`#${carouselId} .carousel-thumbnails img`);

    if (n > slides.length) { slideIndex[carouselId] = 1 }
    if (n < 1) { slideIndex[carouselId] = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace(" active", "");
    }
    slides[slideIndex[carouselId] - 1].style.display = "block";
    thumbnails[slideIndex[carouselId] - 1].className += " active";
}

function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const carouselId = carousel.getAttribute('id');
        slideIndex[carouselId] = 1;
        showSlides(slideIndex[carouselId], carouselId);
    });
}

document.addEventListener('DOMContentLoaded', initializeCarousels);
