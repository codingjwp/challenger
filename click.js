const hamburger = document.getElementById('btn_hamburger');

const viewMenuClick = () => {
  const gnb = document.getElementById('gnb');
  for(let [_, name] of gnb.classList.entries()) {
    if (name === 'open') {
      gnb.classList.remove('open')
      return ;
    }
  }
  gnb.classList.add('open');
}


hamburger.addEventListener('click', viewMenuClick);