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
let selectedIndex = 0;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const createNavItem = (section)=> { 
  const navItem = document.createElement('li');
  navItem.innerText = `${section.dataset.nav}`;
  navItem.classList.add('menu__link');
  navItem.setAttribute('data-link', `${section.dataset.nav}`);
  return navItem;
}

const sectionCoord = (section) => {
  let bodyTop = document.body.getBoundingClientRect().top;
  let sectionTop = section.getBoundingClientRect().top;
  let secCoord = sectionTop - bodyTop;
  return secCoord; 
}

const getSectionCoords = () => {
  const sections = document.querySelectorAll('section');
  const sectionTop = [];

  for (section of sections){
    sectionTop.push(sectionCoord(section));
  }
  return sectionTop;
}

const scrollEventHandler = ()=> {
  const sectionCoords = getSectionCoords();

  for(let i = 0; i < sectionCoords.length; i++){
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.menu__link');

    if(window.scrollY >= sectionCoords[i] && 
      !(window.scrollY > sectionCoords[i+1])) {
      sections[i].classList.add('your-active-class');
      navItems[i].classList.add('link__active');
      // cache selectedIndex
      selectedIndex = i;
    } else {
      sections[i].classList.remove('your-active-class');
      navItems[i].classList.remove('link__active'); 
    }
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
const buildNav = ()=> {
  const nav = document.querySelector('#navbar__list');
  const sections = document.querySelectorAll('section');
  
  sections.forEach(function(section) {
    let navItem = createNavItem(section);
    nav.appendChild(navItem);
  });
}

// Add class 'active' to section when near top of viewport
const scrollSectionActiveEvent = ()=> {
  window.addEventListener('scroll', scrollEventHandler);
}

// Scroll to anchor ID using scrollTO event   
const scrollToSectionOnClick = ()=> {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.menu__link');

  sections.forEach(function(section, index) {
    if(0 == index) {
      // scroll to the section
      section.scrollIntoView ({behavior: 'smooth'});
      // make the nav item active
      navItems[index].classList.add('link__active');
      // cache selectedIndex
      selectedIndex = 0;
    }

    navItems[index].addEventListener('click', function(evt) {
      // remove scroll event handler 
      window.removeEventListener('scroll', scrollEventHandler);   
      // make this nav item not active... no need to make the selected nav item active 
      // because once the scroll event is add the selected nav item will be make active.
      navItems[selectedIndex].classList.remove('link__active');
      
      // scroll to the selected section
      section.scrollIntoView ({behavior: 'smooth'});

      // cache selectedIndex
      selectedIndex = parseInt(this.dataset.link.split(" ")[1]) - 1;

      // add scroll event handler back after 1 sec
      setTimeout(function() {
        window.addEventListener('scroll', scrollEventHandler);
      }, 900);
    });
  });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.addEventListener("DOMContentLoaded", buildNav);
// Scroll to section on link click
window.addEventListener("DOMContentLoaded", scrollToSectionOnClick);
// Set sections as active
window.addEventListener("DOMContentLoaded", scrollSectionActiveEvent);