let slideIndex = {};

document.querySelectorAll('.accordion').forEach(acc => {
    acc.addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
});

function changeSlide(n, carouselId) {
    showSlides(slideIndex[carouselId] += n, carouselId);
}

function showSlides(n, carouselId) {
    let slides = document.querySelectorAll(`#${carouselId} .carousel-images img`);
    if (!slideIndex[carouselId]) slideIndex[carouselId] = 1;

    if (n > slides.length) slideIndex[carouselId] = 1;
    if (n < 1) slideIndex[carouselId] = slides.length;

    slides.forEach(slide => slide.style.display = "none");
    slides[slideIndex[carouselId] - 1].style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        let carouselId = carousel.id;
        slideIndex[carouselId] = 1;
        showSlides(slideIndex[carouselId], carouselId);
    });
});
