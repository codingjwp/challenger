function checkId(tar, value){
  let returnVal = false;
  if(tar.id == value || tar?.parentElement?.id == value){
    returnVal = true
  };
  return returnVal;
}

function returnTar(tar, value) {
  let returnVal = tar;
  if (tar.parentElement.id == value) {
    returnVal = tar.parentElement;
  }
  return returnVal;
}

const _gnb = document.querySelector('#gnb');
const _wrap = document.querySelector('#wrap');
const _btnViewMenu = document.querySelector('#viewMenu');

function menuClickFn(_tar) {
  if (checkId(_tar, 'viewMenu')) {
    const _menuBtn = returnTar(_tar, 'viewMenu');
    if (_gnb.classList.contains('open')) {
      const menuBtnTransitionendFunc = () =>{
        _menuBtn.removeEventListener('transitionend',menuBtnTransitionendFunc);
        _menuBtn.classList.remove('next_close','close');
      };
      _menuBtn.classList.add('next_close');
      _menuBtn.addEventListener('transitionend',menuBtnTransitionendFunc);
      _gnb.classList.remove('open');

      const wrapTransitionendFunc = ()=>{
        _menuBtn.removeEventListener('transitionend',wrapTransitionendFunc);
        _wrap.classList.remove('dimed');
      };
      _menuBtn.addEventListener('transitionend',wrapTransitionendFunc);
      _wrap.classList.remove('active');
    }else {
      const menuBtnTransitionendFuc = () => {
        _menuBtn.removeEventListener('transitionend',menuBtnTransitionendFuc);
        _menuBtn.classList.remove('prev_close');
        _menuBtn.classList.add('close');
      };
      _menuBtn.classList.add('prev_close');
      _menuBtn.addEventListener('transitionend', menuBtnTransitionendFuc);
      _gnb.classList.add('open');
      _wrap.classList.add('dimed','active');
    }
  }
}

window.addEventListener('click', obj => {
  const _tar = obj.target;
  menuClickFn(_tar);
})