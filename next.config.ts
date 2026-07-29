import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // El container del hero es la pieza más grande de la página y el original ya
    // venía comprimido: recomprimirlo a 75 se notaba. Next 16 exige declarar
    // cada calidad que se use.
    qualities: [75, 90],
  },
};

export default nextConfig;
