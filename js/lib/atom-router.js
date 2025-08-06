/**
 * AtomRouter: A minimal SPA router.
 * - Register routes and navigate via history API.
 * - Intercepts same-origin link clicks for client-side nav.
 * - Optional debug mode logs routing actions.
 */
export class AtomRouter {
  /**
   * @param {Object} options
   * @param {string} options.rootId  ID of the element to render into.
   * @param {boolean} options.debug   Enable debug logging.
   */
  constructor({ rootId = "app", debug = false } = {}) {
    this.routes = [];
    this.root = document.getElementById(rootId);
    this.debug = debug;
  }

  /**
   * Register one or many routes: { url, handler }.
   */
  add(route) {
    if (Array.isArray(route)) this.routes.push(...route);
    else this.routes.push(route);
  }

  /**
   * Match current URL and invoke the handler.
   */
  handle() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (this.debug) console.log("[Router] path=", path, "hash=", hash);

    const match = this.routes.find((r) => r.url === path);
    if (match) match.handler({ hash, path, root: this.root });
    else this.root.innerHTML = "<h1>404 - Page Not Found</h1>";
  }

  /**
   * Navigate without page reload.
   * @param {string} pathWithHash  e.g. '/post#7'
   */
  navigate(pathWithHash) {
    history.pushState({}, "", pathWithHash);
    this.handle();
  }

  /**
   * Start routing:
   * - Intercept same-origin <a> clicks.
   * - Handle initial load and back/forward.
   */
  start() {
    document.body.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a && a.origin === location.origin) {
        e.preventDefault();
        this.navigate(a.pathname + a.hash);
      }
    });

    window.addEventListener("DOMContentLoaded", () => this.handle());
    window.addEventListener("popstate", () => this.handle());
  }
}
