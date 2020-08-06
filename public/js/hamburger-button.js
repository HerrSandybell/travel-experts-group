const navBar = document.querySelector(`nav`);
const burgerBtn = document.querySelector(`.hamburger-menu`);
  
// When burger button is clicked, slide in the nav bar.
burgerBtn.addEventListener("click", function() {
  navBar.classList.toggle('visible');
})

// This event listener detects clicks outside of the burger menu and hides the navbar.
window.addEventListener('click', function(e) {
  if (e.target != document.querySelector('.hamburger-menu') && e.target != document.querySelector('.hamburger-menu path') && e.target != document.querySelector('.hamburger-menu svg') && e.target != document.querySelector('nav')) {
    navBar.classList.remove('visible');
  }
});