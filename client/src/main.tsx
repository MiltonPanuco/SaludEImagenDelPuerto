import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const localePath = window.location.pathname.match(/^\/(es|en)(?=\/|$)/);
if (!localePath) {
  const path = window.location.pathname === "/" ? "/" : window.location.pathname;
  window.history.replaceState(
    window.history.state,
    "",
    `/es${path}${window.location.search}${window.location.hash}`
  );
} else if (window.location.pathname === `/${localePath[1]}`) {
  window.history.replaceState(
    window.history.state,
    "",
    `/${localePath[1]}/${window.location.search}${window.location.hash}`
  );
}
document.documentElement.lang =
  window.location.pathname.match(/^\/(es|en)(?=\/|$)/)?.[1] ?? "es";

const navigation = performance.getEntriesByType(
  "navigation"
)[0] as PerformanceNavigationTiming | undefined;

if (navigation?.type === "reload") {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  window.addEventListener("pageshow", () => window.scrollTo(0, 0), {
    once: true,
  });
}

createRoot(document.getElementById("root")!).render(<App />);

const loadingScreen = document.getElementById("app-loading-screen");

const dismissLoadingScreen = () => {
  const removeLoadingScreen = () => {
    loadingScreen?.remove();
    document.documentElement.classList.remove("is-loading");
  };

  if (!loadingScreen) {
    removeLoadingScreen();
    return;
  }

  loadingScreen.addEventListener("transitionend", removeLoadingScreen, {
    once: true,
  });
  loadingScreen.classList.add("app-loading-screen--leaving");
  window.setTimeout(removeLoadingScreen, 500);
};

if (document.readyState === "complete") dismissLoadingScreen();
else window.addEventListener("load", dismissLoadingScreen, { once: true });
