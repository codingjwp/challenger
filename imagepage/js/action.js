const btn_menu = document.querySelector('#btnMenu');
const gnb = document.querySelector('#gnb');
const left = document.querySelector('#leftArrow');
const right = document.querySelector('#rightArrow');
const sliders = document.querySelectorAll('.slider .wrap a');

let sliderIndex = 0;
const totalSlider = sliders.length;

function menuClickEvent() {
  if (btn_menu.classList.contains('close')) {
    const menuTranslateEnd = () => {
      btn_menu.removeEventListener('transitionend', menuTranslateEnd);
      btn_menu.classList.remove('next_close', 'close');
    }
    btn_menu.classList.add('next_close')
    btn_menu.addEventListener('transitionend', menuTranslateEnd);
    gnb.classList.remove('open');
  } else {
    const menuTranslateEnd = () => {
      btn_menu.removeEventListener('transitionend', menuTranslateEnd);
      btn_menu.classList.remove('prev_close')
      btn_menu.classList.add('close');
    }
    btn_menu.classList.add('prev_close')
    btn_menu.addEventListener('transitionend', menuTranslateEnd);
    gnb.classList.add('open');
  }
}

const sliderPositionChange = () => {
  let count = 0;
  for (let slide of sliders) {
    if (!slide.classList.contains('hide'))
      slide.classList.add('hide')
    if (count === sliderIndex)
      slide.classList.remove('hide');
    count++;
  }
}

const sliderLeftMoveClick = () => {
  sliderIndex = (sliderIndex === 0 ? totalSlider - 1 : sliderIndex - 1);
  sliderPositionChange();
}
const sliderRightMoveClick = () => {
  sliderIndex = (sliderIndex === totalSlider - 1 ? 0 : sliderIndex + 1);
  sliderPositionChange();
}

btn_menu.addEventListener('click', menuClickEvent);
left.addEventListener('click', sliderLeftMoveClick);
right.addEventListener('click', sliderRightMoveClick);