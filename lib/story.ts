import fs from "fs";
import path from "path";

export type StoryImage = {
  src: string;
  alt: string;
};

const ABOUT_DIR = path.join(process.cwd(), "public", "about");

export function getFoundationImages(): StoryImage[] {
  return [1, 2, 3, 4, 5, 6].flatMap((n) => {
    const file = `foundation-0${n}.jpg`;
    if (!fs.existsSync(path.join(ABOUT_DIR, file))) return [];
    return [{ src: `/about/${file}`, alt: `NMCCOY foundation ${n}` }];
  });
}

export const founderImage: StoryImage = {
  src: "/about/founder.jpg",
  alt: "Nichole McCoy, founder of NMCCOY",
};
