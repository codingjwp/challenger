const btn_menu = document.querySelector('#btn_menu');
// const gnb = document.querySelector('#gnb');

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

btn_menu.addEventListener('click', menuClickEvent);