document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      // Open clicked item if it wasn't already active
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
