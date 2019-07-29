const btn = document.querySelector('.header__btn');
const topLine = document.querySelector('.header__btn-line--top');
const line = document.querySelector('.header__btn-line--center');
const bottomLine = document.querySelector('.header__btn-line--bottom');
const menu = document.querySelector('.header__menu-list');

btn.addEventListener('click', () => {
   line.classList.toggle('hide');
   topLine.classList.toggle('rotate-l');
   bottomLine.classList.toggle('rotate-r');
   menu.classList.toggle('active');
   setTimeout(function () {
       menu.classList.toggle('slide')
   }, 200);
});
