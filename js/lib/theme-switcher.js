/**
 * Theme Switching Functionality
 * Controls the light/dark mode theme switching
 */

// Pure function to set the theme
function setTheme(themeName) {
  document.querySelector("html").setAttribute("data-theme", themeName);
}

// Function to initialize theme based on system preference
function setInitialTheme() {
  // Get the theme toggle element
  const themeToggle = document.getElementById("theme-toggle");

  // Check if user's system prefers dark mode
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (prefersDarkMode) {
    themeToggle.checked = true;
    setTheme("dark");
  } else {
    themeToggle.checked = false;
    setTheme("light");
  }
}

// Function to handle the toggle event
function toggleTheme(event) {
  if (event.target.checked) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

export default function main() {
  // Set initial theme based on system preference
  setInitialTheme();

  // Get the theme toggle switch
  const themeToggle = document.getElementById("theme-toggle");

  // Add the event listener using our named function
  themeToggle.addEventListener("change", toggleTheme);
}
