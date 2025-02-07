const navbar = document.querySelector(".navbar");
const sidebar = document.querySelector(".sidebar");
const dropdownItems = document.querySelectorAll(".dropdown_item > .sidebar_link");
const navbarToggler = document.querySelector("#navToggler");
const sidebarToggler = document.querySelector(".sidebar_toggler");
const sidebarLinks = document.querySelectorAll(".sidebar_link");

const themeBtns = document.querySelectorAll(".theme_buttons i");
const savedTheme = localStorage.getItem("web-theme");

themeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    alert( 'Hello, world!' );
    const activeThemeBtn = document.querySelector(".theme_buttons .active");
    activeThemeBtn?.classList.remove("active");
    btn.classList.add("active");

    const theme = btn.id === "light-mode" ? "light" : "dark";
    document.body.classList.toggle("light-mode", theme === "light");
    localStorage.setItem("web-theme", theme);

  });
});

if (savedTheme) {
    alert( 'Hello, world!' );
  document.body.classList.toggle("light-mode", savedTheme === "light");
  document.querySelector(".theme_buttons .active").classList.remove("active")
  themeBtns[savedTheme === "light" ? 0 : 1].classList.add("active");
}

// Show and hide active link color
sidebarLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    link.classList.add("linkActive");
    sidebarLinks.forEach((link2, index2) => {
      if (index !== index2) link2.classList.remove("linkActive");
    });
  });
});

// show and hide dropdown menu
dropdownItems.forEach(link => {
  link.addEventListener("click", () => {
    let item = link.parentElement;
    item.classList.toggle("open");

    let menu = item.querySelector(".drop_down_menu");
    menu.style.height = item.classList.contains("open") ? `${menu.scrollHeight}px` : "0px";
  });
});

// Toggle Navbar
navbarToggler.addEventListener("click", () => {
  navbar.classList.toggle("openNav");
  if (navbar.classList.contains("openNav")) {
    navbarToggler.classList.replace("fa-bars", "fa-times");
  } else {
    navbarToggler.classList.replace("fa-times", "fa-bars");
  }
});

sidebarToggler.addEventListener("click", () => sidebar.classList.toggle("openSidebar"));