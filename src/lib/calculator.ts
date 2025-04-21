import { GeekmonMap, type Geekmon } from "./geekmons";

export function calculatePoints(number: string, captured: Set<string>, isShiny = false): number {
  return doCalculatePoints(number, captured) + (isShiny ? 3 : 0);
}

function doCalculatePoints(number: string, captured: Set<string>): number {
  const geekmon = GeekmonMap[number];

  const evolutionLines = geekmon.evolutions;

  // Treat very specific cases like Mouselete and Hyro
  if (number === "030") {
    return calculateMouselet(captured);
  }

  if (["057", "058", "059", "060"].includes(number)) {
    return calculateHyro(captured);
  }

  if (geekmon.tags.includes("mythic")) {
    return calculateMythic(number, captured);
  }

  // Legendary geekmons always gives 9 points
  if (geekmon.tags.includes("legendary")) {
    return 9;
  }

  // Specter geekmons always gives 3 points
  if (geekmon.tags.includes("specter")) {
    return 3;
  }

  const evolutions = new Set(evolutionLines[0]);

  // Single stage geekmons always gives 6 points
  if (evolutions.size === 1) {
    return 6;
  }

  const capturedEvolutions = evolutions.intersection(captured).size;

  // Overgrowth geekmons gives -3 points if their base was not captured, 12 otherwise
  if (geekmon.tags.includes("over")) {
    // Except for Overwings, which gives -5/15
    if (geekmon.number === "112") {
      return capturedEvolutions === 2 ? 15 : -5;
    }
    return capturedEvolutions === 2 ? 12 : -3;
  }

  // Two stage geekmons give 4/8 points
  if (evolutions.size === 2) {
    return 4 * capturedEvolutions;
  }

  // Three stage geekmons give 4/7/10 points
  if (evolutions.size === 3) {
    return 4 + 3 * (capturedEvolutions - 1);
  }

  // Shouldn't reach
  return 0;
}

function calculateMouselet(captured: Set<string>): number {
  // Mouselet can be included twice if at least one evolution
  // from each line is included

  const capturedMale = new Set(["031", "032"]).intersection(captured).size;
  const capturedFemale = new Set(["033", "034"]).intersection(captured).size;

  const malePoints = capturedMale > 0 ? 4 + 3 * capturedMale : 0;
  const femalePoints = capturedFemale > 0 ? 4 + 3 * capturedFemale : 0;

  // If he was captured by himself, he is worth 4 points
  return Math.max(malePoints + femalePoints, 4);
}

function calculateHyro(captured: Set<string>): number {
  // Hyro is considered a 4 stage evolution line
  // Four stage geekmons give 3/6/9/12 points
  const capturedEvolutions = new Set(["057", "058", "059", "060"]).intersection(captured).size;

  return 3 * capturedEvolutions;
}

function calculateMythic(number: string, captured: Set<string>) {
  // Nar'zalokh and Terradon are always worth 9
  if (number === "115" || number === "157") {
    return 9;
  }

  // Marinith is always worth 6
  if (number === "158") {
    return 6;
  }

  // Aeraphis is worth 12 -5 for each other mythic captured
  const otherMythics = new Set(["115", "157", "158"]).intersection(captured).size;
  return 12 - 5 * otherMythics;
}
