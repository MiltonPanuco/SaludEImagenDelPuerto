import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import type { Map as MapboxMap, Marker as MapboxMarker } from "mapbox-gl";

const CENTER: [number, number] = [-105.2125, 20.6558];
const MAP_URL = "https://maps.app.goo.gl/EnPoYMCfZ6Cm4Fzs7";

export function MapboxTiltMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN?.trim();

  useEffect(() => {
    if (!accessToken || !mapElement.current) return;
    let cancelled = false;
    let map: MapboxMap | undefined;
    let marker: MapboxMarker | undefined;

    const initialize = async () => {
      try {
        const [{ default: mapboxgl }] = await Promise.all([
          import("mapbox-gl"),
          import("mapbox-gl/dist/mapbox-gl.css"),
        ]);
        if (cancelled || !mapElement.current) return;

        map = new mapboxgl.Map({
          accessToken,
          container: mapElement.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: CENTER,
          zoom: 18,
          pitch: 0,
          bearing: 0,
          cooperativeGestures: true,
          renderWorldCopies: false,
        });
        marker = new mapboxgl.Marker({ color: "#0f7065", scale: 1.1 })
          .setLngLat(CENTER)
          .setPopup(
            new mapboxgl.Popup({ offset: 28 }).setText(
              "Salud e Imagen del Puerto"
            )
          )
          .addTo(map);

        map.addControl(
          new mapboxgl.NavigationControl({
            showCompass: false,
            showZoom: true,
          }),
          "top-right"
        );
        map.on("error", event => {
          if (!map?.loaded() && event.error) {
            setError("No fue posible cargar el mapa satelital.");
          }
        });
      } catch {
        if (!cancelled) setError("No fue posible cargar el mapa satelital.");
      }
    };

    void initialize();

    return () => {
      cancelled = true;
      marker?.remove();
      map?.remove();
    };
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div data-mapbox-tilt-map className="size-full">
        <MapFallback message="El mapa se activará al configurar el token público de Mapbox." />
      </div>
    );
  }

  return (
    <div
      data-mapbox-tilt-map
      className="relative size-full min-h-[420px] bg-[#dceef4] lg:min-h-[620px]"
    >
      <div
        ref={mapElement}
        className="size-full min-h-[420px] lg:min-h-[620px]"
        aria-label="Mapa satelital 3D de Salud e Imagen del Puerto"
      />
      {error && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[#dceef4] p-8">
          <MapFallback message={error} />
        </div>
      )}
    </div>
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
