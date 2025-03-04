document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider-container");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".dots");

  let currentIndex = 0;
  let isAnimating = false;

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex);
    });
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    if (!isAnimating && index !== currentIndex) {
      isAnimating = true;
      currentIndex = index;
      updateSlider();
      setTimeout(() => (isAnimating = false), 500);
    }
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % cards.length);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + cards.length) % cards.length);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Auto-play
  let autoplayInterval = setInterval(nextSlide, 5000);

  // Pause auto-play on hover
  slider.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
  slider.addEventListener("mouseleave", () => {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  });

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    } else if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  });
});
