const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

function showSlide(index) {
  const totalSlides = slides.length;
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  currentIndex = index;

  const offset = -index * 100;
  slidesContainer.style.transform = `translateX(${offset}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

prevBtn.addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'));
    showSlide(index);
  });
});

showSlide(0);
