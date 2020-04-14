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
        bounding.top <= 50 &&
        bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
};

// build the nav
function buildNav() {
    for (i = 1; i < landingContainerCount + 1; i++) {
        let section = document.querySelector("#section" + i);
        let sectionTitle = section.getAttribute('data-nav');
        let selectionListItem = buildListItem(sectionTitle);
        
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
              if (isInViewport(section)) {
                section.classList.add("your-active-class");
              } else {
                section.classList.remove("your-active-class");
              }
            },
            false
        );
    
        navBarList.appendChild(selectionListItem);
    }
}

// Build menu 
function buildListItem(sectionTitle) {
    let selectionListItem = document.createElement('li');
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