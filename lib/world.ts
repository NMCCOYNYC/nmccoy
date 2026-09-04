export type WorldImage = {
  src: string;
  alt: string;
};

export const worldStaticImage: WorldImage = {
  src: "/home/world/static.jpg",
  alt: "Desert Illusions",
};

export const worldCarouselImages: WorldImage[] = [
  { src: "/home/world/01.jpg", alt: "Desert Illusions campaign" },
  { src: "/home/world/02.jpg", alt: "Desert Illusions campaign" },
  { src: "/home/world/03.jpg", alt: "Desert Illusions campaign" },
];

export function getWorldImages() {
  return {
    staticImage: worldStaticImage,
    carouselImages: worldCarouselImages,
  };
}
