import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "All That’s Next",
    short_name: "ATN",
    description:
      "Practical tools that help young people understand themselves, price their choices and start shaping what comes next.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f1eb",
    theme_color: "#f8f1eb",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
