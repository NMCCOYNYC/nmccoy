export type Scarf = {
  slug: string;
  name: string;
  number: string;
  numberLabel: string;
  gradient: string;
  desc1: string;
  desc2: string;
  painting: string;
  shopifyDepositUrl?: string;
  shopifyFullUrl?: string;
};

export const scarves: Scarf[] = [
  {
    slug: "wild-mirage",
    name: "Wild Mirage",
    number: "01",
    numberLabel: "No. 01 of 06",
    gradient:
      "linear-gradient(160deg,#D4B896 0%,#A07840 35%,#8C603A 60%,#38271E 100%)",
    desc1:
      "Heat shimmer and bone-dry earth. The horizon dissolves into light the way the desert does at midday.",
    desc2:
      "Painted in original ink by Nichole McCoy in her Arizona studio, then translated to 100% Italian silk twill.",
    painting:
      "Wild Mirage began as a study of the Sonoran Desert in high summer — ink applied wet-into-wet to capture the blurring of the horizon.",
  },
  {
    slug: "sacred-light",
    name: "Sacred Light",
    number: "02",
    numberLabel: "No. 02 of 06",
    gradient:
      "linear-gradient(160deg,#E8D5A3 0%,#C4A055 40%,#74701E 100%)",
    desc1:
      "Golden hour at altitude. The moment before the canyon walls go dark and everything is briefly sacred.",
    desc2:
      "An original ink painting capturing the quality of late afternoon light in the Arizona canyon lands.",
    painting:
      "Painted over two sessions at dusk, capturing the way warm light rakes across sandstone at near-horizontal angles.",
  },
  {
    slug: "dusty-bloom",
    name: "Dusty Bloom",
    number: "03",
    numberLabel: "No. 03 of 06",
    gradient:
      "linear-gradient(160deg,#D4B0A0 0%,#99372C 40%,#796D61 100%)",
    desc1:
      "Desert botanical — the way a flower holds color in a place that should be inhospitable to it.",
    desc2:
      "Inspired by the saguaro and palo verde specimens of the Sonoran Desert.",
    painting:
      "Dusty Bloom explores how flowering plants produce intense pigments as a survival adaptation — color as armor.",
  },
  {
    slug: "hazy-mesa",
    name: "Hazy Mesa",
    number: "04",
    numberLabel: "No. 04 of 06",
    gradient:
      "linear-gradient(160deg,#B5A090 0%,#796D61 40%,#38271E 100%)",
    desc1:
      "The mesa at dusk, layered in atmospheric haze. Distance made visible. Depth made paintable.",
    desc2:
      "The ink layering technique mimics the atmospheric perspective of desert distances.",
    painting:
      "Painted in a single long session, wet-on-wet, allowing ink to blend at the horizon the way desert air actually does.",
  },
  {
    slug: "sundance",
    name: "Sundance",
    number: "05",
    numberLabel: "No. 05 of 06",
    gradient:
      "linear-gradient(160deg,#F0C87A 0%,#C4843A 40%,#8C603A 100%)",
    desc1:
      "The arc of a day distilled. Saguaro silhouettes against fire. Arizona as it exists only between 6 and 7 PM.",
    desc2:
      "A study in silhouette and saturated warm light — the specific visual event of an Arizona sunset.",
    painting:
      "Painted from direct observation over four consecutive evenings, building color through layered ink washes.",
  },
  {
    slug: "indigo-dream",
    name: "Indigo Dream",
    number: "06",
    numberLabel: "No. 06 of 06",
    gradient:
      "linear-gradient(160deg,#7FBDBA 0%,#3A6B8A 40%,#1A2B3E 100%)",
    desc1:
      "The desert after dark. An indigo sky with nothing between you and the Milky Way but dry air and altitude.",
    desc2:
      "A departure into cool blues that the desert only reveals after midnight.",
    painting:
      "Painted at night with artificial light — an experiment in working against the usual desert palette.",
  },
];

export function getScarfBySlug(slug: string) {
  return scarves.find((s) => s.slug === slug);
}

export function getScarfThumbGradients(gradient: string) {
  return [
    gradient,
    gradient.replace("160deg", "90deg"),
    gradient.replace("160deg", "220deg"),
    "linear-gradient(160deg,#EDEBE9,#C4B8A8)",
  ];
}
