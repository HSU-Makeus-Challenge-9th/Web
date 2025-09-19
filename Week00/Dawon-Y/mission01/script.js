document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.header__toggle-btn');
    const closeBtn = document.querySelector('.sidebar__close-btn');
    const sidebar = document.querySelector('.header__sidebar');
    
    // 사이드바 열기/닫기 기능
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.add('header__sidebar--open');
    });

    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('header__sidebar--open');
    });
});