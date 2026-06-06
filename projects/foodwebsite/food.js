const images = document.querySelector('.images');

document.querySelector('.slider-left').addEventListener('click', () => {
    images.scrollLeft -= 300;
});

document.querySelector('.slider-right').addEventListener('click', () => {
    images.scrollLeft += 300;
});

  let count = 0;

  const addBtn = document.querySelector(".add");
  const subBtn = document.querySelector(".sub");
  const solution = document.querySelector(".solution");

  addBtn.addEventListener("click", function () {
    count++;
    solution.textContent = count;
  });

  subBtn.addEventListener("click", function () {
    if (count > 0) {
      count--;
      solution.textContent = count;
    }
  });