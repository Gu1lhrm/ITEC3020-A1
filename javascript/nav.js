// Hamburger menu functionality
let hamburger = document.getElementsByClassName("hamburger")[0];
let navUl = document.getElementsByTagName("ul")[0]; 

if (hamburger && navUl) {
  // Toggle the navigation menu
  hamburger.onclick = function() {
    if (navUl.className.indexOf("ativo") === -1) {
      navUl.className = navUl.className + " ativo";
    } else {
      navUl.className = navUl.className.replace(" ativo", "");
    }
  };

  // Close the navigation menu
  let navLinks = navUl.getElementsByTagName("a");
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].onclick = function() {
      navUl.className = navUl.className.replace(" ativo", "");
    };
  }
}