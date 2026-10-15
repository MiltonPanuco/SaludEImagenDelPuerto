import { MapPin } from "lucide-react";

const MAP_URL = "https://maps.app.goo.gl/EnPoYMCfZ6Cm4Fzs7";

export function MapboxTiltMap() {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN?.trim();

  if (!accessToken) {
    return (
      <div data-mapbox-tilt-map className="size-full">
        <MapFallback message="El mapa se activará al configurar el token público de Mapbox." />
      </div>
    );
  }

  const imageUrl = new URL(
    "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+0f7065(-105.2125,20.6558)/-105.2125,20.6558,17,0/1280x720@2x"
  );
  imageUrl.searchParams.set("access_token", accessToken);

  return (
    <a
      data-mapbox-tilt-map
      href={MAP_URL}
      target="_blank"
      rel="noreferrer"
      className="relative size-full min-h-[420px] bg-[#dceef4] lg:min-h-[620px]"
      aria-label="Abrir la ubicación de Salud e Imagen del Puerto en Google Maps"
    >
      <img
        data-external-map
        src={imageUrl.href}
        alt="Mapa de la ubicación de Salud e Imagen del Puerto"
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
    </a>
  );
}

function MapFallback({ message }: { message: string }) {
  return (
    <div className="grid size-full min-h-[420px] place-items-center bg-[#dceef4] p-8 text-center lg:min-h-[620px]">
      <div className="max-w-sm">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-white text-[#0f7065] shadow-sm">
          <MapPin className="size-5" />
        </span>
        <p className="mt-5 font-display text-2xl text-[#12395d]">
          Ubicación de Salud e Imagen del Puerto
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#597286]">{message}</p>
        <a
          href={MAP_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#12395d] px-5 text-xs font-bold text-white"
        >
          Abrir ubicación
        </a>
      </div>
    </div>
  );
}
