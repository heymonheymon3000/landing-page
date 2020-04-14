/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// init the nav
function initNav() {
  let isInViewport = function(elem) {
      let bounding = elem.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const nav = document.querySelector('#navbar__list');
  const sections = document.querySelectorAll('section');
  let firstLink = true;
  for (let section of sections) {
      const navLink = document.createElement('li');
      if(firstLink) {
        firstLink = false;
        navLink.innerHTML =
        `<a href="#${section.id}" class="menu__link link__active" data-link="${section.dataset.nav}">
            ${section.dataset.nav}
        </a>`
      } else {
        navLink.innerHTML =
        `<a href="#${section.id}" class="menu__link" data-link="${section.dataset.nav}">
            ${section.dataset.nav}
        </a>`
      }
      nav.appendChild(navLink);
      
      window.addEventListener(
        "scroll",
        function(event) {
          const link = document.querySelectorAll(`[data-link="${section.dataset.nav}"]`)[0];
          if (isInViewport(section)) {
            section.classList.add("your-active-class");
            link.classList.add("link__active");
          } else {
            section.classList.remove("your-active-class");
            link.classList.remove("link__active"); 
          }
        }
     );
     
  }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

initNav();

/**
 * End Main Functions
 * Begin Events
 * 
*/