// Animate number counters
const counters = document.querySelectorAll(".counter");
const speed = 200;

counters.forEach((counter) => {
  const target = +counter.getAttribute("data-target");
  const increment = target / speed;

  const updateCount = () => {
    const count = +counter.innerText;
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});
