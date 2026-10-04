import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SeidpHome from "./pages/SeidpHome";
import SeidpServices from "./pages/SeidpServicesHub";
import SeidpServiceDetail from "./pages/SeidpServiceDetail";
import SeidpPrevention from "./pages/SeidpPreventionNew";
import SeidpAbout from "./pages/SeidpAboutNew";
import SeidpContact from "./pages/SeidpContactNew";
import SeidpPrivacy from "./pages/SeidpPrivacy";
import SeidpTerms from "./pages/SeidpTerms";
import { services } from "./serviceData";

const pageTitles: Record<string, string> = {
  "/": "Salud e Imagen del Puerto | Inicio",
  "/servicios": "Salud e Imagen del Puerto | Servicios",
  "/prevencion": "Salud e Imagen del Puerto | Prevención",
  "/nosotros": "Salud e Imagen del Puerto | Nosotros",
  "/contacto": "Salud e Imagen del Puerto | Contacto",
  "/aviso-de-privacidad": "Salud e Imagen del Puerto | Aviso de privacidad",
  "/terminos-y-condiciones":
    "Salud e Imagen del Puerto | Términos y condiciones",
};

function RouteEffects() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    const service = services.find(item => location === `/servicios/${item.slug}`);
    document.title =
      (service ? `Salud e Imagen del Puerto | ${service.title}` : pageTitles[location]) ??
      "Salud e Imagen del Puerto | Página no encontrada";
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={SeidpHome} />
      <Route path={"/servicios"} component={SeidpServices} />
      <Route path={"/servicios/:slug"} component={SeidpServiceDetail} />
      <Route path={"/prevencion"} component={SeidpPrevention} />
      <Route path={"/nosotros"} component={SeidpAbout} />
      <Route path={"/contacto"} component={SeidpContact} />
      <Route path={"/aviso-de-privacidad"} component={SeidpPrivacy} />
      <Route path={"/terminos-y-condiciones"} component={SeidpTerms} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <RouteEffects />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
