import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { services } from "@/serviceData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const WHATSAPP_URL =
  "https://wa.me/523224704622?text=Hola%2C%20Salud%20e%20Imagen%20del%20Puerto.%20Quiero%20consultar%20por%20un%20estudio.";
export const APPOINTMENT_PHONE = "+523224035071";
export const URGENCY_PHONE = "+523221327405";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61578808319790";
const INSTAGRAM_URL = "https://www.instagram.com/saludeimagendelpuerto/";
const MAP_URL = "https://maps.app.goo.gl/EnPoYMCfZ6Cm4Fzs7";
const navItems = [
  ["Inicio", "/"],
  ["Nosotros", "/nosotros"],
  ["Servicios", "/servicios"],
  ["Prevención", "/prevencion"],
  ["Contacto", "/contacto"],
] as const;

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.973h-1.513c-1.49 0-1.956.931-1.956 1.887v2.26h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.264-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.98-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.895 9.82 9.82 0 0 1 2.9 6.988c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.117-1.605A11.9 11.9 0 0 0 12.047 24h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

const socialLinks = [
  { href: FACEBOOK_URL, label: "Facebook", Icon: FacebookIcon },
  { href: INSTAGRAM_URL, label: "Instagram", Icon: InstagramIcon },
  { href: WHATSAPP_URL, label: "WhatsApp", Icon: WhatsAppIcon },
  { href: MAP_URL, label: "Google Maps", Icon: MapPin },
  {
    href: `tel:${APPOINTMENT_PHONE}`,
    label: "Llamar a Salud e Imagen del Puerto",
    Icon: Phone,
  },
];

export function WhatsAppButton({
  children = "Agendar por WhatsApp",
  inverse = false,
}: {
  children?: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-3 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:-translate-y-0.5 max-sm:w-full max-sm:justify-center ${inverse ? "border border-white/40 bg-transparent text-white hover:bg-white hover:text-[#082b46]" : "bg-[#0f7065] text-white shadow-[0_12px_24px_rgba(15,112,101,.18)] hover:bg-[#0b6258]"}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

export function Logo({
  white = false,
  compact = false,
}: {
  white?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group/logo relative inline-flex h-14 w-12 shrink-0 items-center overflow-visible transition-[width,height] duration-150 ease-out motion-reduce:transition-none ${compact ? "lg:h-14 lg:w-12" : "lg:h-[6.5rem] lg:w-[6.5rem]"}`}
      data-compact={compact}
      aria-label="Salud e Imagen del Puerto, inicio"
    >
      <img
        src={white ? "/brand/logo-white.webp" : "/brand/logo-fondo-blanco.webp"}
        alt=""
        aria-hidden="true"
        className={`absolute left-0 top-1/2 hidden h-[6.5rem] w-auto -translate-y-1/2 object-contain transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none lg:block ${compact ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
      />
      <span
        aria-hidden="true"
        className={`absolute inset-0 scale-100 opacity-100 transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${compact ? "lg:scale-100 lg:opacity-100 lg:delay-75" : "lg:scale-95 lg:opacity-0"} ${white ? "" : "brightness-0"}`}
      >
        <img
          src="/brand/logo-simbolo.webp"
          alt=""
          className="size-full object-contain"
        />
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-[calc(100%-.35rem)] top-1/2 h-9 w-40 -translate-y-1/2 overflow-hidden opacity-100 [clip-path:inset(0_0_0_0)] transition-[clip-path,opacity] duration-250 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none sm:h-10 ${compact ? "lg:opacity-0 lg:[clip-path:inset(0_100%_0_0)] lg:group-hover/logo:opacity-100 lg:group-hover/logo:[clip-path:inset(0_0_0_0)] lg:group-focus-visible/logo:opacity-100 lg:group-focus-visible/logo:[clip-path:inset(0_0_0_0)]" : "lg:invisible lg:opacity-0"}`}
      >
        <img
          src="/brand/logo-letras.webp"
          alt=""
          className="absolute left-0 top-1/2 w-40 max-w-none -translate-y-1/2"
        />
      </span>
    </Link>
  );
}

function SocialLinks({ dark = true }: { dark?: boolean }) {
  return (
    <div className="flex justify-center gap-3">
      {socialLinks.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={label}
          className={`grid size-11 place-items-center rounded-full border transition-all duration-300 ease-out hover:-translate-y-1 ${dark ? "border-white/20 text-white hover:border-[#7ab2db] hover:bg-white hover:text-[#12395d]" : "border-[#12395d]/20 text-[#12395d] hover:border-[#0f7065] hover:bg-[#0f7065] hover:text-white"}`}
        >
          <Icon className="size-[18px]" />
        </a>
      ))}
    </div>
  );
}

export function SharedScrollBackground({
  src,
  alt,
  endRef,
  name,
  imageClassName = "opacity-65",
}: {
  src: string;
  alt: string;
  endRef: React.RefObject<HTMLElement | null>;
  name: string;
  imageClassName?: string;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const layer = layerRef.current;
    const image = imageRef.current;
    if (!layer || !image) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let current = 0;
    let target = 0;
    let frame = 0;
    const render = () => {
      current += (target - current) * 0.1;
      image.style.transform = `translate3d(0, 0, 0) scale(${1.04 + current * 0.1})`;
      if (Math.abs(target - current) > 0.001) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };
    const update = () => {
      const end = endRef.current;
      const endBottom = end
        ? end.getBoundingClientRect().bottom + window.scrollY
        : Number.POSITIVE_INFINITY;
      layer.style.visibility =
        !end || end.getBoundingClientRect().bottom > 0 ? "visible" : "hidden";
      if (reducedMotion) return;
      const zoomDistance = end
        ? Math.max(endBottom - window.innerHeight, window.innerHeight)
        : window.innerHeight;
      target = Math.min(Math.max(window.scrollY / zoomDistance, 0), 1);
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [endRef]);

  return (
    <div
      ref={layerRef}
      data-shared-scroll-background={name}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#082b46]"
      style={{ visibility: "hidden" }}
      aria-hidden="true"
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`size-full object-cover object-center will-change-transform ${imageClassName}`}
        style={{ transform: "translate3d(0, 0, 0) scale(1.04)" }}
      />
    </div>
  );
}

export function Header({ dark = false }: { dark?: boolean }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setDesktopServicesOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const isDark = true;
  const transparentAtTop = dark && !scrolled && !open;
  const servicesActive = location.startsWith("/servicios");
  const currentUrl = new URL(window.location.href);
  const isEnglish =
    currentUrl.hostname.endsWith(".translate.goog") ||
    currentUrl.searchParams.get("tl") === "en" ||
    currentUrl.searchParams.get("_x_tr_tl") === "en";
  const translatedSource = currentUrl.searchParams.get("u");
  const translatedHost = currentUrl.hostname
    .replace(/\.translate\.goog$/, "")
    .replace(/--/g, "\0")
    .replace(/-/g, ".")
    .replace(/\0/g, "-");
  const spanishUrl =
    translatedSource || `https://${translatedHost}${currentUrl.pathname}`;
  const languageUrl = isEnglish
    ? spanishUrl
    : `https://translate.google.com/translate?sl=es&tl=en&u=${encodeURIComponent(currentUrl.href)}`;
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-[background-color,box-shadow] duration-300 ${transparentAtTop ? "bg-[#12395d]/20" : "bg-[#12395d]/95 shadow-[0_8px_30px_rgba(0,0,0,.14)]"} backdrop-blur-xl`}
      >
        <div
          className={`relative z-[2] mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center px-5 transition-[min-height] duration-300 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12 ${scrolled ? "min-h-[72px]" : "min-h-[104px]"}`}
        >
          <Logo white compact={scrolled} />
          <nav
            className="hidden items-stretch gap-7 self-stretch lg:flex"
            aria-label="Navegación principal"
          >
            {navItems.map(([label, href]) =>
              href === "/servicios" ? (
                <Popover
                  key={href}
                  open={desktopServicesOpen}
                  onOpenChange={setDesktopServicesOpen}
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      aria-current={servicesActive ? "page" : undefined}
                      className={`flex min-h-11 items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.13em] transition-colors ${servicesActive ? "text-white" : "text-white/75 hover:text-white"}`}
                    >
                      <span
                        className={`relative py-1 after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-[calc(100%-4px)] after:-translate-x-1/2 after:origin-center after:scale-x-0 after:bg-[#7ab2db] after:transition-transform after:duration-500 after:ease-out ${servicesActive ? "after:scale-x-100" : ""}`}
                      >
                        {label}
                      </span>
                      <ChevronDown
                        className={`size-3.5 transition-transform ${desktopServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    side="bottom"
                    sideOffset={0}
                    avoidCollisions={false}
                    className="z-[90] hidden max-h-[calc(100dvh-104px)] w-[520px] overflow-y-auto rounded-t-none rounded-b-2xl border-[#12395d]/10 p-0 shadow-[0_24px_70px_rgba(8,43,70,.2)] lg:block"
                    aria-label="Servicios del centro"
                  >
                    <div className="flex items-center justify-between bg-[#e8f5f5] px-5 py-4">
                      <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#0f7065]">
                        Cuidarte empieza aquí
                      </p>
                      <Link
                        href="/servicios"
                        onClick={() => setDesktopServicesOpen(false)}
                        className="flex items-center gap-2 text-xs font-semibold text-[#12395d]"
                      >
                        Ver todos <ArrowRight className="size-4" />
                      </Link>
                    </div>
                    <nav
                      aria-label="Submenú de servicios"
                      className="grid grid-cols-2 gap-1 p-2"
                    >
                      {services.map(({ slug, title, Icon }) => (
                        <Link
                          key={slug}
                          href={`/servicios/${slug}`}
                          onClick={() => setDesktopServicesOpen(false)}
                          aria-current={
                            location === `/servicios/${slug}`
                              ? "page"
                              : undefined
                          }
                          className="group flex items-center gap-2.5 rounded-xl p-2.5 text-[#12395d] transition-colors hover:bg-[#f1f6f8] focus-visible:bg-[#e8f5f5] aria-[current=page]:bg-[#e8f5f5]"
                        >
                          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#e8f5f5] text-[#0f7065]">
                            <Icon className="size-4" />
                          </span>
                          <span className="text-xs font-semibold">{title}</span>
                          <ArrowRight className="ml-auto size-3 shrink-0 text-[#4291cd]" />
                        </Link>
                      ))}
                    </nav>
                  </PopoverContent>
                </Popover>
              ) : (
                <Link
                  key={href}
                  href={href}
                  aria-current={location === href ? "page" : undefined}
                  className="inline-flex min-h-11 items-center text-[11px] font-bold uppercase tracking-[.13em] text-white/75 transition-colors hover:text-white aria-[current=page]:text-white"
                >
                  <span
                    className={`relative py-1 after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-[calc(100%-4px)] after:-translate-x-1/2 after:origin-center after:scale-x-0 after:bg-[#7ab2db] after:transition-transform after:duration-500 after:ease-out ${location === href ? "after:scale-x-100" : ""}`}
                  >
                    {label}
                  </span>
                </Link>
              )
            )}
          </nav>
          <div className="flex items-center justify-self-end gap-2">
            <a
              href={languageUrl}
              className={`hidden size-11 place-items-center rounded-none border text-[10px] font-bold tracking-[.12em] transition-colors duration-300 lg:grid ${isDark ? "border-white/35 text-white hover:border-[#7ab2db] hover:text-[#9bc9e7]" : "border-[#12395d]/30 text-[#12395d] hover:border-[#4291cd] hover:text-[#2e759f]"}`}
              aria-label={isEnglish ? "Cambiar a español" : "Change to English"}
            >
              {isEnglish ? "ES" : "EN"}
            </a>
            <button
              type="button"
              onClick={() => setOpen(value => !value)}
              className={`grid size-11 place-items-center rounded-none border bg-transparent lg:hidden ${isDark ? "border-white/30 text-white" : "border-[#12395d]/20 text-[#12395d]"}`}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>
      {createPortal(
        <div
          id="menu-movil"
          aria-hidden={!open}
          inert={!open}
          className={`fixed inset-0 z-[70] flex h-dvh flex-col overflow-y-auto bg-[#12395d] px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 text-white transition-[opacity,transform,visibility] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none lg:hidden ${open ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-4 scale-[.985] opacity-0"}`}
        >
          <nav
            className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center text-center"
            aria-label="Navegación móvil"
          >
            {navItems.map(([label, href]) =>
              href === "/servicios" ? (
                <div key={href} className="w-full">
                  <button
                    type="button"
                    onClick={() => setServicesOpen(value => !value)}
                    aria-expanded={servicesOpen}
                    aria-controls="servicios-movil"
                    className={`flex min-h-12 w-full items-center justify-center gap-2 py-2 font-display text-[clamp(1.5rem,6vw,2.15rem)] font-semibold tracking-[-.05em] transition-colors hover:text-[#7ab2db] ${servicesActive ? "text-[#7ab2db]" : "text-white"}`}
                  >
                    {label}
                    <ChevronDown
                      className={`size-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    id="servicios-movil"
                    inert={!servicesOpen}
                    className={`mx-auto grid max-w-md grid-cols-2 gap-2 overflow-hidden rounded-2xl bg-white/5 px-3 transition-[max-height,opacity,padding,margin] duration-300 ${servicesOpen ? "mt-2 max-h-[28rem] py-3 opacity-100" : "mt-0 max-h-0 py-0 opacity-0"}`}
                  >
                    <Link
                      href="/servicios"
                      className="col-span-2 flex items-center gap-3 rounded-xl bg-[#0f7065] px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[.08em] text-white transition-colors hover:bg-[#168879]"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10">
                        <ArrowRight className="size-4" />
                      </span>
                      Todos los servicios
                    </Link>
                    {services.map(({ slug, title, Icon }) => (
                      <Link
                        key={slug}
                        href={`/servicios/${slug}`}
                        className="flex min-h-12 items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-left text-[9px] font-bold uppercase tracking-[.06em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <Icon className="size-4 shrink-0 text-[#7ab2db]" />
                        {title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  aria-current={location === href ? "page" : undefined}
                  className="block min-h-12 w-full py-2 font-display text-[clamp(1.5rem,6vw,2.15rem)] font-semibold tracking-[-.05em] text-white transition-colors hover:text-[#7ab2db] aria-[current=page]:text-[#7ab2db]"
                >
                  {label}
                </Link>
              )
            )}
          </nav>
          <div className="mx-auto mb-20 flex w-full max-w-lg flex-col items-center gap-5 sm:mb-24">
            <a
              href={languageUrl}
              className="inline-flex min-h-11 items-center gap-3 border border-white/30 px-5 font-mono text-[10px] font-bold uppercase tracking-[.12em] text-white transition-colors hover:border-[#7ab2db] hover:text-[#9bc9e7]"
              aria-label={isEnglish ? "Cambiar a español" : "Change to English"}
            >
              <span>{isEnglish ? "ES" : "EN"}</span>
              <span className="text-white/65">
                {isEnglish ? "Español" : "English"}
              </span>
            </a>
            <div className="w-full border-t border-white/15 pt-5">
              <SocialLinks />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export function PageIntro({
  eyebrow,
  title,
  italic,
  description,
  dark = false,
  centered = false,
  right = false,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
  dark?: boolean;
  centered?: boolean;
  right?: boolean;
}) {
  return (
    <div
      className={`hero-copy relative z-10 min-w-0 max-w-3xl ${centered ? "mx-auto text-center" : right ? "ml-auto text-right" : ""}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${centered ? "justify-center" : right ? "justify-end" : ""} ${dark ? "text-[#9bc9e7]" : "text-[#0f7065]"}`}
        >
          <span
            className={`h-px w-8 ${dark ? "bg-[#7ab2db]" : "bg-[#4291cd]"}`}
          />
          {eyebrow}
        </p>
      )}
      <h1
        className={`break-words font-display text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[.96] tracking-[-0.05em] ${dark ? "text-white" : "text-[#12395d]"}`}
      >
        {title}
        {italic && (
          <>
            {" "}
            <span
              className={`mt-2 block max-w-full break-words text-[clamp(1.85rem,3.6vw,3.5rem)] leading-[1] italic ${dark ? "text-[#7ab2db]" : "text-[#0f7065]"}`}
            >
              {italic}
            </span>
          </>
        )}
      </h1>
      {description && (
        <p
          className={`mt-6 max-w-lg text-base leading-relaxed ${centered ? "mx-auto" : right ? "ml-auto" : ""} ${dark ? "text-white/80" : "text-[#597286]"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`mb-5 flex items-center gap-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#7ab2db]" : "text-[#0f7065]"}`}
    >
      <span className={`h-px w-8 ${light ? "bg-[#7ab2db]" : "bg-[#4291cd]"}`} />
      {children}
    </p>
  );
}

function AnimatedFooterLogo() {
  return (
    <Link
      href="/"
      aria-label="Salud e Imagen del Puerto, inicio"
      className="group relative block size-40 sm:size-48"
    >
      <img
        src="/brand/logo-white.webp"
        alt="Salud e Imagen del Puerto"
        className="absolute inset-0 size-full object-contain"
      />
      <span className="absolute inset-x-0 bottom-0 h-0 overflow-hidden transition-[height] duration-1000 ease-in-out group-hover:h-full group-focus-visible:h-full">
        <img
          src="/brand/logo.webp"
          alt=""
          className="absolute bottom-0 left-0 size-40 max-w-none object-contain sm:size-48"
        />
      </span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative z-30 isolate bg-[#12395d] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 sm:px-8 sm:pt-20 lg:px-12">
        <div className="flex justify-center pb-14 sm:pb-20">
          <AnimatedFooterLogo />
        </div>

        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.3fr_.75fr_.75fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <h2 className="max-w-2xl font-display text-5xl leading-[.9] tracking-[-.04em] sm:text-6xl lg:text-7xl">
              Tu salud merece verse con claridad
            </h2>
            <Link
              href="/contacto"
              className="group mx-auto mt-9 flex min-h-12 max-w-xl items-center justify-between border-b border-white/45 pb-3 font-mono text-xs uppercase tracking-[.12em] lg:mx-0"
            >
              ¡Habla con nosotros!
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="mt-10">
              <div className="flex justify-center lg:justify-start">
                <SocialLinks />
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="font-display text-3xl">Servicios</p>
            <nav
              className="mt-6 grid gap-3 font-mono text-xs uppercase tracking-[.1em] text-white/65"
              aria-label="Servicios en el pie de página"
            >
              {services.map(({ slug, title }) => (
                <Link
                  key={slug}
                  href={`/servicios/${slug}`}
                  className="transition-colors hover:text-white"
                >
                  {title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-center lg:text-left">
            <p className="font-display text-3xl">Centro</p>
            <nav
              className="mt-6 grid gap-3 font-mono text-xs uppercase tracking-[.1em] text-white/65"
              aria-label="Navegación del pie de página"
            >
              {navItems.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="transition-colors hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center font-mono text-[9px] uppercase tracking-[.1em] text-white/40 sm:flex-row sm:text-left">
          <p>© 2026 Salud e Imagen del Puerto.</p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/aviso-de-privacidad"
              className="transition-colors hover:text-white"
            >
              Aviso de privacidad
            </Link>
            <Link
              href="/terminos-y-condiciones"
              className="transition-colors hover:text-white"
            >
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-[max(14px,env(safe-area-inset-bottom))] right-[max(14px,env(safe-area-inset-right))] z-40 grid size-13 place-items-center rounded-full bg-[#0f7065] text-white shadow-[0_14px_28px_rgba(15,112,101,.28)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(15,112,101,.35)]"
      aria-label="Abrir WhatsApp de Salud e Imagen del Puerto"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}

export function ImageModal({
  image,
  onClose,
}: {
  image: { src: string; alt: string } | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (image && !dialog.open) dialog.showModal();
    if (!image && dialog.open) dialog.close();
  }, [image]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={event => event.target === event.currentTarget && onClose()}
      className="m-auto max-h-[90vh] w-[min(92vw,1100px)] overflow-visible bg-transparent p-0 backdrop:bg-[#082b46]/85 backdrop:backdrop-blur-sm"
      aria-label="Vista ampliada de la imagen"
    >
      {image && (
        <figure className="relative overflow-hidden rounded-[22px] bg-white p-2 shadow-2xl">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[85vh] w-full rounded-[16px] object-contain"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-[#082b46]/90 text-white"
            aria-label="Cerrar imagen"
          >
            <X className="size-5" />
          </button>
        </figure>
      )}
    </dialog>
  );
}

export function PageShell({
  children,
  darkHeader = false,
}: {
  children: React.ReactNode;
  darkHeader?: boolean;
}) {
  useLayoutEffect(() => {
    const sections = Array.from(document.querySelectorAll("main > section"));
    const revealItems = sections
      .map(section =>
        Array.from(section.children).find(
          child =>
            child.tagName !== "IMG" &&
            window.getComputedStyle(child).position !== "absolute"
        )
      )
      .filter((item): item is Element => Boolean(item));
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;
    revealItems.forEach((item, index) => {
      item.classList.add("section-reveal");
      if (index === 0) item.classList.add("section-reveal--visible");
    });
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("section-reveal--visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 }
    );
    const frame = requestAnimationFrame(() =>
      revealItems.slice(1).forEach(item => observer.observe(item))
    );
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fbfdfe]">
      <Header dark={darkHeader} />
      {children}
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
