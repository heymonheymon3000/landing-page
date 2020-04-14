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
let navBarList = document.getElementById("navbar__list");
const landingContainerCount = document.getElementsByClassName("landing__container").length;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
let isInViewport = function(elem) {
    let bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// build the nav
function buildNav() {
    for (let i = 1; i < landingContainerCount + 1; i++) {
        const id = "section" + i;
        let section = document.querySelector("#"+id);
        let sectionTitle = section.getAttribute('data-nav');
        let selectionListItem = buildListItem(id, sectionTitle);
        
        // Scroll to section on link click
        // Scroll to anchor ID using scrollTO event
        selectionListItem.addEventListener("click", function() {
            section.scrollIntoView ({
            behavior: 'smooth'}
          )
        });
    
        // Set sections as active
        // Add class 'active' to section when near top of viewport
        window.addEventListener(
          "scroll",
          function(event) {
            let nItem = this.document.getElementById('nav-'+id);
            if (isInViewport(section)) {
              section.classList.add("your-active-class");
              nItem.classList.add("link__active");  
            } else {
              section.classList.remove("your-active-class");
              nItem.classList.remove("link__active");
            }
          }
        );

        navBarList.appendChild(selectionListItem);
    }
}

// Build menu 
function buildListItem(id, sectionTitle) {
    console.log("id => " + id);
    let selectionListItem = document.createElement('li');
    selectionListItem.id = 'nav-'+id;
    selectionListItem.className = 'menu__link';
    selectionListItem.textContent = sectionTitle;
    return selectionListItem;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
buildNav();
/**
 * End Main Functions
 * Begin Events
 * 
*/