import themeSwitcher from "./lib/theme-switcher.js";
import router from "./routes.js";
import inventoryAPIs from "./api/inventory.mock.server.js";

router.start();

inventoryAPIs();

function intializeThemeSwitcher() {
  themeSwitcher();
}

document.addEventListener("DOMContentLoaded", intializeThemeSwitcher);
