export const getCurrentPath = () => window.location.pathname;

export const navigateTo = (to: string) => {
  if (window.location.pathname === to) return;
  history.pushState({}, "", to);
  window.dispatchEvent(new Event("popstate"));
};
