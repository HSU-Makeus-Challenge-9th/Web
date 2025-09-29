"use strict";
const app = document.querySelector("#app");
function render() {
    const path = window.location.pathname;
    if (path === "/")
        app.innerHTML = "<h1>Home</h1>";
    else if (path === "/about")
        app.innerHTML = "<h1>About</h1>";
}
function navigate(to) {
    history.pushState({}, "", to);
    render();
}
document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.origin === location.origin) {
        e.preventDefault();
        navigate(link.pathname);
    }
});
window.addEventListener("popstate", render);
render();
