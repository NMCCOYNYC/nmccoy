export type WorldImage = {
  src: string;
  alt: string;
};

export const worldStaticImage: WorldImage = {
  src: "/home/world/static.jpg",
  alt: "Desert Illusions",
};

export const worldCarouselImages: WorldImage[] = [
  { src: "/home/world/slide-1.jpg", alt: "Scarves worn on the head" },
  { src: "/home/world/slide-2.jpg", alt: "Scarf over the blazer" },
  { src: "/home/world/slide-3.jpg", alt: "Scarf worn at the neck" },
  { src: "/home/world/slide-4.jpg", alt: "Scarves on the staircase" },
  { src: "/home/world/slide-5.jpg", alt: "Scarf tied in the hair" },
];

export function getWorldImages() {
  return {
    staticImage: worldStaticImage,
    carouselImages: worldCarouselImages,
  };
}
