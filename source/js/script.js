/* в этот файл добавляет скрипты*/

const mainHeader = document.querySelector('.main-header');
const headerToggle = document.querySelector('.main-header__toggle');

const rangeInput = document.querySelectorAll('.slider__range input');
const priceInput = document.querySelectorAll('.slider__price-input input');
const progress = document.querySelector('.slider__progress');
const priceGap = 50;
const sliderWrapper = document.querySelector('.slider__wrapper');
const sliderInputs = sliderWrapper.querySelectorAll('input');
const resetButton = document.querySelector('.button--reset');

const sliderContainer = document.querySelector('.slider-image__container');
const slides = sliderContainer.querySelectorAll('.slider-image__item');
const nextButton = sliderContainer.querySelector('.slider-image__next-button');
const prevButton = sliderContainer.querySelector('.slider-image__prev-button');
const paginationContainer = sliderContainer.querySelector('.slider-image__pagination-list');
const paginationItems = paginationContainer.querySelectorAll('.slider-image__pagination-item');
let slideIndex = 0;

/** Menu mobile*/

mainHeader.classList.remove('main-header--nojs');

headerToggle.addEventListener('click', () => {
  if (mainHeader.classList.contains('main-header--closed')) {
    mainHeader.classList.remove('main-header--closed');
    mainHeader.classList.add('main-header--opened');
  } else {
    mainHeader.classList.add('main-header--closed');
    mainHeader.classList.remove('main-header--opened');
  }
});

/** Slider*/

setInitialSlide();

function setInitialSlide() {
  slides[0].classList.add('slider-image__item--active');
}

document.addEventListener('DOMContentLoaded', () => {
  rangeInput[0].value = 0;
  rangeInput[1].value = 900;
  updatePriceInput();
  updateProgress();
});

priceInput.forEach((input) => {
  input.addEventListener('input', e => {
    const minVal = parseInt(priceInput[0].value, 10);
    const maxVal = parseInt(priceInput[1].value, 10);
    if ((maxVal - minVal >= priceGap) && maxVal <= 1000) {
      rangeInput[0].value = minVal;
      rangeInput[1].value = maxVal;
      updateProgress();
    }
  });
});

rangeInput.forEach((input, index) => {
  input.addEventListener('input', e => {
    const minVal = parseInt(rangeInput[0].value, 10);
    const maxVal = parseInt(rangeInput[1].value, 10);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === 'slider__range-min') {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    }
    updateProgress();
    updatePriceInput();
  });
});

function updateProgress() {
  const minVal = parseInt(rangeInput[0].value, 10);
  const maxVal = parseInt(rangeInput[1].value, 10);
  progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
  progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
}

function updatePriceInput() {
  const minVal = parseInt(rangeInput[0].value, 10);
  const maxVal = parseInt(rangeInput[1].value, 10);
  priceInput[0].value = minVal;
  priceInput[1].value = maxVal;
}

resetButton.addEventListener('click', () => {
  rangeInput[0].value = 0;
  rangeInput[1].value = 900;
  updatePriceInput();
  updateProgress();
});

// Для disabled slider (add: .slider__wrapper--disabled)

if (sliderWrapper.classList.contains('slider__wrapper--disabled')) {
  sliderInputs.forEach(input => {
    input.disabled = true;
  });
}

/** Slider-image */

function updateSlide() {
  slides.forEach((slide, index) => {
    slide.classList.remove('slider-image__item--active');
    if(index === slideIndex) {
      slide.classList.add('slider-image__item--active');
    }
  });

  paginationItems.forEach((item, index) => {
    item.classList.remove('slider-image__pagination-item--active');
    if(index === slideIndex) {
      item.classList.add('slider-image__pagination-item--active');
    }
  });

  if(slideIndex === 0) {
    prevButton.disabled = true;
    nextButton.disabled = false;
  } else if(slideIndex === slides.length - 1) {
    prevButton.disabled = false;
    nextButton.disabled = true;
  } else {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
}

nextButton.addEventListener('click', () => {
  if(slideIndex < slides.length - 1) {
    slideIndex++;
  }
  updateSlide();
});

prevButton.addEventListener('click', () => {
  if(slideIndex > 0) {
    slideIndex--;
  }
  updateSlide();
});

paginationItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    slideIndex = index;
    updateSlide();
  });
});

updateSlide();
