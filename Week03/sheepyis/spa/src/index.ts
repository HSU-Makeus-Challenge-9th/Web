const app = document.querySelector<HTMLDivElement>("#app")!;

function render() {
  const path = window.location.pathname;
  if (path === "/") app.innerHTML = "<h1>Home</h1>";
  else if (path === "/about") app.innerHTML = "<h1>About</h1>";
}

function navigate(to: string) {
  history.pushState({}, "", to);
  render();
}

document.body.addEventListener("click", (e) => {
  const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a");
  if (link && link.origin === location.origin) {
    e.preventDefault();
    navigate(link.pathname);
  }
});

window.addEventListener("popstate", render);

render();
