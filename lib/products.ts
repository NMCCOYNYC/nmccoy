export type Scarf = {
  slug: string;
  name: string;
  number: string;
  numberLabel: string;
  gradient: string;
  desc1: string;
  desc2: string;
  painting: string;
  shopifyVariantId?: string;
  shopifyCheckoutUrl?: string;
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
      "A reflection on freedom, instinct, and the fleeting nature of memory. Wild Mirage explores the spaces between what was seen and what was felt, where recollections soften and reality gives way to imagination. Celestial stars drift through the composition as quiet reminders to trust one's own path, while the spirit of the horse speaks to movement, independence, and the pursuit of something just beyond reach.",
    desc2:
      "Original ink painting translated to 100% Italian silk twill. Limited edition.",
    painting:
      "Wild Mirage explores memory, instinct, and the spaces between what was seen and what was felt.",
  },
  {
    slug: "sacred-light",
    name: "Sacred Light",
    number: "02",
    numberLabel: "No. 02 of 06",
    gradient:
      "linear-gradient(160deg,#E8D5A3 0%,#C4A055 40%,#74701E 100%)",
    desc1:
      "An homage to wisdom, heritage, and our connection to the landscapes that shape us. Sacred Light reflects the quiet strength that is carried across generations—the stories, traditions, and perspectives that continue to illuminate our path forward. Radiant forms and warm tones evoke a sense of reverence, reminding us that light often comes from within.",
    desc2:
      "Original ink painting translated to 100% Italian silk twill. Limited edition.",
    painting:
      "Sacred Light reflects the quiet strength carried across generations and the landscapes that shape us.",
  },
  {
    slug: "dusty-bloom",
    name: "Dusty Bloom",
    number: "03",
    numberLabel: "No. 03 of 06",
    gradient:
      "linear-gradient(160deg,#D4B0A0 0%,#99372C 40%,#796D61 100%)",
    desc1:
      "A reflection on transformation and the unexpected ways beauty reveals itself. Emerging from an unlikely landscape, Dusty Bloom honors the strength required to flourish despite adversity. Delicate yet resilient, it serves as a reminder that growth often begins beneath the surface, long before it can be seen.",
    desc2:
      "Original ink painting translated to 100% Italian silk twill. Limited edition.",
    painting:
      "Dusty Bloom honors the strength required to flourish despite adversity.",
  },
  {
    slug: "hazy-mesa",
    name: "Hazy Mesa",
    number: "04",
    numberLabel: "No. 04 of 06",
    gradient:
      "linear-gradient(160deg,#B5A090 0%,#796D61 40%,#38271E 100%)",
    desc1:
      "A study in resilience and perspective. Inspired by the enduring presence of the agave, Hazy Mesa reflects the beauty that emerges through patience, adaptation, and time. Layered forms unfold gradually, revealing new details with every glance—much like the landscapes and experiences that shape us over a lifetime.",
    desc2:
      "Original ink painting translated to 100% Italian silk twill. Limited edition.",
    painting:
      "Hazy Mesa reflects beauty that emerges through patience, adaptation, and time.",
  },
  {
    slug: "sundance",
    name: "Sundance",
    number: "05",
    numberLabel: "No. 05 of 06",
    gradient:
      "linear-gradient(160deg,#F0C87A 0%,#C4843A 40%,#8C603A 100%)",
    desc1:
      "A celebration of unity, hope, and shared journeys. Two birds move together toward the sun, carrying a single bloom between them as a symbol of trust, connection, and renewal. Inspired by the belief that even after life's most difficult seasons, the sun will rise again, Sundance is a reminder of the beauty found in moving forward together.",
    desc2:
      "Original ink painting translated to 100% Italian silk twill. Limited edition.",
    painting:
      "Sundance celebrates unity, hope, and the beauty found in moving forward together.",
  },
  {
    slug: "indigo-dream",
    name: "Indigo Dream",
    number: "06",
    numberLabel: "No. 06 of 06",
    gradient:
      "linear-gradient(160deg,#7FBDBA 0%,#3A6B8A 40%,#1A2B3E 100%)",
    desc1:
      "A meditation on connection, intuition, and possibility. Moving in quiet rhythm across a desert landscape, the horses of Indigo Dream evoke a sense of harmony between the seen and unseen. Deep shades of indigo invite reflection, while the composition explores the moments when imagination feels as tangible as memory.",
    desc2:
      "Original ink painting translated to 100% Italian silk twill. Limited edition.",
    painting:
      "Indigo Dream explores harmony between the seen and unseen, where imagination feels as tangible as memory.",
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
